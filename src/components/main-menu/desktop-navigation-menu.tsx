"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"

import { cn } from "@/lib/utils"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

import CollectionsData from "@/data/collections-data"
import { DialogDemo } from "../ui/dialog-demo"
import { TheArtistOverlay } from "./overlays/the-artist-overlay"
import { ContactOverlay }from "./overlays/contact-overlay"

// const collectionsData: { title: string; href: string; description: string }[] = [
//   {
//     title: "Rocks and Water",
//     href: "/collections/rocks_and_water",
//     description:
//       "A modal dialog that interrupts the user with important content and expects a response.",
//   },
//   {
//     title: "Rocks and Water",
//     href: "/collections/rocks_and_water",
//     description:
//       "A modal dialog that interrupts the user with important content and expects a response.",
//   },
//   {
//     title: "Rocks and Water",
//     href: "/collections/rocks_and_water",
//     description:
//       "A modal dialog that interrupts the user with important content and expects a response.",
//   },
//   {
//     title: "Rocks and Water",
//     href: "/collections/rocks_and_water",
//     description:
//       "A modal dialog that interrupts the user with important content and expects a response.",
//   },
//   {
//     title: "Rocks and Water",
//     href: "/collections/rocks_and_water",
//     description:
//       "A modal dialog that interrupts the user with important content and expects a response.",
//   },
//   {
//     title: "Rocks and Water",
//     href: "/collections/rocks_and_water",
//     description:
//       "A modal dialog that interrupts the user with important content and expects a response.",
//   },
// ]

export function DesktopNavigationMenu() {
  const { openCart, getItemCount } = useCart()
  const itemCount = getItemCount()

  return (
    <div className="flex items-center justify-between w-full px-6 py-4">
      <NavigationMenu>
        <NavigationMenuList>
        <NavigationMenuItem>
          <TheArtistOverlay />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Collections</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {CollectionsData.map((item) => (
                <ListItem
                  key={item.title}
                  title={item.title}
                  href={item.href}
                >
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <DialogDemo title="Prices"/>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <ContactOverlay />
        </NavigationMenuItem>
        {/* <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Prices
            </NavigationMenuLink>
          </Link>
          <Link href="/prices" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Contact
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem> */}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={openCart}
          className="relative"
        >
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Button>
        <Link href="/" className="flex items-center">
          <Image
            src="/svgs/MA-logo.svg"
            alt="Merle Axelrad Logo"
            width={120}
            height={60}
            className="object-contain"
          />
        </Link>
      </div>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
