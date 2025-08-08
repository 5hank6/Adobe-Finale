import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Lightbulb, Volume2 } from 'lucide-react'

interface CurrentSectionCardProps {
  section: {
    title: string
    content: string
    insights: string[]
  }
  onSpeak?: (text: string) => void
}

export function CurrentSectionCard({ section, onSpeak }: CurrentSectionCardProps) {
  if (!section) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          Current Section
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSpeak?.(section.content)}
          >
            <Volume2 className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold mb-2">{section.title}</h3>
        <p className="text-sm text-muted-foreground mb-4">
          {section.content.substring(0, 150)}...
        </p>
        <div className="space-y-2">
          {section.insights.map((insight, index) => (
            <div key={index} className="flex items-start space-x-2">
              <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm">{insight}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}