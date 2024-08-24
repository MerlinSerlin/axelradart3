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
import { MainMenuData } from "../../data/main-menu-data";
import Link from "next/link";
import { DesktopNavigationMenu } from "./desktop-navigation-menu";
import { MobileNavigationMenu } from "./mobile/mobile-navigation-menu";

export default function MainMenu() {
    const [showMenu, setShowMenu] = useState(false);

    const isDesktop = useMediaQuery("(min-width: 640px)", {initializeWithValue: false});
    
    return isDesktop ? 
    <DesktopNavigationMenu/>
    : 
    <MobileNavigationMenu/>
}