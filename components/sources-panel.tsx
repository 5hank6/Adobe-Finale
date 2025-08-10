"use client"

import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import {
  ChevronDown,
  Plus,
  Sparkles,
  FileText,
  FileIcon,
  Loader2,
  Square,
  SquareCheck,
  MoreVertical,
  Trash,
  Pencil,
} from "lucide-react"
import { useState, useMemo } from "react"
import { SourcesToggleButton } from "@/components/ui/SourcesToggleButton"
// These components are now imported from your existing file
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

type Source = {
  id: string
  name: string
  status: "processing" | "ready"
  url?: string;
}

export function SourcesPanel({
  sources = [],
  onOpenAdd = () => {},
  onSelectSource = () => {},
  onRemoveSource = () => {},
}: {
  sources?: Source[]
  onOpenAdd?: () => void
  onSelectSource?: (url: string, name: string) => void;
  onRemoveSource?: (id: string) => void;
}) {
  const empty = (sources?.length ?? 0) === 0
  const [collapsed, setCollapsed] = useState(false)
  const [selectedSources, setSelectedSources] = useState<Set<string>>(new Set())

  const isAllSelected = useMemo(() => {
    if (sources.length === 0) return false
    return sources.every(s => selectedSources.has(s.id))
  }, [sources, selectedSources])

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedSources(new Set())
    } else {
      const newSelected = new Set(sources.map(s => s.id))
      setSelectedSources(newSelected)
    }
  }

  const handleSourceSelect = (id: string) => {
    setSelectedSources(prev => {
      const newSelected = new Set(prev)
      if (newSelected.has(id)) {
        newSelected.delete(id)
      } else {
        newSelected.add(id)
      }
      return newSelected
    })
  }

  const handleRename = (id: string) => {
    console.log(`Renaming source with id: ${id}`)
    // Add your logic to open a rename dialog
  }

  const handleRemove = (id: string) => {
    console.log(`Removing source with id: ${id}`)
    // Add your logic to remove the source from the state
  }

  return (
    <Card
      className={`flex h-full flex-col border-white/10 bg-[rgb(27,29,31)] p-4 transition-all duration-300
        ${collapsed ? "w-[50px]" : "w-full sm:w-[300px] md:w-[350px] lg:w-[400px]"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        {!collapsed && (
          <div className="text-xl font-semibold text-white">Sources</div>
        )}
        <div className="ml-auto">
    <SourcesToggleButton collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
        </div>
      </div>

      {!collapsed && (
        <>
          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-center gap-2 mb-4">
            <Button
              onClick={onOpenAdd}
              className="flex-1 justify-center gap-2 bg-neutral-700/50 hover:bg-neutral-600/50 transition-colors rounded-full"
              variant="secondary"
            >
              <Plus className="h-4 w-4" />
              Add
            </Button>
            <Button
              className="flex-1 justify-center gap-2 bg-neutral-700/50 hover:bg-neutral-600/50 transition-colors rounded-full"
              variant="secondary"
            >
              <Sparkles className="h-4 w-4" />
              Discover
            </Button>
          </div>

          {/* Empty placeholder */}
          {empty ? (
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <div className="mt-8 sm:mt-14 flex h-14 w-14 items-center justify-center rounded-lg bg-neutral-700/50">
                <FileText className="h-6 w-6 text-neutral-400" />
              </div>
              <div className="mt-3 text-[12px] leading-5 text-neutral-400">
                Saved sources will appear here
                <br />
                Click Add above to upload PDFs or import directly from Drive.
              </div>
            </div>
          ) : (
            <div className="flex flex-col flex-1 -mx-4 px-4">
              {/* Select all sources checkbox */}
              <div className="flex items-center gap-2 text-neutral-400 mb-2 px-2 py-1">
                <button 
                  onClick={handleSelectAll} 
                  className="flex items-center gap-2"
                >
                  {isAllSelected ? (
                    <SquareCheck className="h-4 w-4 text-white" />
                  ) : (
                    <Square className="h-4 w-4" />
                  )}
                  <span className="text-xs font-medium">Select all sources</span>
                </button>
              </div>
              <ScrollArea className="flex-1">
                <ul className="pb-3">
                  {sources.map((s) => (
                    <li
                      key={s.id}
                      className={`my-1 flex items-center justify-between rounded-lg px-2 py-2 transition-colors duration-200 cursor-pointer
                        ${s.status === "processing" ? "bg-sky-500/10 cursor-default" : "hover:bg-neutral-700"}`}
                      onClick={() => s.url && onSelectSource(s.url, s.name)}
                    >
                      <div className="flex items-center gap-3">
                        <FileIcon className="h-4 w-4 text-neutral-400" />
                        <span className={`truncate text-sm ${s.status === "processing" ? "text-white" : "text-neutral-300"}`}>
                          {s.name}
                        </span>
                      </div>
                      <div className="pr-1 flex items-center gap-2">
                        {s.status === "processing" ? (
                          <Loader2 className="h-4 w-4 animate-spin text-white" />
                        ) : (
                          // Dropdown menu for more options
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <MoreVertical className="h-4 w-4 text-neutral-400" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="p-1">
                              <DropdownMenuItem className="flex items-center gap-2 p-2" onClick={() => onRemoveSource?.(s.id)}>
                                <Trash className="h-4 w-4 text-neutral-400" />
                                <span>Remove source</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2 p-2" onClick={() => handleRename(s.id)}>
                                <Pencil className="h-4 w-4 text-neutral-400" />
                                <span>Rename source</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </div>
          )}
        </>
      )}
    </Card>
  )
}
