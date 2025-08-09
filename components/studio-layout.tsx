"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import {
  Activity,
  Share2,
  Settings,
  MoreHorizontal,
  Plus,
  Filter,
  Play,
  Loader2,
  Mic2,
  FileAudio2,
  FileVideo2,
  BrainCircuit,
  FileText,
  ChevronDown,
  Sparkles,
  NotebookPen,
  UploadCloud,
  FileIcon,
} from "lucide-react"

type Source = {
  id: string
  name: string
  status: "processing" | "ready"
}

export function StudioLayout({
  title,
  sources,
  onOpenAdd,
}: {
  title: string
  sources: Source[]
  onOpenAdd: () => void
}) {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <TopBar title={title} />
      {/* Force a horizontal, 3-column layout at all widths: scroll if viewport is smaller */}
      <div className="w-full flex-1 overflow-x-auto bg-[rgb(20,21,23)]">
        <div className="mx-auto min-w-[1280px] max-w-[1440px] px-2 pb-4 pt-2 sm:px-3">
          <div className="grid h-[calc(100dvh-48px-24px)] grid-cols-[320px,1fr,360px] gap-4">
            <SourcesPanel sources={sources} onOpenAdd={onOpenAdd} />
            <ChatPanel sources={sources} onOpenAdd={onOpenAdd} />
            <StudioPanel />
          </div>
        </div>
      </div>
      <FooterBar />
    </div>
  )
}

function TopBar({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-white/10 bg-[rgb(36,37,39)]/95 backdrop-blur">
      <div className="mx-auto flex h-12 w-full max-w-[1440px] items-center justify-between px-2 sm:px-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
            <NotebookPen className="h-3.5 w-3.5 text-white" />
          </span>
          <span className="text-sm font-medium">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <TopIcon icon={<Activity className="h-4 w-4" />} label="Analytics" />
          <TopIcon icon={<Share2 className="h-4 w-4" />} label="Share" />
          <TopIcon icon={<Settings className="h-4 w-4" />} label="Settings" />
          <button
            aria-label="More"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-neutral-300 hover:bg-white/10"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  )
}

function TopIcon({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-200 hover:bg-white/10">
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  )
}

function SourcesPanel({
  sources,
  onOpenAdd,
}: {
  sources: Source[]
  onOpenAdd: () => void
}) {
  const empty = sources.length === 0
  return (
    <Card className="flex h-full flex-col border-white/10 bg-[rgb(27,29,31)]">
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
        <div className="text-sm font-medium text-neutral-200">Sources</div>
        <button
          className="inline-flex h-7 w-7 items-center justify-center rounded-md text-neutral-400 hover:bg-white/10"
          aria-label="Filter"
        >
          <Filter className="h-4 w-4" />
        </button>
      </div>

      <div className="flex items-center gap-2 px-3 py-3">
        <button
          onClick={onOpenAdd}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm text-neutral-200 hover:bg-white/10"
        >
          <Plus className="h-4 w-4" />
          Add
        </button>
        <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm text-neutral-200 hover:bg-white/10">
          <Sparkles className="h-4 w-4" />
          Discover
        </button>
      </div>

      {empty && (
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
      )}

      {!empty && (
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

function ChatPanel({ sources, onOpenAdd }: { sources: Source[]; onOpenAdd: () => void }) {
  const empty = sources.length === 0
  return (
    <Card className="flex h-full flex-col border-white/10 bg-[rgb(27,29,31)]">
      <div className="border-b border-white/10 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-neutral-200">Chat</div>
          <button className="inline-flex h-7 w-7 items-center justify-center rounded-md text-neutral-400 hover:bg-white/10">
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="relative flex-1">
        {empty && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="pointer-events-auto text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/8">
                <UploadCloud className="h-5 w-5 text-neutral-300" />
              </div>
              <div className="mt-4 text-lg font-medium text-neutral-200">Add a source to get started</div>
              <div className="mt-2">
                <button
                  onClick={onOpenAdd}
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[13px] text-neutral-200 hover:bg-white/10"
                >
                  Upload a source
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-white/10 p-3">
        <div className="rounded-lg border border-white/10 bg-[rgb(23,24,26)] p-2">
          <Textarea
            placeholder={empty ? "Upload a source to get started" : "Start typing..."}
            className="min-h-[64px] resize-none border-none bg-transparent p-2 text-sm text-neutral-200 placeholder:text-neutral-500 focus-visible:ring-0"
          />
          <div className="mt-2 flex items-center justify-between gap-2">
            <div className="hidden w-full max-w-[680px] grid-cols-3 gap-2 md:grid">
              <Chip text="How does this B.Tech. AI curriculum evolve over the four years?" />
              <Chip text="What are the core competencies emphasized?" />
              <Chip text="Summarize major themes across sources." />
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                className="h-8 w-8 rounded-full bg-white/10 text-neutral-100 hover:bg-white/15"
                variant="secondary"
                aria-label="Record"
              >
                <Mic2 className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                className="h-8 w-8 rounded-full bg-indigo-500 text-white hover:bg-indigo-500/90"
                aria-label="Send"
              >
                <Play className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

function Chip({ text }: { text: string }) {
  return (
    <div className="truncate rounded-md border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-neutral-300">
      {text}
    </div>
  )
}

function StudioPanel() {
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

function FooterBar() {
  return (
    <div className="border-t border-white/10 px-3 py-2 text-center text-[11px] text-neutral-500">
      Responses may be inaccurate. Please double check.
    </div>
  )
}
