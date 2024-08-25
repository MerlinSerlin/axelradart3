"use client"

import {
    Drawer,
    DrawerClose,   
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { MainMenuData } from "../../../data/main-menu-data";
import { MobileDrawer } from "./mobile-drawer";
import Link from "next/link";

import { useState } from "react";

export function MobileNavigationMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    // setIsMenuOpen is passed directly to onOpenChange, 
    // meaning whenever the Menu opens or closes, 
    // setIsMenuOpen is called with the new state (either true or false).
  
    return (
      <div>
        <Drawer open={isMenuOpen} onOpenChange={setIsMenuOpen} direction="left">
          <DrawerTrigger asChild>
            <Button
              className="fixed top-4 left-4 rounded-full border-2 border-white bg-slate-600 w-14 h-14 flex items-center justify-center z-20"
            //   onClick={toggleMenu}
            >
              <MenuIcon color="white" />
            </Button>
          </DrawerTrigger>
          <DrawerHeader className="flex flex-row justify-between items-center space-y-0">
            <VisuallyHidden>
                <DrawerTitle>Mobile Menu</DrawerTitle>
                <DrawerDescription>Drawer Style Mobile Menu</DrawerDescription>
            </VisuallyHidden>
        </DrawerHeader>
          <DrawerContent direction="left">
            <DrawerHeader className="flex flex-row justify-between items-center space-y-0">
              <VisuallyHidden>
                <DrawerTitle>Mobile Menu</DrawerTitle>
              </VisuallyHidden>
            </DrawerHeader>

            <div className="fixed max-w-80 w-screen flex flex-col">
            <div 
                className="rounded-md border text-xl pl-3 p-3" 
            >
                <MobileDrawer />
            </div>
              {MainMenuData.items.map((item, index) => (
                <DrawerClose asChild key={index}>
                  <Link href={item.href} >
                    <h2 className="rounded-md border text-xl pl-3 p-3">
                      {item.title}
                    </h2>
                  </Link>
                </DrawerClose>
              ))}
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    );
  }
