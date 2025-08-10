"use client"

import * as React from "react"
import { useEffect } from "react" // Import useEffect
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Settings, UploadCloud } from "lucide-react"

// Update props to include pdfUrl
export function CenterIntake({
  title = "Untitled notebook",
  hasSources = false,
  pdfUrl, // New prop for PDF URL
  persona = "",
  job = "",
  onPersonaChange = () => {},
  onJobChange = () => {},
  onOpenAdd = () => {},
}: {
  title?: string
  hasSources?: boolean
  pdfUrl?: string
  persona?: string
  job?: string
  onPersonaChange?: (v: string) => void
  onJobChange?: (v: string) => void
  onOpenAdd?: () => void
}) {

  // useEffect hook to handle the Adobe DC View SDK logic
  useEffect(() => {
    // Only run if we have a PDF URL
    if (pdfUrl) {
      // Check if the Adobe DC View SDK script is loaded
      if (typeof (window as any).AdobeDC !== 'undefined') {
        // Get the Adobe DC View SDK instance
        const adobeDCView = new (window as any).AdobeDC.View({
          clientId: "c00e026f37cc451aae1ee54adde2fca8" // Replace with your client ID
        });
        // Embed the PDF
        adobeDCView.previewFile(
          {
            content: {
              location: {
                url: pdfUrl
              }
            },
            metaData: {
              fileName: title
            }
          },
          {
            embedMode: "SIZED_CONTAINER",
            defaultViewMode: "FIT_WIDTH"
          }
        );
      } else {
        console.error("Adobe DC View SDK is not loaded.");
      }
    }
  }, [pdfUrl, title]);

  return (
    <Card className="flex h-full flex-col border-white/10 bg-[rgb(27,29,31)]">
      {/* Thin header line to match app chrome */}
      <div className="border-b border-white/10 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-neutral-200">{title}</div>
        </div>
      </div>

      {/* Center empty-state CTA when no sources */}
      {!hasSources && (
        <div className="relative flex flex-1 items-center justify-center px-6">
          <div className="text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/8">
              <UploadCloud className="h-5 w-5 text-neutral-300" />
            </div>
            <div className="mt-4 text-lg font-medium text-neutral-200">Add a source to get started</div>
            <div className="mt-2">
              <Button
                onClick={onOpenAdd}
                variant="secondary"
                className="rounded-full border-white/15 bg-white/5 px-4 py-2 text-[13px] text-neutral-200 hover:bg-white/10"
              >
                Upload a source
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* PDF Viewer container when sources exist */}
      {hasSources && (
        <div id="adobe-dc-view" className="flex-1 overflow-y-auto" />
      )}

      {/* Persona + JTBD inputs */}
      <div className="grid w-full gap-3 px-4 py-4 md:grid-cols-2">
        <div className="grid gap-1.5">
          <Label htmlFor="persona" className="text-xs text-neutral-300">
            Persona
          </Label>
          <Input
            id="persona"
            value={persona}
            onChange={(e) => onPersonaChange(e.target.value)}
            placeholder="e.g., Undergraduate Chemistry Student"
            className="border-white/10 bg-[rgb(23,24,26)] text-sm text-neutral-200 placeholder:text-neutral-500"
          />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="job" className="text-xs text-neutral-300">
            Job to be done
          </Label>
          <Input
            id="job"
            value={job}
            onChange={(e) => onJobChange(e.target.value)}
            placeholder="e.g., Identify key concepts for reaction kinetics exam"
            className="border-white/10 bg-[rgb(23,24,26)] text-sm text-neutral-200 placeholder:text-neutral-500"
          />
        </div>
      </div>

      {/* Load the Adobe DC View SDK script */}
      <script src="https://documentcloud.adobe.com/view-sdk/main.js"></script>
    </Card>
  )
}
