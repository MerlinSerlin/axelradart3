'use client'

import { useState, useEffect, lazy, Suspense } from "react"
import { cn } from "@/lib/utils"
import ImageWithZoom from "@/components/ui/image-with-zoom"
import { Card, CardContent } from "@/components/ui/card"

const RoomView = lazy(() => import("@/components/ui/room-view"))

type TabType = 'artwork' | 'room' | 'details'

export interface ArtworkTabsProps {
  title: string
  description: string
  size: string
  src: string
  className?: string
  activeView?: string
  onViewChange?: (view: string) => void
}

export default function ArtworkTabs({ title, description, size, src, className, activeView = 'artwork', onViewChange }: ArtworkTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('artwork')
  const [showFullScreenRoom, setShowFullScreenRoom] = useState(false)
  

  const tabs = [
    { id: 'artwork' as TabType, label: 'Artwork' },
    { id: 'room' as TabType, label: 'Room View' },
    { id: 'details' as TabType, label: 'Details' }
  ]


  return (
    <div className={cn("w-full", className)}>
      <div className="flex border-b border-gray-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              if (onViewChange) {
                onViewChange(tab.id);
              } else {
                // Original behavior when no onViewChange provided
                if (tab.id === 'room') {
                  setShowFullScreenRoom(true)
                } else {
                  setActiveTab(tab.id)
                  setShowFullScreenRoom(false)
                }
              }
            }}
            className={cn(
              "px-6 py-3 text-sm font-medium border-b-2 transition-colors",
              activeTab === tab.id
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="min-h-[500px]">
        {activeTab === 'artwork' && (
          <div className="rounded-md border bg-black min-h-[400px]">
            <ImageWithZoom 
              src={src}
              alt={title}
            />
          </div>
        )}

        {showFullScreenRoom && (
          <Suspense fallback={<div>Loading room view...</div>}>
            <RoomView 
              artworkSrc={src}
              artworkAlt={title}
              size={size}
              onClose={() => {
                setShowFullScreenRoom(false)
                setActiveTab('artwork')
              }}
            />
          </Suspense>
        )}

        {activeTab === 'details' && (
          <Card className="bg-black border-gray-700">
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2 text-white">Description</h3>
                <p className="text-muted-foreground leading-relaxed">{description}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-white">Specifications</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Dimensions: {size}</li>
                  <li>Medium: Mixed media collage</li>
                  <li>Frame: Available separately</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}