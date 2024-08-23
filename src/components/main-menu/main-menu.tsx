"use client"

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
import { MainMenuData } from "../../data/main-menu-data";
import Link from "next/link";

export default function MainMenu() {
    const isDesktop = useMediaQuery("(min-width: 640px)", {initializeWithValue: false});
    
    return isDesktop ? 
    <div>Desktop</div> 
    : 
    <div>
        <Drawer direction="left">
            <DrawerTrigger asChild>
                <Button className="fixed top-4 left-4 rounded-full border-2 border-white bg-slate-600 w-14 h-14 flex items-center justify-center z-20" >
                    <MenuIcon color="white"/>
                </Button>
            </DrawerTrigger>
            <DrawerContent direction="left">
                <DrawerHeader className="flex flex-row justify-between items-center space-y-0">
                    <DrawerClose asChild className="fixed top-3 right-3">
                        <Button className="h-7 w-7 p-0" variant='ghost'>
                            <X size={15}/>
                        </Button>
                    </DrawerClose>
                    <VisuallyHidden>
                        <DrawerTitle>Mobile Menu</DrawerTitle>
                        <DrawerDescription>Drawer Style Mobile Menu</DrawerDescription>
                    </VisuallyHidden>
                </DrawerHeader>
                <span className="flex flex-col fixed top-9 left-3">
                    {MainMenuData.items.map((item, index) => (
                        <Link href={item.href} key={index}>
                            {item.title}
                        </Link>
                    ))}
                </span>
            </DrawerContent>
        </Drawer>
    </div>
}