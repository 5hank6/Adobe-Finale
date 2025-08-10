"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { UploadCloud, Search, FolderOpen, X } from "lucide-react"

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
    const pdfs = list.filter((f) => f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf"))
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
    onOpenChange(false) // auto-close after choosing/dropping PDFs
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
        className="max-w-[1180px] border-none bg-[rgb(34,36,38)] p-0 text-white shadow-2xl sm:rounded-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-7 py-5">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
              <FolderOpen className="h-4 w-4 text-white/90" />
            </span>
            <div className="text-xl font-semibold">Add sources</div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              className="h-8 rounded-full bg-white/10 px-3 text-xs text-white hover:bg-white/15"
            >
              <Search className="mr-1 h-3.5 w-3.5" />
              Discover sources
            </Button>
            <DialogClose asChild>

            </DialogClose>
          </div>
        </div>

        {/* Body */}
        <div className="px-7 pb-7 pt-6">
          <p className="max-w-4xl text-[13px] leading-6 text-neutral-300">
            Add PDFs to ground responses with the information that matters to you. PDF only.
          </p>

          {/* Dropzone (PDF only) */}
          <div
            onDragOver={(e) => {
              e.preventDefault()
              setDragOver(true)
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            className={[
              "mt-4 rounded-xl border-2 border-dashed p-10",
              dragOver ? "border-fuchsia-500/70 bg-fuchsia-500/5" : "border-white/15 bg-[rgb(30,32,34)]",
            ].join(" ")}
            role="region"
            aria-label="Upload PDF sources"
          >
            <div className="mx-auto flex min-h-[260px] max-w-3xl flex-col items-center justify-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                <UploadCloud className="h-6 w-6 text-white/90" />
              </div>
              <div className="mt-3 text-[15px] font-medium">Upload PDF sources</div>
              <p className="mt-1 text-[13px] text-neutral-400">
                Drag & drop or{" "}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="font-medium text-fuchsia-400 underline-offset-4 hover:underline"
                >
                  choose PDF
                </button>{" "}
                to upload
              </p>
              <p className="mt-3 text-[12px] text-neutral-500">Supported file types: PDF</p>

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

          {/* Optional helper tiles (visual only) */}
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            <TileGroup title="Cloud files">
              <SourceButton label="Google Drive (PDF)" />
              <SourceButton label="Google Docs (export PDF)" />
              <SourceButton label="Google Slides (export PDF)" />
            </TileGroup>
            <TileGroup title="Links">
              <SourceButton label="Link (PDF URL)" />
              <SourceButton label="Website (download PDF)" />
              <SourceButton label="YouTube (transcript → PDF)" />
            </TileGroup>
            <TileGroup title="Text">
              <SourceButton label="Paste text (save as PDF)" />
              <SourceButton label="Copied text (save as PDF)" />
            </TileGroup>
          </div>

          {/* Bottom: limit */}
          <div className="mt-6 flex items-center gap-3">
            <div className="text-[12px] text-neutral-400">Source limit</div>
            <Progress value={progress} className="h-2 w-full bg-white/5" />
            <div className="w-16 text-right text-[12px] text-neutral-400">
              {used} / {limit}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function TileGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="border-white/10 bg-[rgb(28,30,32)] p-3">
      <div className="mb-2 text-[12px] font-medium text-neutral-300">{title}</div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </Card>
  )
}

function SourceButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-black/20 px-3 py-2 text-[12px] text-neutral-200 transition-colors hover:bg-white/10"
      onClick={() => alert(`${label} — coming soon`)}
    >
      <span className="inline-flex h-4 w-4 items-center justify-center rounded-[3px] bg-white/10" />
      <span>{label}</span>
    </button>
  )
}
