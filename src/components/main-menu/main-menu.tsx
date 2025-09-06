"use client"

import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
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
import { Button } from "@/components/ui/button";
import { MenuIcon, X } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { MainMenuData } from "../../data/main-menu-data";
import { DesktopNavigationMenu } from "./desktop-navigation-menu";
import { MobileNavigationMenu } from "./mobile/mobile-navigation-menu";

export default function MainMenu() {
  const pathname = usePathname();
  
  // Fix iOS Safari fixed positioning bug - force layout recalculation after navigation
  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo(window.scrollX, window.scrollY);
    }, 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <div className="hidden md:block">
        <DesktopNavigationMenu />
      </div>
      <div className="md:hidden relative">
        <div className="flex items-center justify-between fixed top-0 z-50 w-full h-16 bg-background rounded px-4">
          <div>
            <MobileNavigationMenu/>
          </div>
          <Link href="/" className="flex items-center">
            <Image
              src="/svgs/MA-logo.svg"
              alt="Merle Axelrad Logo"
              width={80}
              height={40}
              className="object-contain"
            />
          </Link>
        </div>
      </div>
    </>
  )
}