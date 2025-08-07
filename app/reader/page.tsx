'use client'

import { useState, useEffect, useRef } from 'react'
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
import { useRouter } from 'next/navigation'

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
  const [sdkLoaded, setSdkLoaded] = useState(false)
  const adobeDivRef = useRef<HTMLDivElement>(null)
  const adobeViewRef = useRef<any>(null) // Store Adobe DC View instance
  const router = useRouter()

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [activeFileIndex, setActiveFileIndex] = useState<number>(0)
  const [sidebarMode, setSidebarMode] = useState<'hover' | 'fixed'>('hover')

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

  // Load Adobe SDK
  useEffect(() => {
    const existingScript = document.querySelector('script[src="https://documentcloud.adobe.com/view-sdk/main.js"]')
    
    if (!existingScript) {
      const script = document.createElement('script')
      script.src = 'https://documentcloud.adobe.com/view-sdk/main.js'
      script.onload = () => setSdkLoaded(true)
      script.onerror = () => console.error('Failed to load Adobe PDF Embed API')
      document.head.appendChild(script)
    } else {
      setSdkLoaded(true)
    }

    // Simulate loading completion
    setTimeout(() => {
      setCurrentSection(mockSections[0])
      setRelatedContent(mockRelatedContent)
      setIsLoading(false)
    }, 2000)
  }, [])

  // Handle redirect when no files remain - with proper dependency array
  useEffect(() => {
    if (uploadedFiles.length === 0 && !isLoading) {
      const currentPath = window.location.pathname
      const currentSearch = window.location.search
      
      // Only redirect if we're not already on the base reader page
      if (currentPath !== '/reader' || currentSearch !== '') {
        const timer = setTimeout(() => {
          router.push('/reader')
        }, 500)
        return () => clearTimeout(timer)
      }
    }
  }, [uploadedFiles.length, isLoading, router])

  // Cleanup function for Adobe PDF viewer
  const cleanupAdobeViewer = () => {
    try {
      if (adobeDivRef.current) {
        // Clear the div content safely
        adobeDivRef.current.innerHTML = ''
      }
      // Reset the Adobe view reference
      adobeViewRef.current = null
    } catch (error) {
      console.error('Error cleaning up Adobe viewer:', error)
    }
  }

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.8
      utterance.pitch = 1
      speechSynthesis.speak(utterance)
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    const pdfFiles = files.filter(file => file.type === 'application/pdf')
    
    if (pdfFiles.length > 0) {
      console.log('Files selected:', pdfFiles.map(f => f.name))
      setUploadedFiles(prev => [...prev, ...pdfFiles])
      
      if (uploadedFiles.length === 0) {
        setActiveFileIndex(0)
      }
      
      const allFiles = [...uploadedFiles, ...pdfFiles]
      localStorage.setItem('uploadedPDFs', JSON.stringify(
        allFiles.map(file => ({
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified
        }))
      ))
    } else {
      alert('Please select valid PDF files.')
    }
    event.target.value = ''
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    e.currentTarget.style.backgroundColor = '#1a1a1a'
    
    const files = Array.from(e.dataTransfer.files)
    const pdfFiles = files.filter(file => file.type === 'application/pdf')
    
    if (pdfFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...pdfFiles])
      
      if (uploadedFiles.length === 0) {
        setActiveFileIndex(0)
      }
      
      const allFiles = [...uploadedFiles, ...pdfFiles]
      localStorage.setItem('uploadedPDFs', JSON.stringify(
        allFiles.map(file => ({
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified
        }))
      ))
    } else {
      alert('Please drop valid PDF files.')
    }
  }

  const removePDF = (indexToRemove: number) => {
    // Clean up Adobe viewer if we're removing the active file
    if (indexToRemove === activeFileIndex) {
      cleanupAdobeViewer()
    }

    const newFiles = uploadedFiles.filter((_, index) => index !== indexToRemove)
    setUploadedFiles(newFiles)
    
    // Adjust active index
    if (newFiles.length === 0) {
      setActiveFileIndex(0)
    } else if (activeFileIndex >= indexToRemove && activeFileIndex > 0) {
      setActiveFileIndex(activeFileIndex - 1)
    } else if (activeFileIndex === indexToRemove && newFiles.length > 0) {
      // If we removed the active file, set to the first available file
      setActiveFileIndex(0)
    }
    
    // Update localStorage
    localStorage.setItem('uploadedPDFs', JSON.stringify(
      newFiles.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified
      }))
    ))
  }

  // Adobe PDF Embed API integration with proper cleanup
  useEffect(() => {
    const currentFile = uploadedFiles[activeFileIndex]
    
    if (currentFile && sdkLoaded && window.AdobeDC && adobeDivRef.current) {
      console.log('Initializing Adobe PDF viewer for:', currentFile.name)
      
      // Clean up previous viewer first
      cleanupAdobeViewer()
      
      try {
        const adobeDCView = new window.AdobeDC.View({
          clientId: 'c00e026f37cc451aae1ee54adde2fca8',
          divId: 'adobe-dc-view'
        })

        // Store the Adobe view instance
        adobeViewRef.current = adobeDCView

        console.log('Starting file read process...')
        
        const reader = new FileReader()
        reader.onload = function (e) {
          if (e.target?.result && adobeViewRef.current) {
            console.log('File read successfully, initializing PDF viewer...')
            
            const loadingEl = document.getElementById('pdf-loading')
            if (loadingEl) {
              loadingEl.style.display = 'none'
            }
            
            adobeViewRef.current.previewFile({
              content: { location: { url: URL.createObjectURL(currentFile) } },
              metaData: { fileName: currentFile.name }
            }, {
              embedMode: 'SIZED_CONTAINER',
              showAnnotationTools: false,
              showLeftHandPanel: false,
              showDownloadPDF: false,
              showPrintPDF: false,
              showZoomControl: true,
              enableFormFilling: false,
              defaultViewMode: 'FIT_WIDTH'
            }).then(() => {
              console.log('PDF loaded successfully')
            }).catch((error) => {
              console.error('Error loading PDF:', error)
              // Don't show alert in cleanup scenarios
              if (uploadedFiles.length > 0) {
                alert('Error loading PDF: ' + error.message)
              }
            })
          }
        }
        
        reader.onerror = (error) => {
          console.error('FileReader error:', error)
          if (uploadedFiles.length > 0) {
            alert('Error reading file: ' + error)
          }
        }
        
        reader.readAsDataURL(currentFile)
      } catch (error) {
        console.error('Error initializing Adobe PDF viewer:', error)
        if (uploadedFiles.length > 0) {
          alert('Error initializing PDF viewer: ' + error.message)
        }
      }
    } else if (uploadedFiles.length === 0) {
      // Clean up when no files are present
      cleanupAdobeViewer()
    }

    // Cleanup function for this useEffect
    return () => {
      if (uploadedFiles.length === 0) {
        cleanupAdobeViewer()
      }
    }
  }, [uploadedFiles, activeFileIndex, sdkLoaded])

  // Component cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupAdobeViewer()
    }
  }, [])

  const hoverAreaWidth = 40

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
              {uploadedFiles[activeFileIndex]?.name || 'No PDF loaded'}
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
        {/* Hamburger Button */}
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle sidebar mode"
          className="mt-4 ml-2"
          style={{ position: 'fixed', left: 0, top: '80px', zIndex: 50 }}
          onClick={() => {
            if (sidebarMode === 'fixed') {
              setSidebarMode('hover')
              setIsSidebarOpen(false)
            } else {
              setSidebarMode('fixed')
              setIsSidebarOpen(true)
            }
          }}
        >
          <Menu className={`h-6 w-6 ${sidebarMode === 'fixed' ? 'text-blue-600' : 'text-muted-foreground'}`} />
        </Button>

        {/* Sidebar with extra hover area */}
        <div
          className={`${isSidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden border-r bg-muted/30`}
          style={{
            position: 'relative',
            zIndex: 40,
          }}
        >
          {/* Extra hover area */}
          {sidebarMode === 'hover' && (
            <div
              style={{
                position: 'fixed',
                left: 0,
                top: '73px',
                width: `${hoverAreaWidth}px`,
                height: '100vh',
                zIndex: 30,
              }}
              onMouseEnter={() => setIsSidebarOpen(true)}
              onMouseLeave={() => setIsSidebarOpen(false)}
            />
          )}

          <div
            className="p-4"
            onMouseEnter={() => {
              if (sidebarMode === 'hover') setIsSidebarOpen(true)
            }}
            onMouseLeave={() => {
              if (sidebarMode === 'hover') setIsSidebarOpen(false)
            }}
          >
            {/* PDF Tabs Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">Uploaded PDFs</h3>
                <div className="flex items-center space-x-2">
                  <input 
                    id="sidebar-pdf-upload"
                    type="file" 
                    accept="application/pdf" 
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="sidebar-pdf-upload" className="cursor-pointer">
                    <Button variant="outline" size="sm" asChild>
                      <span className="text-xs">+ Add PDF</span>
                    </Button>
                  </label>
                </div>
              </div>
              
              {/* PDF Tabs */}
              {uploadedFiles.length > 0 ? (
                <ScrollArea className="h-32">
                  <div className="space-y-1">
                    {uploadedFiles.map((file, index) => (
                      <div
                        key={`${file.name}-${index}`}
                        className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors ${
                          activeFileIndex === index 
                            ? 'bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700' 
                            : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                        onClick={() => setActiveFileIndex(index)}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium truncate" title={file.name}>
                            {file.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {(file.size / 1024 / 1024).toFixed(1)} MB
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-red-100 dark:hover:bg-red-900/30"
                          onClick={(e) => {
                            e.stopPropagation()
                            removePDF(index)
                          }}
                        >
                          <X className="h-3 w-3 text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="text-center py-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                  <FileText className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-xs text-muted-foreground mb-2">No PDFs uploaded</p>
                  <label htmlFor="sidebar-pdf-upload" className="cursor-pointer">
                    <Button variant="outline" size="sm" asChild>
                      <span className="text-xs">Upload PDF</span>
                    </Button>
                  </label>
                </div>
              )}
            </div>

            <Separator className="mb-4" />

            {/* Document Sections */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm">Document Sections</h3>
              {uploadedFiles.length > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {uploadedFiles[activeFileIndex]?.name.substring(0, 15)}...
                </Badge>
              )}
            </div>
            
            <ScrollArea className="h-[calc(100vh-400px)]">
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
        <div className="flex-1 bg-gray-900 relative">
          {/* Adobe PDF Viewer */}
          <div 
            ref={adobeDivRef} 
            id="adobe-dc-view" 
            className="w-full h-full"
            style={{ 
              minHeight: 'calc(100vh - 73px)',
              backgroundColor: '#1a1a1a'
            }}
            onDragOver={(e) => {
              e.preventDefault()
              e.stopPropagation()
              e.currentTarget.style.backgroundColor = '#2a2a2a'
            }}
            onDragLeave={(e) => {
              e.preventDefault()
              e.stopPropagation()
              e.currentTarget.style.backgroundColor = '#1a1a1a'
            }}
            onDrop={handleDrop}
          >
            {/* Fallback content when no PDF is loaded */}
            {uploadedFiles.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-white">
                <div className="bg-gray-800 rounded-lg p-8 max-w-2xl mx-auto border border-gray-700">
                  <div className="flex items-center mb-6">
                    <FileText className="h-8 w-8 mr-3 text-blue-400" />
                    <h2 className="text-2xl font-bold">PDF Viewer</h2>
                  </div>
                  
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-12 text-center mb-6">
                    <p className="text-gray-400 mb-4">
                      Drag & Drop PDF here or click to select
                    </p>
                    <div className="flex justify-center space-x-2 mb-4">
                      <Button variant="outline" size="sm" className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600">
                        <ZoomIn className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600">
                        <ZoomOut className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600">
                        <RotateCw className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500">
                      Currently showing: {currentSection?.title || 'Select a section'}
                    </p>
                  </div>

                  <div className="text-center">
                    <input 
                      id="pdf-upload"
                      type="file" 
                      accept="application/pdf" 
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label htmlFor="pdf-upload" className="cursor-pointer">
                      <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                        <span>Choose PDF File</span>
                      </Button>
                    </label>
                    <p className="text-xs text-gray-500 mt-2">
                      Upload a PDF to start viewing and analyzing
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Loading state */}
            {uploadedFiles.length > 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 z-10" id="pdf-loading">
                <div className="text-center text-white">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto mb-4"></div>
                  <p>Loading PDF: {uploadedFiles[activeFileIndex]?.name}</p>
                  <p className="text-sm text-gray-400 mt-2">Please wait...</p>
                </div>
              </div>
            )}
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