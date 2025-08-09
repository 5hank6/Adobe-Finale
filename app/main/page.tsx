"use client"

import { useCallback, useMemo, useState } from "react"
import { AddSourcesModal } from "@/components/add-sources-modal"
import { StudioLayout } from "@/components/studio-layout"

type Source = {
  id: string
  name: string
  status: "processing" | "ready"
}

export default function MainPage() {
  const [open, setOpen] = useState(true)
  const [sources, setSources] = useState<Source[]>([])

  const handleFilesAdded = useCallback((files: File[]) => {
    const next = files.map((f) => ({
      id: `${f.name}-${crypto.randomUUID()}`,
      name: f.name,
      status: "processing" as const,
    }))
    setSources((prev) => [...prev, ...next])
    // Simulate ingest -> ready
    setTimeout(() => {
      setSources((prev) => prev.map((s) => (next.find((n) => n.id === s.id) ? { ...s, status: "ready" } : s)))
    }, 1200)
  }, [])

  const onOpenAdd = useCallback(() => setOpen(true), [])

  const title = useMemo(
    () => (sources.length ? sources[0].name.replace(/\.[^.]+$/, "") : "Untitled notebook"),
    [sources],
  )

  return (
    <div className="min-h-[100dvh] bg-[rgb(20,21,23)] text-white">
      <AddSourcesModal open={open} onOpenChange={setOpen} onFilesAdded={handleFilesAdded} />
      <StudioLayout title={title} sources={sources} onOpenAdd={onOpenAdd} />
    </div>
  )
}
