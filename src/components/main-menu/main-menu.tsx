"use client"

import { DesktopNavigationMenu } from "./desktop-navigation-menu";
import { MobileNavigationMenu } from "./mobile/mobile-navigation-menu";

export default function MainMenu() {
  return (
    <>
      <div className="hidden md:block fixed top-0 z-50 w-full bg-background">
        <DesktopNavigationMenu />
      </div>
      <div className="md:hidden relative">
        <div className="flex items-center fixed top-0 z-50 w-full h-16 bg-background rounded px-4" style={{ transform: 'translateZ(0)' }}>
          <div className="flex-1 min-w-0">
            <MobileNavigationMenu/>
          </div>
        </div>
      </div>
    </>
  )
}