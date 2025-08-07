import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Brain, Headphones, Lightbulb, Upload, Eye } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Brain className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-gray-900 dark:text-white">DocAI</span>
        </div>
        <ThemeToggle />
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Document Intelligence
            <span className="block text-blue-600">Assistant</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Transform your PDF reading experience with AI-powered insights, cross-document analysis, 
            and intelligent content discovery. Upload, analyze, and discover connections like never before.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/upload">
              <Button size="lg" className="text-lg px-8 py-3">
                <Upload className="mr-2 h-5 w-5" />
                Get Started
              </Button>
            </Link>
            <Link href="/reader">
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                <Eye className="mr-2 h-5 w-5" />
                View Demo
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <FileText className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>Smart PDF Analysis</CardTitle>
              <CardDescription>
                Advanced document parsing and structure recognition for better content understanding.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Lightbulb className="h-12 w-12 text-yellow-600 mb-4" />
              <CardTitle>Intelligent Insights</CardTitle>
              <CardDescription>
                Discover hidden connections, contradictions, and cross-document references automatically.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Headphones className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>Podcast Mode</CardTitle>
              <CardDescription>
                Listen to your documents with AI-generated narrations and audio summaries.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to revolutionize your reading?</CardTitle>
              <CardDescription className="text-lg">
                Join thousands of users who have transformed their document workflow with AI assistance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/upload">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Reading Smarter Today
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
