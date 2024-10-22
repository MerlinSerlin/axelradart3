"use client"

import { TheArtistOverlay } from "./the-artist-overlay";
import { ContactOverlay } from "./contact-overlay";
import { useOverlaysStore } from "@/store/overlays";

export const Overlays = () => {
    const { currentOverlay, showOverlay  } = useOverlaysStore();

  return (
    <>
        <div className={currentOverlay === "contact" ? "absolute z-50 md:hidden" : "hidden"}>
            <ContactOverlay  />
        </div>
        <div className={currentOverlay === "the-artist" ? " z-50 md:hidden" : "hidden"}>
            <TheArtistOverlay  />
        </div>
        
    </>
  );
};

