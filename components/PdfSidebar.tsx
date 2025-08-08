'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { FileText, X } from 'lucide-react'

interface PdfSidebarProps {
  sidebarMode: 'hover' | 'fixed'
  isSidebarOpen: boolean
  setIsSidebarOpen: (open: boolean) => void
  setSidebarMode: (mode: 'hover' | 'fixed') => void
  hoverAreaWidth: number
  adobeDivRef: React.RefObject<HTMLDivElement>
  uploadedFiles: File[]
  setUploadedFiles: React.Dispatch<React.SetStateAction<File[]>>
  activeFileIndex: number
  setActiveFileIndex: React.Dispatch<React.SetStateAction<number>>
}

export function PdfSidebar({
  sidebarMode,
  isSidebarOpen,
  setIsSidebarOpen,
  setSidebarMode,
  hoverAreaWidth,
  adobeDivRef,
  uploadedFiles,
  setUploadedFiles,
  activeFileIndex,
  setActiveFileIndex,
}: PdfSidebarProps) {
  const [sdkLoaded, setSdkLoaded] = useState(false)

  // Load SDK check (no-op if already loaded)
  useEffect(() => {
    const existingScript = document.querySelector('script[src="https://documentcloud.adobe.com/view-sdk/main.js"]')
    if (!existingScript) {
      const script = document.createElement('script')
      script.src = 'https://documentcloud.adobe.com/view-sdk/main.js'
      script.onload = () => setSdkLoaded(true)
      document.head.appendChild(script)
    } else {
      setSdkLoaded(true)
    }
  }, [])

  // file input handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter((f) => f.type === 'application/pdf')
    if (files.length === 0) {
      e.currentTarget.value = ''
      return
    }
    setUploadedFiles((prev) => {
      const next = [...prev, ...files]
      // activate first if previously empty
      if (prev.length === 0) setActiveFileIndex(0)
      return next
    })
    e.currentTarget.value = ''
  }

  const removePDF = (indexToRemove: number) => {
    setUploadedFiles((prev) => {
      const next = prev.filter((_, i) => i !== indexToRemove)
      if (activeFileIndex >= indexToRemove && activeFileIndex > 0) {
        setActiveFileIndex(activeFileIndex - 1)
      } else if (next.length === 0) {
        setActiveFileIndex(0)
      }
      return next
    })
  }

  return (
    <div
      className={`${isSidebarOpen ? 'w-72' : 'w-0'} transition-all duration-300 overflow-hidden border-r bg-muted/30`}
      style={{ position: 'relative', zIndex: 40 }}
    >
      {/* hover area */}
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
        className="p-4 flex flex-col h-full"
        onMouseEnter={() => sidebarMode === 'hover' && setIsSidebarOpen(true)}
        onMouseLeave={() => sidebarMode === 'hover' && setIsSidebarOpen(false)}
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-sm">Uploaded PDFs</h3>

          <div>
            <input
              id="sidebar-pdf-upload"
              type="file"
              accept="application/pdf"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
            <label htmlFor="sidebar-pdf-upload" className="cursor-pointer">
              <Button variant="outline" size="sm">+ Add</Button>
            </label>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          {uploadedFiles && uploadedFiles.length > 0 ? (
            <ScrollArea className="h-full">
              <div className="space-y-2">
                {uploadedFiles.map((file, i) => (
                  <div
                    key={`${file.name}-${i}`}
                    className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors ${i === activeFileIndex ? 'bg-blue-100 border border-blue-300' : 'bg-gray-50 hover:bg-gray-100'}`}
                    onClick={() => setActiveFileIndex(i)}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate" title={file.name}>{file.name}</p>
                      <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(1)} MB</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); removePDF(i) }}>
                      <X className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="text-center py-6 border-2 border-dashed rounded-lg">
              <FileText className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-xs text-muted-foreground mb-2">No PDFs uploaded</p>
              <label htmlFor="sidebar-pdf-upload" className="cursor-pointer">
                <Button variant="outline" size="sm">Upload PDF</Button>
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
