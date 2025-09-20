'use client'

import { useState, useEffect, lazy, Suspense } from "react"
import { cn } from "@/lib/utils"
import { Eye } from "lucide-react"
import ImageWithZoom from "@/components/ui/image-with-zoom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

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
  
  // Pieces that are too big for room view
  const isRoomViewDisabled = title === "Butterfly Effect (Interior View)" || title === "Butterfly Effect (Exterior View)"

  const tabs = [
    { id: 'artwork' as TabType, label: 'Artwork' },
    { id: 'details' as TabType, label: 'Details', hideOnDesktop: true },
    {
      id: 'room' as TabType,
      label: 'View In Room',
      icon: <Eye size={16} />,
      disabled: isRoomViewDisabled
    }
  ]


  return (
    <div className={cn("w-full", className)}>
      <div className="flex border-b border-gray-200 mb-6">
        {tabs.map((tab) => {
          if (tab.hideOnDesktop) {
            return (
              <button
                key={tab.id}
                disabled={tab.disabled}
                onClick={() => {
                  if (tab.disabled) return;

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
                  "px-6 py-3 text-sm font-medium border-b-2 transition-colors lg:hidden",
                  tab.disabled
                    ? "border-transparent text-gray-400 cursor-not-allowed opacity-50"
                    : activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                )}
              >
                <div className="flex items-center gap-2">
                  {tab.label}
                  {tab.icon}
                </div>
              </button>
            )
          }

          return (
            <button
              key={tab.id}
              disabled={tab.disabled}
              onClick={() => {
                if (tab.disabled) return;

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
                tab.disabled
                  ? "border-transparent text-gray-400 cursor-not-allowed opacity-50"
                  : activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              )}
            >
              <div className="flex items-center gap-2">
                {tab.label}
                {tab.icon}
              </div>
            </button>
          )
        })}
      </div>

      <div className="min-h-[500px]">
        {activeTab === 'artwork' && (
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 rounded-md border bg-black min-h-[400px]">
              <ImageWithZoom
                src={src}
                alt={title}
              />
            </div>
            <div className="hidden lg:block lg:w-80 flex-shrink-0">
              <Card className="bg-black border-gray-700 h-full">
                <CardContent className="space-y-4 p-6">
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
                  <div className="pt-4">
                    <Button className="w-full">
                      Buy Prints
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {showFullScreenRoom && (
          <Suspense fallback={null}>
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