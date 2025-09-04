import {
    Drawer,   
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button";
import { MenuIcon, ArrowLeft } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { MobileDrawer } from "./mobile-drawer";
import { useMobileMenuStore } from "@/store/mobile-menu";
import MobileNavigationMenuItems from "./mobile-navigation-menu-items";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";

function MobileNavigationMenuContent() {
    const { isMenuOpen, setMenu } = useMobileMenuStore();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    
    // Parse current route to determine navigation context
    const pathParts = pathname.split('/').filter(Boolean);
    const isIndividualPiece = pathParts.length === 2;
    const currentView = searchParams.get('view');
    const collectionName = pathParts[0];
    const pieceName = pathParts[1];

    // Determine what the back button should do
    const getBackAction = () => {
        if (isIndividualPiece && currentView) {
            // From piece with view -> back to piece main view
            return () => router.push(`/${collectionName}/${pieceName}`);
        } else if (isIndividualPiece) {
            // From piece main view -> back to collection (preserve scroll)
            return () => {
                console.log('Back arrow clicked - preserving scroll');
                // Store scroll position before navigating
                const scrollPosition = sessionStorage.getItem(`scroll-${collectionName}`) || '0';
                router.push(`/${collectionName}`);
                
                // Restore scroll position after navigation
                setTimeout(() => {
                    window.scrollTo(0, parseInt(scrollPosition));
                }, 50);
            };
        }
        return null;
    };

    const backAction = getBackAction();
    const shouldShowBackArrow = backAction !== null;
  
    return (
      <>
        {shouldShowBackArrow ? (
          <Button
            onClick={backAction}
            className="p-0 bg-transparent hover:bg-transparent"
            variant="ghost"
          >
            <ArrowLeft color="white" size={24} />
          </Button>
        ) : (
          <Drawer open={isMenuOpen} onOpenChange={setMenu} direction="left">
            <DrawerTrigger asChild>
              <Button
                className="p-0 bg-transparent hover:bg-transparent"
                variant="ghost"
              >
                <MenuIcon color="white" size={24} />
              </Button>
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
                <MobileNavigationMenuItems />
              </div>
            </DrawerContent>
          </Drawer>
        )}
      </>
    );
}

export function MobileNavigationMenu() {
  return (
    <Suspense fallback={
      <Button
        className="p-0 bg-transparent hover:bg-transparent"
        variant="ghost"
      >
        <MenuIcon color="white" size={24} />
      </Button>
    }>
      <MobileNavigationMenuContent />
    </Suspense>
  );
}
