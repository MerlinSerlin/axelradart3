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
import { MenuIcon } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function MainMenu() {
    const isDesktop = useMediaQuery("(min-width: 768px)", {initializeWithValue: false});
    
    return isDesktop ? 
    <div>Desktop</div> 
    : 
    <div>
        <Drawer direction="right">
            <DrawerTrigger>
                <MenuIcon />
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <VisuallyHidden>
                        <DrawerTitle>Mobile Menu</DrawerTitle>
                        <DrawerDescription>Drawer Style Mobile Menu</DrawerDescription>
                    </VisuallyHidden>
                </DrawerHeader>
                Some drawer content
            </DrawerContent>
        </Drawer>
    </div>
}