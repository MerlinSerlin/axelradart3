import { create } from 'zustand';

interface MobileMenuStore {
  isDrawerOpen: boolean;
  isMenuOpen: boolean;
  toggleMenu: () => void;
  toggleDrawer: () => void;
  closeDrawer: () => void;
  openDrawer: () => void;   
}

export const useMobileMenuStore = create<MobileMenuStore>((set) => ({
  isDrawerOpen: false,
  isMenuOpen: false,
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
  closeDrawer: () => set({ isDrawerOpen: false }),
  openDrawer: () => set({ isDrawerOpen: true }),
}));