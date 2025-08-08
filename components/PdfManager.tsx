'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { FileText, X, Plus } from 'lucide-react'

export function PdfManager() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [activeFileIndex, setActiveFileIndex] = useState<number>(0)
  const [sdkLoaded, setSdkLoaded] = useState(false)
  const adobeDivRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load Adobe PDF SDK
  useEffect(() => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://documentcloud.adobe.com/view-sdk/main.js"]'
    )
    if (!existingScript) {
      const script = document.createElement('script')
      script.src = 'https://documentcloud.adobe.com/view-sdk/main.js'
      script.onload = () => setSdkLoaded(true)
      document.head.appendChild(script)
    } else {
      setSdkLoaded(true)
    }
  }, [])

  // Render PDF in Adobe Viewer
  useEffect(() => {
    if (uploadedFiles.length === 0 && adobeDivRef.current) {
      adobeDivRef.current.innerHTML = '' // ✅ Clear viewer if no PDFs
      return
    }

    const currentFile = uploadedFiles[activeFileIndex]
    if (currentFile && sdkLoaded && window.AdobeDC && adobeDivRef.current) {
      adobeDivRef.current.innerHTML = ''
      const adobeDCView = new window.AdobeDC.View({
        clientId: 'c00e026f37cc451aae1ee54adde2fca8',
        divId: 'adobe-dc-view'
      })

      const reader = new FileReader()
      reader.onload = function (e) {
        adobeDCView.previewFile(
          {
            content: { promise: Promise.resolve(e.target?.result) },
            metaData: { fileName: currentFile.name }
          },
          {
            embedMode: 'SIZED_CONTAINER',
            showDownloadPDF: true,
            showPrintPDF: true,
            defaultViewMode: 'FIT_WIDTH'
          }
        )
      }
      reader.readAsArrayBuffer(currentFile)
    }
  }, [uploadedFiles, activeFileIndex, sdkLoaded])

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter(
      (file) => file.type === 'application/pdf'
    )
    if (files.length > 0) {
      setUploadedFiles((prev) => [...prev, ...files])
      if (uploadedFiles.length === 0) setActiveFileIndex(0)
    } else {
      alert('Please select valid PDF files.')
    }
    e.target.value = '' // reset input
  }

  // Handle drag & drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files).filter(
      (file) => file.type === 'application/pdf'
    )
    if (files.length > 0) {
      setUploadedFiles((prev) => [...prev, ...files])
      if (uploadedFiles.length === 0) setActiveFileIndex(0)
    } else {
      alert('Please drop valid PDF files.')
    }
  }

  // Remove file
  const removePDF = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index)
    setUploadedFiles(newFiles)

    if (newFiles.length === 0) {
      setActiveFileIndex(0) // reset
      if (adobeDivRef.current) adobeDivRef.current.innerHTML = '' // ✅ Clear viewer
    } else if (activeFileIndex >= index && activeFileIndex > 0) {
      setActiveFileIndex(activeFileIndex - 1)
    }
  }

  return (
    <div
      className="flex flex-col h-screen w-full bg-gray-100"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {/* Tab Bar */}
      {uploadedFiles.length > 0 && (
        <div className="flex items-center bg-white border-b px-2">
          {uploadedFiles.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className={`flex items-center px-3 py-2 border-r cursor-pointer ${
                activeFileIndex === index
                  ? 'bg-blue-100 border-b-2 border-blue-500'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => setActiveFileIndex(index)}
            >
              <span className="text-sm truncate max-w-[150px]">{file.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  removePDF(index)
                }}
                className="ml-2 text-gray-500 hover:text-red-500"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}

          {/* Add PDF button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center px-3 py-2 text-gray-500 hover:bg-gray-100"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Viewer / Upload Area */}
      <div className="flex-1 flex items-center justify-center">
        {uploadedFiles.length === 0 ? (
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg p-10 w-full h-full bg-white">
            <FileText className="h-12 w-12 text-gray-500 mb-4" />
            <p className="text-gray-600 mb-4">
              Drag & Drop your PDFs here or click below
            </p>
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Choose PDF
            </Button>
          </div>
        ) : (
          <div
            ref={adobeDivRef}
            id="adobe-dc-view"
            className="w-full h-full rounded-lg overflow-hidden border bg-white"
          />
        )}
      </div>
    </div>
  )
}
