'use client'

import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

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
    <div className={cn("flex gap-4", className)}>
      <div 
        className="relative flex-1 overflow-hidden rounded-md border bg-black md:cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative h-[400px] w-full">
          <Image 
            src={src}
            fill
            alt={alt}
            style={{objectFit: 'cover'}}
            className="transition-opacity duration-200"
          />
        </div>
      </div>
      
      {isHovered && showZoomOnHover && (
        <div className="relative w-[400px] h-[400px] border rounded-md overflow-hidden bg-black hidden md:block">
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