'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { FileText, Lightbulb, Headphones, Menu, X } from 'lucide-react'

import { ThemeToggle } from '@/components/theme-toggle'
import { InsightPanel } from '@/components/insight-panel'
import { PodcastMode } from '@/components/podcast-mode'
// import { PdfSidebar } from '@/components/PdfSidebar'
import { PdfManager } from '@/components/PdfManager'
import { CurrentSectionCard } from '@/components/CurrentSectionCard'
import { RelatedContentCard } from '@/components/RelatedContentCard'

type Section = {
  title: string
  content: string
  insights?: string[]
}

type RelatedItem = {
  id: string
  title: string
  snippet: string
  relevance: number
  source: string
}

export default function ReaderPage() {
  const [currentSection, setCurrentSection] = useState<Section | null>(null)
  const [relatedContent, setRelatedContent] = useState<RelatedItem[]>([])
  const [isInsightPanelOpen, setIsInsightPanelOpen] = useState(false)
  const [isPodcastMode, setIsPodcastMode] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [sidebarMode, setSidebarMode] = useState<'hover' | 'fixed'>('hover')
  const [showCurrentSectionPanel, setShowCurrentSectionPanel] = useState(false)
  const [showRelatedContentPanel, setShowRelatedContentPanel] = useState(false)

  const hoverAreaWidth = 40
  const adobeDivRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [activeFileIndex, setActiveFileIndex] = useState<number>(0)
  // Demo data; keep your real data wiring as-is
  useEffect(() => {
    const t = setTimeout(() => {
      setCurrentSection({
        title: 'Introduction to Machine Learning',
        content:
          'Machine learning is a subset of artificial intelligence that focuses on algorithms that can learn from data...',
        insights: [
          'Key concept: supervised vs unsupervised learning',
          'Historical context: emerged in 1950s',
        ],
      })

      setRelatedContent([
        {
          id: '1',
          title: 'The History of AI',
          snippet:
            'Artificial intelligence research began in the 1950s with the goal of creating machines that could think...',
          relevance: 0.95,
          source: 'AI_History.pdf',
        },
        {
          id: '2',
          title: 'Statistical Learning Theory',
          snippet:
            'The mathematical foundations of machine learning are rooted in statistical learning theory...',
          relevance: 0.87,
          source: 'Statistics_ML.pdf',
        },
        {
          id: '3',
          title: 'Computer Vision Breakthroughs',
          snippet:
            'Recent advances in computer vision have been driven by convolutional neural networks...',
          relevance: 0.82,
          source: 'CV_Advances.pdf',
        },
      ])
    }, 500)
    return () => clearTimeout(t)
  }, [])

  // Text-to-speech
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1
      speechSynthesis.speak(utterance)
    }
  }

  const filename = uploadedFiles[activeFileIndex]?.name || 'No PDF loaded'

  return (
    <TooltipProvider delayDuration={150}>
      <div className="relative min-h-screen bg-background">
        {/* Futuristic subtle background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute inset-0 bg-[radial-gradient(1000px_600px_at_20%_0%,hsl(160_85%_40%_/0.08),transparent_60%),radial-gradient(800px_600px_at_80%_100%,hsl(192_85%_45%_/0.08),transparent_60%)]" />
          <div className="absolute inset-0 [mask-image:radial-gradient(white,transparent_65%)] bg-[linear-gradient(to_right,hsl(0_0%_60%_/0.06)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_60%_/0.06)_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        {/* Header */}
        <header className="sticky top-0 z-50 border-b">
          <div className="supports-[backdrop-filter]:bg-background/60 bg-background/95 backdrop-blur">
            <div className="container mx-auto flex items-center justify-between gap-3 px-4 py-3">
              {/* Left: Brand */}
              <div className="flex min-w-0 items-center gap-3">
                <Link href="/" className="group flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border bg-gradient-to-br from-emerald-500/15 to-cyan-500/15 text-emerald-500 ring-1 ring-emerald-500/20 transition group-hover:from-emerald-500/25 group-hover:to-cyan-500/25">
                    <FileText className="h-4 w-4" />
                  </span>
                  <span className="truncate bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-lg font-semibold text-transparent">
                  Connecting Dots
                  </span>
                </Link>

                <Separator orientation="vertical" className="h-6" />

                <div className="truncate text-sm text-muted-foreground">
                  {filename}
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCurrentSectionPanel(true)}
                >
                  Current Section
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowRelatedContentPanel(true)}
                >
                  Related Content
                </Button>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsPodcastMode(true)}
                    >
                      <Headphones className="mr-2 h-4 w-4" />
                      Podcast
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Start podcast mode</TooltipContent>
                </Tooltip>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </header>

        {/* Content layout */}
        <div className="relative flex h-[calc(100vh-57px)]">
          {/* Left rail toggle */}
          {/* <div className="fixed left-2 top-[76px] z-50">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle sidebar mode"
            className="h-9 w-9 rounded-full border bg-background/70 backdrop-blur"
            onClick={() => {
              if (sidebarMode === 'fixed') {
                setSidebarMode('hover')
                setIsSidebarOpen(false) // Close sidebar when switching to hover
              } else {
                setSidebarMode('fixed')
                setIsSidebarOpen(true) // Open sidebar when switching to fixed
              }
            }}
          >
            <Menu
              className={`h-5 w-5 ${
                sidebarMode === 'fixed'
                  ? 'text-emerald-500'
                  : 'text-muted-foreground'
              }`}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {sidebarMode === 'fixed' ? 'Collapse to hover' : 'Pin sidebar'}
        </TooltipContent>
      </Tooltip>
    </div> */}

          {/* Sidebar */}
          {/* <PdfSidebar
            sidebarMode={sidebarMode}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            setSidebarMode={setSidebarMode}
            hoverAreaWidth={hoverAreaWidth}
            adobeDivRef={adobeDivRef}
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
            activeFileIndex={activeFileIndex}
            setActiveFileIndex={setActiveFileIndex}
          /> */}

          {/* Main */}
          <main className="flex-1 h-[calc(100vh-57px)]"> {/* 57px for header height */}
  <div className="h-full w-full">
    <PdfManager />
  </div>
</main>

          {/* Slide-over panels */}
          {showCurrentSectionPanel && (
            <div className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-background shadow-lg border-l flex flex-col">
              <div className="flex justify-between items-center p-4 border-b">
                <span className="font-semibold text-lg">Current Section</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowCurrentSectionPanel(false)}
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="overflow-y-auto p-4 flex-1">
                {currentSection && (
                  <CurrentSectionCard section={currentSection} onSpeak={speakText} />
                )}
              </div>
            </div>
          )}
          {showRelatedContentPanel && (
            <div className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-background shadow-lg border-l flex flex-col">
              <div className="flex justify-between items-center p-4 border-b">
                <span className="font-semibold text-lg">Related Content</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowRelatedContentPanel(false)}
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="overflow-y-auto p-4 flex-1">
                <RelatedContentCard contents={relatedContent} onSpeak={speakText} />
              </div>
            </div>
          )}
        </div>

        {/* Floating Insight Button */}
        <Button
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full border bg-background/80 shadow-lg backdrop-blur transition hover:shadow-xl"
          onClick={() => setIsInsightPanelOpen(true)}
          aria-label="Open insights"
          variant="outline"
        >
          <Lightbulb className="h-6 w-6 text-emerald-500" />
        </Button>

        {/* Insight Panel */}
        <InsightPanel
          isOpen={isInsightPanelOpen}
          onClose={() => setIsInsightPanelOpen(false)}
          currentSection={currentSection}
        />

        {/* Podcast Mode */}
        <PodcastMode
          isOpen={isPodcastMode}
          onClose={() => setIsPodcastMode(false)}
          currentSection={currentSection}
          relatedContent={relatedContent}
        />
      </div>
    </TooltipProvider>
  )
}