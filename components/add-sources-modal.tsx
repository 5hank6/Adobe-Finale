"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  UploadCloud,
  Search,
  X,
  Folder,
  Youtube,
  Link,
  Pencil,
  FileText,
  Cloud,
  FileTextIcon,
  HardDrive,
  FileStack,
} from "lucide-react"

type Props = {
  open: boolean
  onOpenChange: (v: boolean) => void
  onFilesAdded?: (files: File[]) => void
}

export function AddSourcesModal({ open, onOpenChange, onFilesAdded }: Props) {
  const [dragOver, setDragOver] = React.useState(false)
  const [files, setFiles] = React.useState<File[]>([])
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)

  function onlyPDFs(list: File[]): File[] {
    const pdfs = list.filter(
      (f) =>
        f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf"),
    )
    if (pdfs.length !== list.length) {
      alert("Only PDF files are allowed.")
    }
    return pdfs
  }

  function commitFiles(selected: File[]) {
    const pdfs = onlyPDFs(selected)
    if (pdfs.length === 0) return
    setFiles((prev) => [...prev, ...pdfs].slice(0, 300))
    onFilesAdded?.(pdfs)
    onOpenChange(false)
  }

  function handleFiles(selected: FileList | null) {
    if (!selected) return
    commitFiles(Array.from(selected))
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(false)
    commitFiles(Array.from(e.dataTransfer.files))
  }

  const used = files.length
  const limit = 300
  const progress = Math.min(100, (used / limit) * 100)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        aria-describedby={undefined}
        className="max-w-2xl md:max-w-[70rem] w-full border-none bg-[rgb(20,21,23)] text-white shadow-2xl sm:rounded-2xl p-0
                   h-[95vh] md:h-auto flex flex-col"
      >
        {/* Header */}
        {/* Header */}
  <div className="flex items-center justify-between gap-3 px-6 py-4 border-b border-gray-700">
    <div className="flex items-center gap-2">
      <Folder className="h-5 w-5 text-neutral-400" />
      <div className="text-xl font-semibold">Add sources</div>
    </div>
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        className="h-9 px-4 rounded-full text-sm text-neutral-400 hover:text-white hover:bg-gray-700 transition-colors"
      >
        <Search className="mr-2 h-4 w-4" />
        Discover sources
      </Button>
      {/* This is the DialogClose that was causing the duplicate icon. It should be removed. */}
      {/* The DialogClose is now handled by the modal's default closing mechanism. */}
      {/* <DialogClose asChild>
        <button className="rounded-full p-1 text-neutral-400 hover:bg-gray-700 hover:text-white transition-colors">
          <X className="h-5 w-5" />
        </button>
      </DialogClose> */}
    </div>
  </div>

        {/* Body (scrollable) */}
        <div className="flex-1 overflow-y-auto px-6 py-8">
          <p className="text-sm text-neutral-400 max-w-lg mb-6">
            Sources let NotebookLM base its responses on the information that matters most to you.
            (Examples: marketing plans, course reading, research notes, meeting transcripts, sales documents, etc.)
          </p>

          {/* Dropzone */}
          <div
            onDragOver={(e) => {
              e.preventDefault()
              setDragOver(true)
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            className={[
              "rounded-xl border-2 border-dashed p-10 text-center",
              dragOver ? "border-sky-500/70 bg-sky-500/5" : "border-gray-700 bg-gray-800/50",
            ].join(" ")}
            role="region"
            aria-label="Upload PDF sources"
          >
            <div className="mx-auto flex flex-col items-center justify-center">
              <UploadCloud className="h-10 w-10 text-neutral-400" />
              <div className="mt-4 text-sm font-medium">Upload sources</div>
              <p className="mt-1 text-xs text-neutral-500">
                Drag & drop or{" "}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="font-medium text-sky-400 underline-offset-4 hover:underline"
                >
                  choose file
                </button>{" "}
                to upload
              </p>
              <p className="mt-2 text-xs text-neutral-600">Supported file types: PDF, .txt, Markdown, Audio (e.g. mp3)</p>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="application/pdf,.pdf"
                onChange={(e) => handleFiles(e.target.files)}
                className="hidden"
              />
            </div>
          </div>

          {/* New Grid Layout for Sources */}
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <TileGroup title="Cloud files">
              <SourceButton label="Google Drive" icon={HardDrive} />
              <SourceButton label="Google Docs" icon={FileText} />
              <SourceButton label="Google Slides" icon={FileStack} />
            </TileGroup>
            <TileGroup title="Links">
              <SourceButton label="Website" icon={Link} />
              <SourceButton label="YouTube" icon={Youtube} />
            </TileGroup>
            <TileGroup title="Text">
              <SourceButton label="Paste text" icon={Pencil} />
              <SourceButton label="Copied text" icon={FileTextIcon} />
            </TileGroup>
          </div>
        </div>

        {/* Bottom: limit */}
        <div className="px-6 py-4 flex items-center gap-4 border-t border-gray-700 flex-shrink-0">
          <div className="text-xs text-neutral-400 whitespace-nowrap">Source limit</div>
          <Progress value={progress} className="h-2 flex-1 bg-neutral-800" />
          <div className="w-16 text-right text-xs text-neutral-400 whitespace-nowrap">
            {used} / {limit}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function TileGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-xl border border-gray-700 bg-gray-800/50">
      <div className="mb-4 text-xs font-semibold text-neutral-400 uppercase tracking-wider">{title}</div>
      <div className="flex flex-col gap-3">
        {children}
      </div>
    </div>
  )
}

// Updated SourceButton to accept an icon component
function SourceButton({ label, icon: Icon }: { label: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-3 rounded-lg border border-gray-600 bg-gray-900/50 px-4 py-3 text-sm text-neutral-300 transition-colors hover:bg-gray-700"
      onClick={() => alert(`${label} — coming soon`)}
    >
      <Icon className="w-4 h-4 text-neutral-400 flex-shrink-0" />
      <span>{label}</span>
    </button>
  )
}