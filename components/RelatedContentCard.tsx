import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Volume2 } from 'lucide-react'

interface RelatedContent {
  id: string
  title: string
  snippet: string
  relevance: number
  source: string
}

interface RelatedContentCardProps {
  contents: RelatedContent[]
  onSpeak?: (text: string) => void
}

export function RelatedContentCard({ contents, onSpeak }: RelatedContentCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Related Content</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64">
          <div className="space-y-3">
            {contents.map((content) => (
              <div key={content.id} className="border rounded-lg p-3">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-sm">{content.title}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onSpeak?.(content.snippet)}
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
  )
}