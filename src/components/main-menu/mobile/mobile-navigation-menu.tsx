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
import { MainMenuData } from "@/data/main-menu-data";
import { MobileDrawer } from "./mobile-drawer";
import { useMobileMenuStore } from "@/store/mobile-menu";
import Link from "next/link";
import MobileNavigationMenuItems from "./mobile-navigation-menu-items";

export function MobileNavigationMenu() {

    // setMenu is passed directly to onOpenChange, 
    // meaning whenever the Menu opens or closes, 
    // setMenu is called with the new state (either true or false).
    
    const { isMenuOpen, setMenu } = useMobileMenuStore();
  
    return (
      <Drawer open={isMenuOpen} onOpenChange={setMenu} direction="left">
        <DrawerTrigger asChild>
          {/* <Button
            className="flex justify-start border-1 border-[rgb(30,41,59)] w-12 h-12 z-20"
            variant="ghost"
          > */}
            <MenuIcon color="white" />
          {/* </Button> */}
        </DrawerTrigger>
        <DrawerHeader className="flex flex-row justify-between items-center space-y-0 p-0">
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
            {/* {MainMenuData.items.map((item, index) => (
              <DrawerClose asChild key={index}>
                <Link href={item.href} >
                  <h2 className="rounded-md border text-xl pl-3 p-3">
                    {item.title}
                  </h2>
                </Link>
              </DrawerClose>
            ))} */}
            <MobileNavigationMenuItems />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }
