"use client"

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { DesktopNavigationMenu } from "./desktop-navigation-menu";
import { MobileNavigationMenu } from "./mobile/mobile-navigation-menu";
import { useCart } from "@/contexts/cart-context";
import { Button } from "@/components/ui/button";

export default function MainMenu() {
  const { openCart, getItemCount } = useCart()
  const itemCount = getItemCount()

  return (
    <>
      <div className="hidden md:block fixed top-0 z-50 w-full bg-background">
        <DesktopNavigationMenu />
      </div>
      <div className="md:hidden relative">
        <div className="flex items-center justify-between fixed top-0 z-50 w-full h-16 bg-background rounded px-4" style={{ transform: 'translateZ(0)', willChange: 'transform' }}>
          <div>
            <MobileNavigationMenu/>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={openCart}
              className="relative h-8 w-8"
            >
              <ShoppingCart className="h-4 w-4" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>
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
      </div>
    </>
  )
}