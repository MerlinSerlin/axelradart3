import { create } from "zustand";

interface Collection {
    currentCollection: string;
    setCurrentCollection: (collection: string) => void;
    resetCurrentCollection: () => void;
}

export const useCollectionStore = create<Collection>((set) => ({
    currentCollection: "",
    setCurrentCollection: (collection: string) => set({ currentCollection: collection }),
    resetCurrentCollection: () => set({ currentCollection: "" }),
}))