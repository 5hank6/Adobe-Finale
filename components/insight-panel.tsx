'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { X, Lightbulb, AlertTriangle, Link2, Volume2, Sparkles, BookOpen, TrendingUp } from 'lucide-react'

interface InsightPanelProps {
  isOpen: boolean
  onClose: () => void
  currentSection: any
}

export function InsightPanel({ isOpen, onClose, currentSection }: InsightPanelProps) {
  const [activeTab, setActiveTab] = useState('facts')

  const mockInsights = {
    facts: [
      {
        id: '1',
        title: 'Historical Context',
        content: 'Machine learning algorithms were first conceptualized in the 1950s, but only became practical with modern computing power.',
        category: 'history',
        confidence: 0.95
      },
      {
        id: '2',
        title: 'Performance Milestone',
        content: 'Deep learning models achieved human-level performance in image recognition tasks around 2015.',
        category: 'achievement',
        confidence: 0.92
      },
      {
        id: '3',
        title: 'Industry Impact',
        content: 'The global AI market is projected to reach $1.8 trillion by 2030, with machine learning being the largest segment.',
        category: 'economics',
        confidence: 0.88
      }
    ],
    contradictions: [
      {
        id: '1',
        title: 'Complexity vs Interpretability',
        content: 'While deep learning models achieve high accuracy, they often lack interpretability compared to simpler models.',
        sources: ['Current document', 'ML_Ethics.pdf'],
        severity: 'medium'
      },
      {
        id: '2',
        title: 'Data Requirements',
        content: 'The document suggests small datasets are sufficient, but recent research shows large datasets are crucial for robust performance.',
        sources: ['Current document', 'BigData_ML.pdf'],
        severity: 'high'
      }
    ],
    connections: [
      {
        id: '1',
        title: 'Neural Network Architecture',
        content: 'The CNN architecture mentioned here is also discussed in detail in your Computer Vision document.',
        linkedDoc: 'Computer_Vision.pdf',
        relevance: 0.94,
        pageRef: 'Page 15'
      },
      {
        id: '2',
        title: 'Statistical Foundations',
        content: 'The mathematical concepts align with the statistical learning theory covered in your Statistics document.',
        linkedDoc: 'Statistics_ML.pdf',
        relevance: 0.87,
        pageRef: 'Chapter 3'
      }
    ]
  }

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.8
      speechSynthesis.speak(utterance)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="fixed right-0 top-0 h-full w-full max-w-2xl bg-background border-l shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center space-x-2">
              <Lightbulb className="h-6 w-6 text-yellow-500" />
              <h2 className="text-2xl font-bold">Insight Bulb</h2>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="facts" className="flex items-center space-x-2">
                  <Sparkles className="h-4 w-4" />
                  <span>Did You Know</span>
                </TabsTrigger>
                <TabsTrigger value="contradictions" className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Contradictions</span>
                </TabsTrigger>
                <TabsTrigger value="connections" className="flex items-center space-x-2">
                  <Link2 className="h-4 w-4" />
                  <span>Connections</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="facts" className="mt-6 h-[calc(100%-60px)]">
                <ScrollArea className="h-full">
                  <div className="space-y-4">
                    {mockInsights.facts.map((fact) => (
                      <Card key={fact.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-2">
                              <BookOpen className="h-5 w-5 text-blue-500" />
                              <CardTitle className="text-lg">{fact.title}</CardTitle>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => speakText(fact.content)}
                            >
                              <Volume2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-3">{fact.content}</p>
                          <div className="flex items-center justify-between">
                            <Badge variant="secondary" className="capitalize">
                              {fact.category}
                            </Badge>
                            <div className="flex items-center space-x-1">
                              <TrendingUp className="h-3 w-3 text-green-500" />
                              <span className="text-xs text-muted-foreground">
                                {Math.round(fact.confidence * 100)}% confidence
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="contradictions" className="mt-6 h-[calc(100%-60px)]">
                <ScrollArea className="h-full">
                  <div className="space-y-4">
                    {mockInsights.contradictions.map((contradiction) => (
                      <Card key={contradiction.id} className="border-orange-200 dark:border-orange-800">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-2">
                              <AlertTriangle className="h-5 w-5 text-orange-500" />
                              <CardTitle className="text-lg">{contradiction.title}</CardTitle>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => speakText(contradiction.content)}
                            >
                              <Volume2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-3">{contradiction.content}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-1">
                              {contradiction.sources.map((source, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {source}
                                </Badge>
                              ))}
                            </div>
                            <Badge 
                              variant={contradiction.severity === 'high' ? 'destructive' : 'secondary'}
                              className="capitalize"
                            >
                              {contradiction.severity}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="connections" className="mt-6 h-[calc(100%-60px)]">
                <ScrollArea className="h-full">
                  <div className="space-y-4">
                    {mockInsights.connections.map((connection) => (
                      <Card key={connection.id} className="border-blue-200 dark:border-blue-800">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-2">
                              <Link2 className="h-5 w-5 text-blue-500" />
                              <CardTitle className="text-lg">{connection.title}</CardTitle>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => speakText(connection.content)}
                            >
                              <Volume2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-3">{connection.content}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline">{connection.linkedDoc}</Badge>
                              <span className="text-xs text-muted-foreground">
                                {connection.pageRef}
                              </span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {Math.round(connection.relevance * 100)}% match
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
