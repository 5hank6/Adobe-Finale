"use client"

import { useCallback, useMemo, useState } from "react"
import { AddSourcesModal } from "@/components/add-sources-modal"
import { SourcesPanel } from "@/components/sources-panel"
import { CenterIntake } from "@/components/center-intake"
import { StudioPanel } from "@/components/studio-panel"

type Source = {
  id: string
  name: string
  status: "processing" | "ready"
}

export default function MainPage() {
  const [modalOpen, setModalOpen] = useState(true)
  const [sources, setSources] = useState<Source[]>([])
  const [persona, setPersona] = useState("Undergraduate Chemistry Student")
  const [job, setJob] = useState("Identify key concepts and mechanisms for exam preparation on reaction kinetics")

  // PDFs are enforced in the modal
  const handleFilesAdded = useCallback((files: File[]) => {
    const next = files.map((f) => ({
      id: `${f.name}-${crypto.randomUUID()}`,
      name: f.name,
      status: "processing" as const,
    }))
    setSources((prev) => [...prev, ...next])
    setTimeout(() => {
      setSources((prev) => prev.map((s) => (next.find((n) => n.id === s.id) ? { ...s, status: "ready" } : s)))
    }, 1200)
  }, [])

  const title = useMemo(
    () => (sources.length ? sources[0].name.replace(/\.[^.]+$/, "") : "Untitled notebook"),
    [sources],
  )

  const openModal = useCallback(() => setModalOpen(true), [])

  return (
    <div className="min-h-[100dvh] bg-[rgb(20,21,23)] text-white">
      <AddSourcesModal open={modalOpen} onOpenChange={setModalOpen} onFilesAdded={handleFilesAdded} />

      {/* Exactly three vertical columns (1/3 each). Stays horizontal at all widths. */}
      <div className="w-full px-3 py-3">
        <div className="grid h-[calc(100dvh-24px)] w-full grid-cols-3 gap-4">
          {/* 1/3 width */}
          <div className="h-full">
            <SourcesPanel sources={sources} onOpenAdd={openModal} />
          </div>

          {/* 1/3 width */}
          <div className="h-full">
            <CenterIntake
              title={title}
              hasSources={sources.length > 0}
              persona={persona}
              job={job}
              onPersonaChange={setPersona}
              onJobChange={setJob}
              onOpenAdd={openModal}
            />
          </div>

          {/* 1/3 width */}
          <div className="h-full">
            <StudioPanel />
          </div>
        </div>
      </div>
    </div>
  )
}
