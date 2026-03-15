'use client'

import { useState, lazy, Suspense } from "react"
import { cn } from "@/lib/utils"
import { Maximize2, Eye } from "lucide-react"
import ImageWithZoom from "@/components/ui/image-with-zoom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import type { ECommData } from "@/data/art-data"

const RoomView = lazy(() => import("@/components/ui/room-view"))

export interface ArtworkTabsProps {
  title: string
  description: string
  size: string
  src: string
  pathName: string
  eCommData?: ECommData
  className?: string
}

export default function ArtworkTabs({ title, description, size, src, pathName, eCommData, className }: ArtworkTabsProps) {
  const [zoomOpen, setZoomOpen] = useState(false)
  const [showRoomView, setShowRoomView] = useState(false)
  const { openCartManagementModal } = useCart()

  const isRoomViewDisabled = title === "Butterfly Effect (Interior View)" || title === "Butterfly Effect (Exterior View)"

  const handleBuyPrintsClick = () => {
    if (eCommData) {
      openCartManagementModal(title, pathName, eCommData)
    }
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="lg:min-h-[500px]">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 lg:min-h-[400px]">
            <div className="relative">
              <ImageWithZoom
                src={src}
                alt={title}
                zoomOpen={zoomOpen}
                onZoomClose={() => setZoomOpen(false)}
              />
              <div className="absolute bottom-3 right-3 flex gap-2 z-10">
                <button
                  onClick={() => setZoomOpen(true)}
                  className="h-9 w-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
                  aria-label="View full image"
                >
                  <Maximize2 size={18} />
                </button>
                {!isRoomViewDisabled && (
                  <button
                    onClick={() => setShowRoomView(true)}
                    className="h-9 w-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
                    aria-label="View in room"
                  >
                    <Eye size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>
          {/* Mobile: inline details below image */}
          <div className="lg:hidden space-y-3">
            <div>
              <p className="text-muted-foreground leading-relaxed">{description}</p>
            </div>
            <div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>Dimensions: {size}</li>
                <li>Medium: Mixed media collage</li>
              </ul>
            </div>
          </div>
          {/* Desktop: sidebar card */}
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
                  <Button
                    className="w-full"
                    onClick={handleBuyPrintsClick}
                    disabled={!eCommData}
                  >
                    Buy Prints
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {showRoomView && (
          <Suspense fallback={null}>
            <RoomView
              artworkSrc={src}
              artworkAlt={title}
              size={size}
              onClose={() => setShowRoomView(false)}
            />
          </Suspense>
        )}
      </div>
    </div>
  )
}
