'use client'

import * as React from "react"
import { useState } from "react"
import { Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import Image from 'next/image'

import ChevronToggle from "./chevron-toggle"

import { useMobileMenuStore } from "@/store/mobile-menu"
import { Tile } from "@/components/ui/tile"
import { getThemeImages } from "@/data/art-data"

const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
]

export function MobileDrawer() { 
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const themeImages = getThemeImages();
  
  // setIsDrawerOpen is passed directly to onOpenChange, 
  // meaning whenever the drawer opens or closes, 
  // setIsDrawerOpen is called with the new state (either true or false).
    
  return (
    <Drawer onOpenChange={setIsDrawerOpen}>
      <DrawerTrigger className="w-full">
        <div className="w-full flex justify-between">
          <span>Collections</span>
          <div>
            <ChevronToggle isDrawerOpen={isDrawerOpen} />
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent className="w-full h-full ">
        <div className="w-full h-full">
          <DrawerHeader>
            <DrawerDescription>Tap a tile to view a collection.</DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-wrap justify-center w-full h-[calc(100vh-80px)]">
              {themeImages.map((image, index) => (
                <div className="relative w-[calc(50vw-.75rem)] h-auto m-1" key={index}>
                <Image
                  src={`/art-images${image.pathName}`}
                  fill
                  style={{objectFit: 'cover'}}
                  alt={image.description}
                />
                </div>
              ))}
          </div>
          {/* <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
              >
                <Minus className="h-4 w-4" />
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">
                  250
                </div>
                <div className="text-[0.70rem] uppercase text-muted-foreground">
                  Calories/day
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                // onClick={() => onClick(10)}
                // disabled={goal >= 400}
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
            <div className="mt-3 h-[120px]">
              
            </div>
          </div> */}
          {/* <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter> */}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
