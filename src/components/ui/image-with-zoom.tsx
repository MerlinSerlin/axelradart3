'use client'

import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

export interface ImageWithZoomProps {
  src: string
  alt: string
  className?: string
  zoomScale?: number
  showZoomOnHover?: boolean
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

  return (
    <div className={cn("relative", className)}>
      <div 
        className="relative overflow-hidden rounded-md border bg-black md:cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative w-full min-h-[70vh] max-h-[85vh] lg:min-h-[75vh] lg:max-h-[90vh] aspect-auto">
          {isLoading && (
            <Skeleton className="absolute inset-0 h-full w-full" />
          )}
          <Image
            src={src}
            fill
            alt={alt}
            style={{objectFit: 'contain'}}
            className={cn(
              "transition-opacity duration-200",
              isLoading ? "opacity-0" : "opacity-100"
            )}
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
          />
        </div>
      </div>
      
      {isHovered && showZoomOnHover && (
        <div className="absolute top-0 left-[calc(100%+1.5rem)] w-80 h-full border rounded-md overflow-hidden bg-black hidden lg:block z-10 shadow-lg">
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
    </div>
  )
}