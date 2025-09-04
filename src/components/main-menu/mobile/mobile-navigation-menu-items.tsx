import { DrawerClose } from "@/components/ui/drawer"
import Link from "next/link";
import { useOverlaysStore } from "@/store/overlays";
import { ContactOverlay } from "../overlays/contact-overlay";
import { TheArtistOverlay } from "../overlays/the-artist-overlay";

const MobileNavigationMenuItems = () => {
    const { setCurrentOverlay, currentOverlay } = useOverlaysStore()

    const handleContactClick = () => {
        setCurrentOverlay("contact")
        const updatedOverlay = useOverlaysStore.getState().currentOverlay;
        console.log(updatedOverlay)
    }

    const handlePricesClick = () => {
        setCurrentOverlay("prices")
        console.log(currentOverlay)
        
    }

    const handleTheArtistClick = () => {
        setCurrentOverlay("the-artist")
        const updatedOverlay = useOverlaysStore.getState().currentOverlay;
        console.log(updatedOverlay)
    }

    return (
    <>
        {/* Standard Menu Items */}
        <DrawerClose asChild>
            <Link href="/fabric-art">
                <h2 className="rounded-md border text-xl pl-3 p-3">
                Fabric Art
                </h2>
            </Link>
        </DrawerClose>
        <DrawerClose asChild>
            <Link href="/installed-art" >
                <h2 className="rounded-md border text-xl pl-3 p-3">
                Installed Art
                </h2>
            </Link>
        </DrawerClose>
        <DrawerClose asChild onClick={handlePricesClick}>
            <h2 className="rounded-md border text-xl pl-3 p-3">
                Prices
            </h2>
        </DrawerClose>
        <DrawerClose asChild onClick={handleContactClick}>
            <ContactOverlay/>
        </DrawerClose>
        <DrawerClose asChild onClick={handleTheArtistClick}>
            <TheArtistOverlay/>
        </DrawerClose>
    </>
    )
}

export default MobileNavigationMenuItems