import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Upload,
  User,
  Target,
  Brain,
  Heading1,
  Search,
  Highlighter,
  Quote,
  ArrowRightLeft,
  Bot,
  Sparkles,
  GitCompare,
  AudioLines,
  type LucideIcon,
} from "lucide-react"
import { AuroraGradient } from "@/components/aurora-gradient"

type Feature = {
  icon: LucideIcon
  title: string
  badge?: string
  desc: string
}

const FEATURES: Feature[] = [
  {
    icon: Upload,
    title: "Upload multiple documents",
    badge: "PDF, Docs, Slides",
    desc: "Drag & drop or select multiple files at once. Prefer Adobe PDF Embed API for crisp in‑app rendering.",
  },
  {
    icon: User,
    title: "Persona input",
    badge: "Context",
    desc: "Set the reader persona (e.g., “Undergraduate Chemistry Student”) to tailor depth, tone, and examples.",
  },
  {
    icon: Target,
    title: "Job to be Done",
    badge: "JTBD",
    desc: "Define the task (e.g., “Identify key concepts and mechanisms for exam prep on reaction kinetics”).",
  },
  {
    icon: Brain,
    title: "Extract concepts & insights",
    badge: "Extraction",
    desc: "Parse chapters to surface key concepts, mechanisms, definitions, and relationships across sources.",
  },
  {
    icon: Heading1,
    title: "Identify section headings",
    badge: "1A logic",
    desc: "Automatically detect section and subsection headings across PDFs and documents.",
  },
  {
    icon: Search,
    title: "Find relevant sections",
    badge: "1B logic",
    desc: "Score and rank passages relevant to the persona and job, per document and across the whole set.",
  },
  {
    icon: Highlighter,
    title: "Highlight inside the PDF",
    badge: "Inline",
    desc: "Visual highlights mapped to concepts so users can see where the evidence comes from.",
  },
  {
    icon: Quote,
    title: "Concept snippets",
    badge: "Citations",
    desc: "Show short, cited snippets for each concept with links back to the exact location in the PDF.",
  },
  {
    icon: ArrowRightLeft,
    title: "Jump across sections",
    badge: "Cross‑nav",
    desc: "Move between all relevant sections with a single click to compare context quickly.",
  },
  {
    icon: Bot,
    title: "Key insights",
    badge: "LLM",
    desc: "Generate concise, persona‑aware insights grounded in the uploaded sources.",
  },
  {
    icon: Sparkles,
    title: "“Did you know?” facts",
    badge: "LLM",
    desc: "Surface interesting facts and edge cases to deepen understanding or spark curiosity.",
  },
  {
    icon: GitCompare,
    title: "Contradictions & connections",
    badge: "LLM",
    desc: "Reveal counterpoints, contradictions, and cross‑document connections with citations.",
  },
  {
    icon: AudioLines,
    title: "2–5 minute podcast",
    badge: "Audio overview",
    desc: "Auto‑generate a short podcast for the current and related sections using extracted insights.",
  },
]

export function FeaturesExact() {
  return (
    <section id="features" className="relative py-12 md:py-16">
      <AuroraGradient className="opacity-50 [mask-image:radial-gradient(60%_60%_at_50%_10%,black,transparent_70%)]" />
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center rounded-full border bg-background/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur-sm">
          Features
        </span>
        <h2 className="mt-4 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
          {"Built for personas "}
          <span className="bg-gradient-to-r from-fuchsia-600 via-violet-600 to-emerald-500 bg-clip-text text-transparent">
            {"to get jobs done"}
          </span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground md:text-lg">
          Upload, understand, jump, and generate—everything in one place, tailored to your user’s role.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <FeatureCard key={f.title} feature={f} />
        ))}
      </div>
    </section>
  )
}

function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon
  return (
    <Card className="h-full transition-all hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader className="space-y-2">
        {feature.badge ? (
          <Badge variant="secondary" className="w-fit">
            {feature.badge}
          </Badge>
        ) : null}
        <div className="flex items-center gap-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white">
            <Icon className="h-4 w-4" />
          </span>
          <CardTitle>{feature.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{feature.desc}</p>
      </CardContent>
    </Card>
  )
}
