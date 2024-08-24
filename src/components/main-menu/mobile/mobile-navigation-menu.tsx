"use client"

import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button";
import { MenuIcon, X } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { MainMenuData } from "../../../data/main-menu-data";
import { MobileDrawer } from "./mobile-drawer";
import Link from "next/link";

import { useMobileMenuStore } from "@/store/mobile-menu";

export function MobileNavigationMenu() {  

  const isMenuOpen = useMobileMenuStore((state) => state.isMenuOpen)
  const openDrawer = useMobileMenuStore((state) => state.openDrawer)
  const toggleMenu = useMobileMenuStore((state) => state.toggleMenu)

  const drawerState = useMobileMenuStore.getState().isDrawerOpen;
  const menuState = useMobileMenuStore.getState().isMenuOpen;
  console.log(
    'Current menu value:', menuState,
    'Current drawer value:', drawerState
  );

  return (
    <div>
        <Drawer open={isMenuOpen} direction="left">
            <DrawerTrigger asChild>
                <Button 
                className="fixed top-4 left-4 rounded-full border-2 border-white bg-slate-600 w-14 h-14 flex items-center justify-center z-20" 
                onClick={toggleMenu}
                >
                  <MenuIcon color="white"/>
                </Button>
            </DrawerTrigger>
            <DrawerContent direction="left">
                <DrawerHeader className="flex flex-row justify-between items-center space-y-0">
                  <VisuallyHidden>
                    <DrawerTitle>Mobile Menu</DrawerTitle>
                    <DrawerDescription>Drawer Style Mobile Menu</DrawerDescription>
                  </VisuallyHidden>
                </DrawerHeader>
                <div className="fixed max-w-80 w-screen flex flex-col">
                    <h2 
                      className="rounded-md border text-xl pl-3 p-3" 
                      onClick={openDrawer}>
                        <MobileDrawer />
                    </h2>
                    {MainMenuData.items.map((item, index) => (
                        <h2 key={index} className="rounded-md border text-xl pl-3 p-3">
                            <Link href={item.href} key={index} onClick={toggleMenu}>
                                {item.title}
                            </Link>
                        </h2>
                    ))}
                </div>
            </DrawerContent>
        </Drawer>
    </div>
  )
}
