import { create } from "zustand";

interface Overlay {
    showOverlay: boolean;
    currentOverlay: string;
    setCurrentOverlay: (overlay: string) => void;
    resetOverlay: () => void;
}

export const useOverlaysStore = create<Overlay>((set) => ({
    showOverlay: false,
    currentOverlay: "",
    setCurrentOverlay: (overlay: string) => set({ currentOverlay: overlay }),
    resetOverlay: () => set({ showOverlay: false, currentOverlay: "" }),
}))