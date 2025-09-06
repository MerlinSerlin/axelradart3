"use client"

import Image from "next/image";
import Link from "next/link";
import { DesktopNavigationMenu } from "./desktop-navigation-menu";
import { MobileNavigationMenu } from "./mobile/mobile-navigation-menu";

export default function MainMenu() {
  return (
    <>
      <div className="hidden md:block">
        <DesktopNavigationMenu />
      </div>
      <div className="md:hidden relative">
        <div className="flex items-center justify-between fixed top-0 z-50 w-full h-16 bg-background rounded px-4" style={{ transform: 'translateZ(0)', willChange: 'transform' }}>
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