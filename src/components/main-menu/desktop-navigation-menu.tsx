"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { usePathname } from "next/navigation"

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
  const pathname = usePathname()

  // Extract collection name from pathname
  const getCollectionDisplayName = () => {
    const pathSegments = pathname.split('/')
    if (pathSegments.length >= 2) {
      const collectionSlug = pathSegments[1]
      const collection = CollectionsData.find(c => c.href === `/${collectionSlug}`)
      return collection?.title
    }
    return null
  }

  const currentCollectionName = getCollectionDisplayName()

  return (
    <div className="w-full py-4">
      <div className="max-w-6xl mx-auto px-8 flex items-center justify-between relative">
        <div className="flex items-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="pl-0">Collections</NavigationMenuTrigger>
                <NavigationMenuContent className="md:left-0 md:right-auto">
                  <ul className="grid w-[74vw] gap-4 p-6 grid-cols-2">
                    {CollectionsData.map((item) => (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        href={item.href}
                        image={item.image}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          {currentCollectionName && (
            <span className="text-sm text-muted-foreground ml-1">
              {currentCollectionName}
            </span>
          )}
        </div>
        <Link href="/" className="absolute left-[calc(50%-3rem)] -translate-x-1/8 flex items-center">
          <Image
            src="/svgs/MA-logo.svg"
            alt="Merle Axelrad Logo"
            width={120}
            height={60}
            className="object-contain"
          />
        </Link>
        <div className="flex items-center gap-4">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center gap-4">
              <NavigationMenuItem>
                <TheArtistOverlay />
              </NavigationMenuItem>
              <NavigationMenuItem>
                <DialogDemo title="Prices"/>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <ContactOverlay />
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
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
        </div>
      </div>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { image?: string }
>(({ className, title, children, image, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none rounded-md p-6 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex gap-5 items-center">
            {image && (
              <div className="w-16 h-12 lg:w-20 lg:h-16 xl:w-24 xl:h-20 flex-shrink-0">
                <Image
                  src={`/art-images${image}`}
                  alt={title || ''}
                  width={112}
                  height={80}
                  className="object-cover rounded w-full h-full"
                />
              </div>
            )}
            <div className="flex-1">
              <div className="text-sm font-medium leading-none">{title}</div>
            </div>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
