'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { FileText, Lightbulb, Headphones, Volume2, ZoomIn, ZoomOut, RotateCw, Menu, X } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { InsightPanel } from '@/components/insight-panel'
import { PodcastMode } from '@/components/podcast-mode'
import Link from 'next/link'

interface DocumentSection {
  id: string
  title: string
  content: string
  page: number
  insights: string[]
}

interface RelatedContent {
  id: string
  title: string
  snippet: string
  relevance: number
  source: string
}

export default function ReaderPage() {
  const [currentSection, setCurrentSection] = useState<DocumentSection | null>(null)
  const [relatedContent, setRelatedContent] = useState<RelatedContent[]>([])
  const [isInsightPanelOpen, setIsInsightPanelOpen] = useState(false)
  const [isPodcastMode, setIsPodcastMode] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [uploadedFile, setUploadedFile] = useState<any>(null)

  // Mock data
  const mockSections: DocumentSection[] = [
    {
      id: '1',
      title: 'Introduction to Machine Learning',
      content: 'Machine learning is a subset of artificial intelligence that focuses on algorithms that can learn from data...',
      page: 1,
      insights: ['Key concept: supervised vs unsupervised learning', 'Historical context: emerged in 1950s']
    },
    {
      id: '2',
      title: 'Neural Networks Fundamentals',
      content: 'Neural networks are computing systems inspired by biological neural networks...',
      page: 3,
      insights: ['Breakthrough: backpropagation algorithm', 'Connection to human brain structure']
    },
    {
      id: '3',
      title: 'Deep Learning Applications',
      content: 'Deep learning has revolutionized computer vision, natural language processing...',
      page: 7,
      insights: ['Real-world impact: image recognition accuracy', 'Future potential in healthcare']
    }
  ]

  const mockRelatedContent: RelatedContent[] = [
    {
      id: '1',
      title: 'The History of AI',
      snippet: 'Artificial intelligence research began in the 1950s with the goal of creating machines that could think...',
      relevance: 0.95,
      source: 'AI_History.pdf'
    },
    {
      id: '2',
      title: 'Statistical Learning Theory',
      snippet: 'The mathematical foundations of machine learning are rooted in statistical learning theory...',
      relevance: 0.87,
      source: 'Statistics_ML.pdf'
    },
    {
      id: '3',
      title: 'Computer Vision Breakthroughs',
      snippet: 'Recent advances in computer vision have been driven by convolutional neural networks...',
      relevance: 0.82,
      source: 'CV_Advances.pdf'
    }
  ]

  useEffect(() => {
    // Load uploaded file data
    const fileData = localStorage.getItem('uploadedPDF')
    if (fileData) {
      setUploadedFile(JSON.parse(fileData))
    }

    // Simulate loading
    setTimeout(() => {
      setCurrentSection(mockSections[0])
      setRelatedContent(mockRelatedContent)
      setIsLoading(false)
    }, 2000)
  }, [])

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.8
      utterance.pitch = 1
      speechSynthesis.speak(utterance)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Processing your document...</p>
          <p className="text-sm text-muted-foreground mt-2">Extracting insights and analyzing content</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-lg">DocAI</span>
            </Link>
            <Separator orientation="vertical" className="h-6" />
            <span className="text-sm text-muted-foreground">
              {uploadedFile?.name || 'Sample Document.pdf'}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPodcastMode(true)}
            >
              <Headphones className="h-4 w-4 mr-2" />
              Podcast Mode
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsInsightPanelOpen(true)}
            >
              <Lightbulb className="h-4 w-4 mr-2" />
              Insights
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar */}
        <div className={`${isSidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden border-r bg-muted/30`}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Document Sections</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <ScrollArea className="h-[calc(100vh-200px)]">
              <div className="space-y-2">
                {mockSections.map((section) => (
                  <Card
                    key={section.id}
                    className={`cursor-pointer transition-colors hover:bg-accent ${
                      currentSection?.id === section.id ? 'bg-accent border-blue-500' : ''
                    }`}
                    onClick={() => setCurrentSection(section)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm mb-1">{section.title}</h4>
                          <p className="text-xs text-muted-foreground mb-2">
                            Page {section.page}
                          </p>
                          <Badge variant="secondary" className="text-xs">
                            {section.insights.length} insights
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            speakText(section.content)
                          }}
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* PDF Viewer */}
          <div className="flex-1 bg-gray-100 dark:bg-gray-900 relative">
            {!isSidebarOpen && (
              <Button
                variant="outline"
                size="sm"
                className="absolute top-4 left-4 z-10"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu className="h-4 w-4" />
              </Button>
            )}
            
            {/* PDF Embed Placeholder */}
            <div className="h-full flex items-center justify-center">
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-6 w-6 mr-2" />
                    PDF Viewer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-white dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 text-center">
                    <p className="text-muted-foreground mb-4">
                      Adobe PDF Embed API would be integrated here
                    </p>
                    <div className="flex justify-center space-x-2 mb-4">
                      <Button variant="outline" size="sm">
                        <ZoomIn className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <ZoomOut className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <RotateCw className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Currently showing: {currentSection?.title || 'Select a section'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-96 border-l bg-background p-4">
            <div className="space-y-6">
              {/* Current Section */}
              {currentSection && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center justify-between">
                      Current Section
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => speakText(currentSection.content)}
                      >
                        <Volume2 className="h-4 w-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold mb-2">{currentSection.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {currentSection.content.substring(0, 150)}...
                    </p>
                    <div className="space-y-2">
                      {currentSection.insights.map((insight, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <p className="text-sm">{insight}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Related Content */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Related Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-64">
                    <div className="space-y-3">
                      {relatedContent.map((content) => (
                        <div key={content.id} className="border rounded-lg p-3">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-sm">{content.title}</h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => speakText(content.snippet)}
                            >
                              <Volume2 className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">
                            {content.snippet}
                          </p>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                              {content.source}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {Math.round(content.relevance * 100)}% match
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Insight Button */}
      <Button
        className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg"
        onClick={() => setIsInsightPanelOpen(true)}
      >
        <Lightbulb className="h-6 w-6" />
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
  )
}
