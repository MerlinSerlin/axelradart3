'use client'

import { useState } from "react"
import { cn } from "@/lib/utils"
import ImageWithZoom from "@/components/ui/image-with-zoom"
import RoomView from "@/components/ui/room-view"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type TabType = 'artwork' | 'room' | 'details'

export interface ArtworkTabsProps {
  title: string
  description: string
  size: string
  src: string
  className?: string
}

export default function ArtworkTabs({ title, description, size, src, className }: ArtworkTabsProps) {
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
              if (tab.id === 'room') {
                setShowFullScreenRoom(true)
              } else {
                setActiveTab(tab.id)
                setShowFullScreenRoom(false)
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
          <div className="rounded-md border">
            <ImageWithZoom 
              src={src}
              alt={title}
            />
          </div>
        )}

        {showFullScreenRoom && (
          <RoomView 
            artworkSrc={src}
            artworkAlt={title}
            size={size}
            onClose={() => {
              setShowFullScreenRoom(false)
              setActiveTab('artwork')
            }}
          />
        )}

        {activeTab === 'details' && (
          <Card>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>Dimensions: {size}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">{description}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Specifications</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>Size: {size}</li>
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