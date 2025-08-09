import Image from "next/image"
import { Button } from "@/components/ui/button"
import { AudioLines } from "lucide-react"

export function Showcase() {
  return (
    <section id="showcase" className="py-12 md:py-16">
      <div className="container mx-auto grid items-center gap-8 px-4 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
            <AudioLines className="h-4 w-4 text-fuchsia-600" />
            Audio overviews
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Get briefed in minutes</h2>
          <p className="text-muted-foreground">
            Generate an audio overview to hear key insights on the go. Perfect for reviewing long reports or getting up
            to speed before a meeting.
          </p>
          <div className="flex gap-2">
            <Button className="bg-fuchsia-600 hover:bg-fuchsia-500">Generate overview</Button>
            <Button variant="outline">Learn more</Button>
          </div>
          <ul className="grid gap-2 pt-2 text-sm text-muted-foreground sm:grid-cols-2">
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-fuchsia-600" />
              Natural voice
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-fuchsia-600" />
              Timestamps & links
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-fuchsia-600" />
              Download MP3
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-fuchsia-600" />
              Share with teammates
            </li>
          </ul>
        </div>
        <div className="relative">
          <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
            <div className="border-b px-4 py-2 text-sm text-muted-foreground">Audio overview</div>
            <div className="p-4">
              <Image
                src="/audio-waveform-ui.png"
                alt="Audio waveform mock"
                width={600}
                height={160}
                className="h-40 w-full rounded-md border object-cover"
              />
              <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                <div className="rounded-md border p-2 text-center">00:00 Intro</div>
                <div className="rounded-md border p-2 text-center">02:15 Findings</div>
                <div className="rounded-md border p-2 text-center">05:30 Next steps</div>
              </div>
            </div>
          </div>
          <p className="mt-3 text-center text-xs text-muted-foreground">Mock components. For demo only.</p>
        </div>
      </div>
    </section>
  )
}
