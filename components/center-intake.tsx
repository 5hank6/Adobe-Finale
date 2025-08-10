"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Settings, UploadCloud } from "lucide-react"

export function CenterIntake({
  title = "Untitled notebook",
  hasSources = false,
  persona = "",
  job = "",
  onPersonaChange = () => {},
  onJobChange = () => {},
  onOpenAdd = () => {},
}: {
  title?: string
  hasSources?: boolean
  persona?: string
  job?: string
  onPersonaChange?: (v: string) => void
  onJobChange?: (v: string) => void
  onOpenAdd?: () => void
}) {
  return (
    <Card className="flex h-full flex-col border-white/10 bg-[rgb(27,29,31)]">
      {/* Thin header line to match app chrome */}
      <div className="border-b border-white/10 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-neutral-200">{title}</div>
          <button className="inline-flex h-7 w-7 items-center justify-center rounded-md text-neutral-400 hover:bg-white/10">
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Persona + JTBD inputs */}
      <div className="grid w-full gap-3 px-4 py-4 md:grid-cols-2">
        <div className="grid gap-1.5">
          <Label htmlFor="persona" className="text-xs text-neutral-300">
            Persona
          </Label>
          <Input
            id="persona"
            value={persona}
            onChange={(e) => onPersonaChange(e.target.value)}
            placeholder="e.g., Undergraduate Chemistry Student"
            className="border-white/10 bg-[rgb(23,24,26)] text-sm text-neutral-200 placeholder:text-neutral-500"
          />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="job" className="text-xs text-neutral-300">
            Job to be done
          </Label>
          <Input
            id="job"
            value={job}
            onChange={(e) => onJobChange(e.target.value)}
            placeholder="e.g., Identify key concepts for reaction kinetics exam"
            className="border-white/10 bg-[rgb(23,24,26)] text-sm text-neutral-200 placeholder:text-neutral-500"
          />
        </div>
      </div>

      {/* Center empty-state CTA when no sources */}
      {!hasSources && (
        <div className="relative flex flex-1 items-center justify-center px-6">
          <div className="text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/8">
              <UploadCloud className="h-5 w-5 text-neutral-300" />
            </div>
            <div className="mt-4 text-lg font-medium text-neutral-200">Add a source to get started</div>
            <div className="mt-2">
              <Button
                onClick={onOpenAdd}
                variant="secondary"
                className="rounded-full border-white/15 bg-white/5 px-4 py-2 text-[13px] text-neutral-200 hover:bg-white/10"
              >
                Upload a source
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Spacer when sources exist (keep layout heights consistent) */}
      {hasSources && <div className="flex-1" />}
    </Card>
  )
}
