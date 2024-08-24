"use client"

import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
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
import { MainMenuData } from "../../../data/main-menu-data";
import { MobileDrawer } from "./mobile-drawer";
import Link from "next/link";

export function MobileNavigationMenu() {  
  const [showMenu, setShowMenu] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const [isDrawerOpen, setDrawerIsOpen] = useState(false);

  const toggleOpen = () => {
    setDrawerIsOpen(!isDrawerOpen);
  };


  return (
    <div>
        <Drawer direction="left" open={showMenu} onOpenChange={setShowMenu}>
            <DrawerTrigger asChild>
                <Button className="fixed top-4 left-4 rounded-full border-2 border-white bg-slate-600 w-14 h-14 flex items-center justify-center z-20" >
                    <MenuIcon color="white"/>
                </Button>
            </DrawerTrigger>
            <DrawerContent direction="left">
                <DrawerHeader className="flex flex-row justify-between items-center space-y-0">
                    {/* <DrawerClose asChild className="fixed top-3 right-3">
                        <Button className="h-7 w-7 p-0" variant='ghost'>
                            <X size={15}/>
                        </Button>
                    </DrawerClose> */}
                    <VisuallyHidden>
                        <DrawerTitle>Mobile Menu</DrawerTitle>
                        <DrawerDescription>Drawer Style Mobile Menu</DrawerDescription>
                    </VisuallyHidden>
                </DrawerHeader>
                <div className="fixed max-w-80 w-screen flex flex-col" onClick={() => toggleOpen()}>
                    <h2 className="rounded-md border text-xl pl-3 p-3">
                        <MobileDrawer 
                        isOpen={isDrawerOpen}
                        toggleOpen={() => toggleOpen}
                        />
                    </h2>
                    {MainMenuData.items.map((item, index) => (
                        <h2 key={index} className="rounded-md border text-xl pl-3 p-3">
                            <Link href={item.href} key={index} onClick={() => setShowMenu(false)}>
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