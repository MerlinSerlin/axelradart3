import { create } from 'zustand';

interface MobileMenuStore {
  isDrawerOpen: boolean;
  isMenuOpen: boolean;
  toggleMenu: () => void;
  toggleDrawer: () => void;
  openDrawer: () => void;   
  closeDrawer: () => void;
  openMenu: () => void;
  closeMenu: () => void;    
}

export const useMobileMenuStore = create<MobileMenuStore>((set) => ({
  isDrawerOpen: false,
  isMenuOpen: false,
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),
  openMenu: () => set({ isMenuOpen: true }),
  closeMenu: () => set({ isMenuOpen: false }),
}));