"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { ChevronDown, FileAudio2, FileText, FileVideo2, BrainCircuit, Sparkles } from "lucide-react"

export function StudioPanel() {
  return (
    <Card className="flex h-full flex-col border-white/10 bg-[rgb(27,29,31)]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <div className="text-sm font-medium text-neutral-200">Studio</div>
        <button className="inline-flex h-7 w-7 items-center justify-center rounded-md text-neutral-400 hover:bg-white/10">
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      <ScrollArea className="flex-1 px-4 py-4">
        <div className="grid grid-cols-2 gap-3">
          <FeatureTile icon={<FileAudio2 className="h-5 w-5" />} label="Audio Overview" />
          <FeatureTile icon={<FileVideo2 className="h-5 w-5" />} label="Video Overview" />
          <FeatureTile icon={<BrainCircuit className="h-5 w-5" />} label="Mind Map" />
          <FeatureTile icon={<FileText className="h-5 w-5" />} label="Reports" />
        </div>

        <div className="mt-8 rounded-lg border border-white/10 bg-black/10 p-6 text-center text-sm text-neutral-400">
          <div className="mb-2">
            <Sparkles className="mx-auto h-5 w-5 text-violet-400" />
          </div>
          Studio output will be saved here.
          <div className="mt-1 text-xs text-neutral-500">
            After adding sources, click to add Audio Overview, Study Guide, Mind Map, and more!
          </div>
          <div className="mt-6 flex justify-center">
            <Button className="rounded-full bg-white/10 text-neutral-100 hover:bg-white/15" variant="secondary">
              Add note
            </Button>
          </div>
        </div>
      </ScrollArea>
    </Card>
  )
}

function FeatureTile({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.06] p-4">
      <div className="flex items-center gap-3 text-sm text-neutral-200">
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">{icon}</div>
        <span>{label}</span>
      </div>
    </div>
  )
}
