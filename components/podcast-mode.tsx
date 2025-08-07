'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { X, Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Headphones, Clock, Mic } from 'lucide-react'

interface PodcastModeProps {
  isOpen: boolean
  onClose: () => void
  currentSection: any
  relatedContent: any[]
}

export function PodcastMode({ isOpen, onClose, currentSection, relatedContent }: PodcastModeProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const [isMuted, setIsMuted] = useState(false)
  const [duration, setDuration] = useState(0)

  const podcastSegments = [
    {
      id: '1',
      title: 'Current Section Overview',
      content: currentSection?.title || 'Introduction',
      duration: 45,
      type: 'section'
    },
    {
      id: '2',
      title: 'Key Insights',
      content: 'Exploring the main concepts and their implications',
      duration: 60,
      type: 'insights'
    },
    {
      id: '3',
      title: 'Related Content',
      content: 'Connections to other documents and cross-references',
      duration: 90,
      type: 'related'
    },
    {
      id: '4',
      title: 'Summary & Takeaways',
      content: 'Wrapping up with actionable insights',
      duration: 30,
      type: 'summary'
    }
  ]

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 1
          if (newProgress >= podcastSegments[currentTrack].duration) {
            if (currentTrack < podcastSegments.length - 1) {
              setCurrentTrack(prev => prev + 1)
              return 0
            } else {
              setIsPlaying(false)
              return podcastSegments[currentTrack].duration
            }
          }
          return newProgress
        })
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [isPlaying, currentTrack])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
    
    if (!isPlaying) {
      // Start speech synthesis
      const textToSpeak = generatePodcastScript()
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(textToSpeak)
        utterance.rate = 0.9
        utterance.pitch = 1
        utterance.volume = isMuted ? 0 : volume
        
        utterance.onend = () => {
          setIsPlaying(false)
          if (currentTrack < podcastSegments.length - 1) {
            setCurrentTrack(prev => prev + 1)
            setProgress(0)
          }
        }
        
        speechSynthesis.speak(utterance)
      }
    } else {
      speechSynthesis.cancel()
    }
  }

  const generatePodcastScript = () => {
    const segment = podcastSegments[currentTrack]
    switch (segment.type) {
      case 'section':
        return `Welcome to your personalized document podcast. Today we're exploring ${currentSection?.title || 'this section'}. ${currentSection?.content || 'Let me walk you through the key concepts.'}`
      case 'insights':
        return `Now let's dive into the key insights. ${currentSection?.insights?.join('. ') || 'Here are the main takeaways from this section.'}`
      case 'related':
        return `This connects to several other documents in your library. ${relatedContent.map(c => `In ${c.source}, we see that ${c.snippet}`).join('. ')}`
      case 'summary':
        return `To summarize, we've covered the main concepts, explored key insights, and identified connections to your other documents. These insights should help you better understand the broader context.`
      default:
        return segment.content
    }
  }

  const nextTrack = () => {
    if (currentTrack < podcastSegments.length - 1) {
      setCurrentTrack(prev => prev + 1)
      setProgress(0)
      speechSynthesis.cancel()
    }
  }

  const previousTrack = () => {
    if (currentTrack > 0) {
      setCurrentTrack(prev => prev - 1)
      setProgress(0)
      speechSynthesis.cancel()
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  if (!isOpen) return null

  const currentSegment = podcastSegments[currentTrack]
  const progressPercentage = (progress / currentSegment.duration) * 100

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Headphones className="h-6 w-6 text-blue-500" />
              <CardTitle className="text-2xl">Podcast Mode</CardTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Current Track Info */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Mic className="h-5 w-5 text-muted-foreground" />
              <Badge variant="secondary" className="capitalize">
                {currentSegment.type}
              </Badge>
            </div>
            <h3 className="text-xl font-semibold">{currentSegment.title}</h3>
            <p className="text-muted-foreground">{currentSegment.content}</p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(currentSegment.duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={previousTrack}
              disabled={currentTrack === 0}
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            
            <Button
              size="icon"
              className="h-12 w-12"
              onClick={togglePlayPause}
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" />
              )}
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              onClick={nextTrack}
              disabled={currentTrack === podcastSegments.length - 1}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center justify-center space-x-2">
            <Button variant="ghost" size="icon" onClick={toggleMute}>
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
            <div className="w-24">
              <Progress value={isMuted ? 0 : volume * 100} className="h-1" />
            </div>
          </div>

          {/* Track List */}
          <div className="space-y-2">
            <h4 className="font-semibold text-center mb-3">Podcast Segments</h4>
            <div className="grid grid-cols-2 gap-2">
              {podcastSegments.map((segment, index) => (
                <Button
                  key={segment.id}
                  variant={index === currentTrack ? "default" : "outline"}
                  size="sm"
                  className="justify-start"
                  onClick={() => {
                    setCurrentTrack(index)
                    setProgress(0)
                    speechSynthesis.cancel()
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <Clock className="h-3 w-3" />
                    <span className="text-xs">{formatTime(segment.duration)}</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="text-center text-sm text-muted-foreground">
            <p>🎧 Sit back and let AI narrate your document insights</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
