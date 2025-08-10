"use client"

import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Filter, Plus, Sparkles, FileText, FileIcon, Loader2 } from "lucide-react"

type Source = {
  id: string
  name: string
  status: "processing" | "ready"
}

export function SourcesPanel({
  sources = [],
  onOpenAdd = () => {},
}: {
  sources?: Source[]
  onOpenAdd?: () => void
}) {
  const empty = (sources?.length ?? 0) === 0

  return (
    <Card className="flex h-full flex-col border-white/10 bg-[rgb(27,29,31)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
        <div className="text-sm font-medium text-neutral-200">Sources</div>
        <button
          className="inline-flex h-7 w-7 items-center justify-center rounded-md text-neutral-400 hover:bg-white/10"
          aria-label="Filter"
        >
          <Filter className="h-4 w-4" />
        </button>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 px-3 py-3">
        <Button
          onClick={onOpenAdd}
          className="flex-1 justify-center gap-2 border-white/15 bg-white/5 hover:bg-white/10"
          variant="secondary"
        >
          <Plus className="h-4 w-4" />
          Add
        </Button>
        <Button
          className="flex-1 justify-center gap-2 border-white/15 bg-white/5 hover:bg-white/10"
          variant="secondary"
        >
          <Sparkles className="h-4 w-4" />
          Discover
        </Button>
      </div>

      {/* Empty placeholder */}
      {empty ? (
        <div className="mt-8 flex flex-1 flex-col items-center justify-start px-6 text-center">
          <div className="mt-14 flex h-14 w-14 items-center justify-center rounded-lg bg-white/5">
            <FileText className="h-6 w-6 text-neutral-400" />
          </div>
          <div className="mt-3 text-[12px] leading-5 text-neutral-400">
            Saved sources will appear here
            <br />
            Click Add above to upload PDFs or import directly from Drive.
          </div>
        </div>
      ) : (
        <ScrollArea className="flex-1">
          <ul className="px-2 pb-3">
            {sources.map((s) => (
              <li key={s.id} className="my-1 flex items-center justify-between rounded-md px-2 py-2 hover:bg-white/5">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="h-3.5 w-3.5 accent-fuchsia-500" />
                  <FileIcon className="h-3.5 w-3.5 text-neutral-400" />
                  <span className="max-w-[210px] truncate text-[13px] text-neutral-200">{s.name}</span>
                </div>
                <div className="pr-1">
                  {s.status === "processing" ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-neutral-400" />
                  ) : (
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  )}
                </div>
              </li>
            ))}
          </ul>
        </ScrollArea>
      )}
    </Card>
  )
}
