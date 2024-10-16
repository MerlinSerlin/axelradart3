'use client'

import * as React from "react"

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

import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

import Image from 'next/image'
import Link from "next/link"

import ChevronToggle from "./chevron-toggle"

import { useMobileMenuStore } from "@/store/mobile-menu"
import { getThemeImages } from "@/data/art-data"

export function MobileDrawer() { 
  const { isDrawerOpen, setDrawer, closeMenu } = useMobileMenuStore();

  const themeImages = getThemeImages();
  
  // setDrawer is passed directly to onOpenChange, 
  // meaning whenever the drawer opens or closes, 
  // setDrawer is called with the new state (either true or false).
    
  return (
    <Drawer onOpenChange={setDrawer}>
      <DrawerTrigger className="w-full">
        <div className="w-full flex justify-between">
          <VisuallyHidden>
              <DrawerTitle>Collections</DrawerTitle>
              <DrawerDescription>Drawer Style Mobile Menu</DrawerDescription>
          </VisuallyHidden>
          <span>Collections</span>
          <div>
            <ChevronToggle isDrawerOpen={isDrawerOpen} />
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent className="w-full h-[calc(100vh-109px)]">
        <div className="w-full h-full overflow-y-auto">
          <DrawerHeader>
            <DrawerDescription>Tap a tile to view a collection.</DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-wrap justify-center w-full h-full">
              {themeImages.map((image, index) => (
                <div className="relative w-[calc(50%-.75rem)] h-auto m-1" key={index}>
                  <Link href={`/${image.theme}`}>
                    <DrawerClose asChild onClick={closeMenu}>
                      <Image
                        src={`/art-images${image.pathName}`}
                        fill
                        style={{objectFit: 'cover'}}
                        alt={image.description}
                        sizes="50vw"
                      />
                    </DrawerClose>
                    {/* </a> */}
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
