'use client'

import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

export interface RoomViewProps {
  artworkSrc: string
  artworkAlt: string
  size: string
  onClose: () => void
}

function parseDimensions(size: string): { width: number; height: number } | null {
  const match = size.match(/(\d+(?:\.\d+)?)"?\s*x\s*(\d+(?:\.\d+)?)"?/)
  if (!match) return null
  
  // Fine art dimensions are height x width
  return {
    height: parseFloat(match[1]),
    width: parseFloat(match[2])
  }
}

function calculateArtworkScale(dimensions: { width: number; height: number }) {
  // Bench is 8 feet (96") long, 18" high - this sets our scale
  const benchRealWidth = 96 // inches
  const benchPixelWidth = 320 // pixels - fits mobile (320px+) while reasonable on desktop
  const pixelsPerInch = benchPixelWidth / benchRealWidth
  
  // Calculate inner dimensions first (what the image area should be)
  const innerWidth = dimensions.width * pixelsPerInch
  const innerHeight = dimensions.height * pixelsPerInch
  
  // Add padding back to get frame dimensions (p-3 = 12px on all sides)
  const paddingTotal = 24 // 12px * 2 sides
  
  return {
    width: innerWidth + paddingTotal,
    height: innerHeight + paddingTotal
  }
}

export default function RoomView({ artworkSrc, artworkAlt, size, onClose }: RoomViewProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  
  const dimensions = parseDimensions(size)
  const artworkScale = dimensions ? calculateArtworkScale(dimensions) : { width: 80, height: 60 }
  

  return (
    <div className="fixed inset-0 z-50 bg-gray-100 overflow-hidden">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
      >
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Room content */}
      <div className="relative w-full h-full">
        {/* Wall - lighter neutral color */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-100 via-slate-50 to-slate-100" />
        
        {/* Floor - elegant wooden gallery floors */}
        <div className="absolute bottom-0 left-0 right-0 bg-slate-200" 
             style={{
               height: '37.5%',
               backgroundImage: `
                 repeating-linear-gradient(
                   90deg,
                   rgba(0, 0, 0, 0.08) 0px,
                   rgba(0, 0, 0, 0.08) 1px,
                   transparent 1px,
                   transparent 40px
                 ),
                 repeating-linear-gradient(
                   0deg,
                   rgba(0, 0, 0, 0.04) 0px,
                   rgba(0, 0, 0, 0.04) 1px,
                   transparent 1px,
                   transparent 6px
                 )
               `
             }} />
        
        {/* Clear wall/floor boundary line */}
        <div className="absolute left-0 right-0 h-0.5 bg-gray-600 opacity-60" style={{bottom: '37.5%'}}></div>
        
        {/* Bench */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-80 h-16" 
             style={{bottom: 'calc(37.5% - 50px)'}}>
          <Image
            src="/other-images/bench.png"
            alt="Wooden bench for scale (8 feet long)"
            width={320}
            height={64}
            style={{ objectFit: 'fill' }}
          />
        </div>
        
        {/* Length dimension arrow - positioned below bench */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-80" 
             style={{bottom: 'calc(37.5% - 90px)'}}>
          <div className="flex items-center w-full">
            <div className="flex flex-col items-center">
              <div className="w-px h-6 bg-gray-600"></div>
            </div>
            <div className="flex-1 border-t border-gray-600 relative">
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-700">8 ft</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-px h-6 bg-gray-600"></div>
            </div>
          </div>
        </div>
        
        {/* Floor/wall line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-400 opacity-30"></div>
        
        {/* Artwork - positioned higher on the wall */}
        <div 
          className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl border border-gray-200"
          style={{ 
            width: `${artworkScale.width}px`, 
            height: `${artworkScale.height}px`
          }}
        >
          <div className="relative w-full h-full p-3">
            <div className="relative w-full h-full">
              <Image
                src={artworkSrc}
                alt={artworkAlt}
                fill
                style={{ objectFit: 'contain' }}
                className={cn(
                  "transition-opacity duration-300",
                  imageLoaded ? "opacity-100" : "opacity-0"
                )}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}