# python/generate_podcast.py
import sys, os, json, uuid, traceback, requests
from typing import List, Tuple
from pydub import AudioSegment
from pydub.generators import Sine
from pydub.utils import which

# Make sure pydub finds ffmpeg
AudioSegment.converter = which("ffmpeg") or "ffmpeg"

# LLM (Gemini)
LLM_PROVIDER = (os.environ.get("LLM_PROVIDER") or "gemini").lower()
GEMINI_MODEL = os.environ.get("GEMINI_MODEL", "gemini-2.5-flash")
GOOGLE_APPLICATION_CREDENTIALS = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS", "")
GOOGLE_CLOUD_PROJECT = os.environ.get("GOOGLE_CLOUD_PROJECT", "")
GOOGLE_CLOUD_REGION = os.environ.get("GOOGLE_CLOUD_REGION", "us-central1")

# Azure REST
TTS_PROVIDER = (os.environ.get("TTS_PROVIDER") or "azure").lower()
AZURE_TTS_KEY = os.environ.get("AZURE_TTS_KEY", "")
AZURE_TTS_ENDPOINT = os.environ.get("AZURE_TTS_ENDPOINT", "")
AZURE_REGION = os.environ.get("AZURE_REGION", "")

def log(*a): print("[podcast]", *a, file=sys.stderr, flush=True)

_model = None
def _init_vertex():
    global _model
    if _model: return
    if LLM_PROVIDER != "gemini": raise RuntimeError("LLM_PROVIDER must be 'gemini'")
    if not GOOGLE_APPLICATION_CREDENTIALS: raise RuntimeError("GOOGLE_APPLICATION_CREDENTIALS not set")
    from vertexai import init as vertex_init
    from vertexai.generative_models import GenerativeModel
    project = _read_project(GOOGLE_APPLICATION_CREDENTIALS) or GOOGLE_CLOUD_PROJECT or None
    vertex_init(project=project, location=GOOGLE_CLOUD_REGION)
    _model = GenerativeModel(GEMINI_MODEL)

def _read_project(path:str)->str:
    try:
        with open(path,"r",encoding="utf-8") as f: j=json.load(f)
        return j.get("project_id") or j.get("projectId") or ""
    except: return ""

def gen_dialog(seed:str)->List[Tuple[str,str]]:
    _init_vertex()
    from vertexai.generative_models import GenerationConfig
    prompt=f"""Write a ~8 line podcast conversation alternating Host: / Guest: based on:
{seed}
English only, no stage directions. Each line must start with Host: or Guest:"""
    log("Prompt len:", len(prompt))
    r=_model.generate_content(prompt, generation_config=GenerationConfig(temperature=0.8))
    text=getattr(r,"text",None) or str(r)
    lines=[ln.strip() for ln in text.splitlines() if ln.strip()]
    out=[]
    for ln in lines:
        if ln.startswith("Host:"): out.append(("Host", ln[5:].strip()))
        if ln.startswith("Guest:"): out.append(("Guest", ln[6:].strip()))
    if not out: out=[("Host","Welcome."),("Guest","Thanks for having me.")]
    return out[:8]

def azure_tts_mp3(voice:str, text:str)->bytes:
    if TTS_PROVIDER!="azure": raise RuntimeError("TTS_PROVIDER must be 'azure'")
    if not AZURE_TTS_KEY: raise RuntimeError("AZURE_TTS_KEY not set")
    endpoint = AZURE_TTS_ENDPOINT or f"https://{AZURE_REGION}.tts.speech.microsoft.com/cognitiveservices/v1"
    if not endpoint.startswith("https://"): raise RuntimeError(f"Bad AZURE_TTS_ENDPOINT: {endpoint}")
    ssml = f"<speak version='1.0' xml:lang='en-IN'><voice name='{voice}'>{text}</voice></speak>"
    h = {
      "Ocp-Apim-Subscription-Key": AZURE_TTS_KEY,
      "Content-Type": "application/ssml+xml",
      "X-Microsoft-OutputFormat": "audio-48khz-192kbitrate-mono-mp3",
      "User-Agent": "podcast-generator",
    }
    r = requests.post(endpoint, data=ssml.encode("utf-8"), headers=h, timeout=60)
    if r.status_code!=200:
        raise RuntimeError(f"Azure REST failed: {r.status_code} {r.text[:200]}")
    return r.content

def main():
    try:
        try:
            sys.stdout.reconfigure(encoding="utf-8"); sys.stderr.reconfigure(encoding="utf-8")  # type: ignore
        except: pass
        seed=sys.stdin.read().strip()
        if not seed: raise RuntimeError("Empty text")

        os.makedirs("public/audio", exist_ok=True)
        log("ffmpeg at:", AudioSegment.converter)
        convo=gen_dialog(seed)
        segs=[]
        for i,(sp,txt) in enumerate(convo,1):
            voice = "en-IN-NeerjaNeural" if sp=="Host" else "en-IN-PrabhatNeural"
            try:
                log(f"TTS {i}/{len(convo)} voice={voice}")
                mp3=azure_tts_mp3(voice, txt)
                tmp=f"_seg_{uuid.uuid4().hex}.mp3"
                open(tmp,"wb").write(mp3)
                segs.append(AudioSegment.from_file(tmp, format="mp3"))
            except Exception as e:
                log("TTS error -> fallback tone:", e)
                segs.append(Sine(440 if sp=="Host" else 330).to_audio_segment(duration=800))
        out=AudioSegment.silent(400)
        for s in segs: out += s + AudioSegment.silent(280)

        name=f"{uuid.uuid4().hex}.mp3"
        path=os.path.join("public","audio",name)
        log("Export:", path)
        out.export(path, format="mp3")
        print(f"/audio/{name}")
    except Exception as e:
        log("FATAL:", e)
        traceback.print_exc(file=sys.stderr)
        sys.exit(1)

if __name__=="__main__":
    main()
