'use client'

import Image from "next/image"
import { useState, useRef, useCallback } from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export interface ImageWithZoomProps {
  src: string
  alt: string
  className?: string
  zoomScale?: number
  showZoomOnHover?: boolean
}

function getDistance(t1: React.Touch, t2: React.Touch) {
  const dx = t1.clientX - t2.clientX
  const dy = t1.clientY - t2.clientY
  return Math.sqrt(dx * dx + dy * dy)
}

export default function ImageWithZoom({
  src,
  alt,
  className,
  zoomScale = 2.5,
  showZoomOnHover = true
}: ImageWithZoomProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoading, setIsLoading] = useState(true)

  // Mobile zoom state
  const [isZoomOpen, setIsZoomOpen] = useState(false)
  const [scale, setScale] = useState(1)
  const [translate, setTranslate] = useState({ x: 0, y: 0 })
  const lastTapRef = useRef(0)
  const pinchStartDistRef = useRef(0)
  const pinchStartScaleRef = useRef(1)
  const panStartRef = useRef({ x: 0, y: 0 })
  const translateStartRef = useRef({ x: 0, y: 0 })
  const isPanningRef = useRef(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!showZoomOnHover) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    setMousePosition({ x, y })
  }

  const handleMouseEnter = () => {
    if (showZoomOnHover) setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  // Double-tap detection for mobile
  const handleTap = useCallback(() => {
    const now = Date.now()
    if (now - lastTapRef.current < 300) {
      setIsZoomOpen(true)
      setScale(1)
      setTranslate({ x: 0, y: 0 })
    }
    lastTapRef.current = now
  }, [])

  const handleOverlayTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      pinchStartDistRef.current = getDistance(e.touches[0], e.touches[1])
      pinchStartScaleRef.current = scale
      isPanningRef.current = false
    } else if (e.touches.length === 1) {
      panStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      translateStartRef.current = { ...translate }
      isPanningRef.current = true
    }
  }, [scale, translate])

  const handleOverlayTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault()
    if (e.touches.length === 2) {
      const dist = getDistance(e.touches[0], e.touches[1])
      const newScale = Math.min(Math.max(pinchStartScaleRef.current * (dist / pinchStartDistRef.current), 1), 5)
      setScale(newScale)
      isPanningRef.current = false
    } else if (e.touches.length === 1 && isPanningRef.current && scale > 1) {
      const dx = e.touches[0].clientX - panStartRef.current.x
      const dy = e.touches[0].clientY - panStartRef.current.y
      setTranslate({
        x: translateStartRef.current.x + dx,
        y: translateStartRef.current.y + dy,
      })
    }
  }, [scale])

  const handleOverlayTouchEnd = useCallback((e: React.TouchEvent) => {
    // Reset to 1 if pinch-released below threshold
    if (e.touches.length === 0 && scale <= 1.05) {
      setScale(1)
      setTranslate({ x: 0, y: 0 })
    }
  }, [scale])

  const closeZoom = useCallback(() => {
    setIsZoomOpen(false)
    setScale(1)
    setTranslate({ x: 0, y: 0 })
  }, [])

  return (
    <div className={cn("relative", className)}>
      <div
        className="relative w-full h-[40vh] sm:h-[50vh] lg:min-h-[75vh] lg:max-h-[90vh] overflow-hidden rounded-md border bg-black md:cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleTap}
      >
        {isLoading && (
          <Skeleton className="absolute inset-0 h-full w-full" />
        )}
        <Image
          src={src}
          fill
          alt={alt}
          className={cn(
            "transition-opacity duration-200 lg:object-contain object-cover",
            isLoading ? "opacity-0" : "opacity-100"
          )}
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
        />
      </div>

      {isHovered && showZoomOnHover && (
        <div className="absolute top-0 left-[calc(100%+1.5rem)] w-80 min-h-full border rounded-md overflow-hidden bg-black hidden lg:block z-20 shadow-lg">
          <Image
            src={src}
            fill
            alt={`${alt} - magnified`}
            style={{
              objectFit: 'cover',
              transform: `scale(${zoomScale})`,
              transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
            }}
            className="transition-transform duration-75"
          />
        </div>
      )}

      {isZoomOpen && (
        <div
          className="fixed inset-0 z-50 bg-black lg:hidden"
          onTouchStart={handleOverlayTouchStart}
          onTouchMove={handleOverlayTouchMove}
          onTouchEnd={handleOverlayTouchEnd}
          style={{ touchAction: 'none' }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={closeZoom}
            className="absolute top-4 right-4 z-50 h-10 w-10 bg-black/50 hover:bg-black/70 text-white"
          >
            <X className="h-5 w-5" />
          </Button>
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              transform: `scale(${scale}) translate(${translate.x / scale}px, ${translate.y / scale}px)`,
            }}
          >
            <Image
              src={src}
              fill
              alt={`${alt} - fullscreen`}
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </div>
  )
}
