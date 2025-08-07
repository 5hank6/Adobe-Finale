'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Upload, FileText, X, CheckCircle, AlertCircle } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import Link from 'next/link'

interface UploadedFile {
  id: string
  name: string
  size: number
  status: 'uploading' | 'processing' | 'completed' | 'error'
  progress: number
}

export default function UploadPage() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const router = useRouter()

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const processFile = async (file: File) => {
    const fileId = Math.random().toString(36).substr(2, 9)
    const newFile: UploadedFile = {
      id: fileId,
      name: file.name,
      size: file.size,
      status: 'uploading',
      progress: 0
    }

    setFiles(prev => [...prev, newFile])

    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 100))
      setFiles(prev => prev.map(f => 
        f.id === fileId ? { ...f, progress } : f
      ))
    }

    // Simulate processing
    setFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, status: 'processing', progress: 0 } : f
    ))

    for (let progress = 0; progress <= 100; progress += 20) {
      await new Promise(resolve => setTimeout(resolve, 200))
      setFiles(prev => prev.map(f => 
        f.id === fileId ? { ...f, progress } : f
      ))
    }

    // Complete
    setFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, status: 'completed', progress: 100 } : f
    ))

    // Store file data for reader page
    localStorage.setItem('uploadedPDF', JSON.stringify({
      name: file.name,
      size: file.size,
      uploadedAt: new Date().toISOString()
    }))
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const droppedFiles = Array.from(e.dataTransfer.files)
    const pdfFiles = droppedFiles.filter(file => file.type === 'application/pdf')
    
    pdfFiles.forEach(processFile)
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    const pdfFiles = selectedFiles.filter(file => file.type === 'application/pdf')
    
    pdfFiles.forEach(processFile)
  }, [])

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const completedFiles = files.filter(f => f.status === 'completed')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <FileText className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-gray-900 dark:text-white">DocAI</span>
        </Link>
        <ThemeToggle />
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Upload Your Documents
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Upload single or multiple PDF files to start your intelligent reading experience
            </p>
          </div>

          {/* Upload Area */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                  isDragOver
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Drop your PDF files here
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  or click to browse and select files
                </p>
                <input
                  type="file"
                  multiple
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button className="cursor-pointer">
                    Select PDF Files
                  </Button>
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                  Supports multiple PDF files up to 10MB each
                </p>
              </div>
            </CardContent>
          </Card>

          {/* File List */}
          {files.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Uploaded Files ({files.length})</CardTitle>
                <CardDescription>
                  Track the progress of your file uploads and processing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {files.map((file) => (
                    <div key={file.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="flex-shrink-0">
                        {file.status === 'completed' ? (
                          <CheckCircle className="h-6 w-6 text-green-500" />
                        ) : file.status === 'error' ? (
                          <AlertCircle className="h-6 w-6 text-red-500" />
                        ) : (
                          <FileText className="h-6 w-6 text-blue-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {file.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {formatFileSize(file.size)} • {file.status}
                        </p>
                        {file.status !== 'completed' && file.status !== 'error' && (
                          <Progress value={file.progress} className="mt-2" />
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(file.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          {completedFiles.length > 0 && (
            <div className="text-center">
              <Button
                size="lg"
                onClick={() => router.push('/reader')}
                className="mr-4"
              >
                Start Reading
              </Button>
              <Button variant="outline" size="lg">
                Upload More Files
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
