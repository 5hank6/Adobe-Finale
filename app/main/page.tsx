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
  url?: string // Added url property to Source type
}

export default function MainPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [sources, setSources] = useState<Source[]>([])
  const [persona, setPersona] = useState("Undergraduate Chemistry Student")
  const [job, setJob] = useState(
    "Identify key concepts and mechanisms for exam preparation on reaction kinetics"
  )
  const [activeTab, setActiveTab] = useState("sources")
  const [selectedPdfUrl, setSelectedPdfUrl] = useState<string | undefined>(undefined);
  const [selectedPdfName, setSelectedPdfName] = useState("Untitled notebook");

  const handleFilesAdded = useCallback((files: File[]) => {
    const next = files.map((f) => ({
      id: `${f.name}-${crypto.randomUUID()}`,
      name: f.name,
      status: "processing" as const,
      url: URL.createObjectURL(f), // Create a blob URL for the file
    }))
    setSources((prev) => [...prev, ...next])
    setTimeout(() => {
      setSources((prev) =>
        prev.map((s) =>
          next.find((n) => n.id === s.id)
            ? { ...s, status: "ready" }
            : s
        )
      )
      // Automatically select the first uploaded PDF
      if (next.length > 0) {
        setSelectedPdfUrl(next[0].url);
        setSelectedPdfName(next[0].name.replace(/\.[^.]+$/, ""));
      }
    }, 1200)
  }, [])
  
  const handleRemoveSource = useCallback((id: string) => {
    setSources((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const openModal = useCallback(() => setModalOpen(true), [])

  return (
    <div className="min-h-[100dvh] bg-[rgb(20,21,23)] text-white flex flex-col">
      {/* Load the Adobe DC View SDK script */}
      <script src="https://documentcloud.adobe.com/view-sdk/main.js"></script>
      <AddSourcesModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onFilesAdded={handleFilesAdded}
      />

      <div className="px-6 py-3 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-black rounded-full"></div>
            </div>
            <span className="text-lg font-semibold">Acrobat Content</span>
          </div>
          <div className="md:hidden flex space-x-4">
            <button
              onClick={() => setActiveTab("sources")}
              className={`pb-2 px-1 text-base font-medium transition-colors duration-200 ${
                activeTab === "sources" ? "border-b-2 border-white text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              Sources
            </button>
            <button
              onClick={() => setActiveTab("chat")}
              className={`pb-2 px-1 text-base font-medium transition-colors duration-200 ${
                activeTab === "chat" ? "border-b-2 border-white text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              Chat
            </button>
            <button
              onClick={() => setActiveTab("studio")}
              className={`pb-2 px-1 text-base font-medium transition-colors duration-200 ${
                activeTab === "studio" ? "border-b-2 border-white text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              Studio
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-gray-400">
          <span className="text-lg">🔒</span>
          <span className="text-lg">⚙️</span>
          <span className="px-2 py-1 text-sm font-bold text-yellow-400 border border-yellow-400 rounded-full">PRO</span>
          <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">
              S
            </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="grid h-[calc(100vh-100px)] w-full gap-4 md:grid-cols-3 lg:grid-cols-4">
          <div className={`h-full md:block ${activeTab === "sources" ? "block" : "hidden"}`}>
            <SourcesPanel
              sources={sources}
              onOpenAdd={openModal}
              onSelectSource={(url, name) => {
                setSelectedPdfUrl(url);
                setSelectedPdfName(name.replace(/\.[^.]+$/, ""));
              }}
              onRemoveSource={handleRemoveSource}
            />
          </div>
          <div className={`h-full md:col-span-2 lg:col-span-2 col-span-1 md:block ${activeTab === "chat" ? "block" : "hidden"}`}>
            <CenterIntake
              title={selectedPdfName}
              hasSources={sources.length > 0}
              persona={persona}
              job={job}
              onPersonaChange={setPersona}
              onJobChange={setJob}
              onOpenAdd={openModal}
              pdfUrl={selectedPdfUrl} // Pass the selected PDF URL here
            />
          </div>
          <div className={`h-full md:block ${activeTab === "studio" ? "block" : "hidden"}`}>
            <StudioPanel />
          </div>
        </div>
      </div>
    </div>
  )
}
