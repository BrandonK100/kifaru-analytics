/**
 * UI store for Kifaru Analytics. Sidebar, active route, modals.
 */

import { create } from 'zustand';
import { ROUTES } from '@/constants/routes';
import type { RoutePath } from '@/constants/routes';

interface ModalState {
  id: string;
  isOpen: boolean;
}

interface UiStore {
  sidebarOpen: boolean;
  activeRoute: RoutePath;
  modals: ModalState[];
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setActiveRoute: (route: RoutePath) => void;
  openModal: (id: string) => void;
  closeModal: (id: string) => void;
}

export const useUiStore = create<UiStore>()((set) => ({
  sidebarOpen: true,
  activeRoute: ROUTES.DASHBOARD,
  modals: [],

  toggleSidebar() {
    set((s) => ({ sidebarOpen: !s.sidebarOpen }));
  },
  setSidebarOpen(open) {
    set({ sidebarOpen: open });
  },
  setActiveRoute(route) {
    set({ activeRoute: route });
  },
  openModal(id) {
    set((s) => {
      const exists = s.modals.find((m) => m.id === id);
      if (exists)
        return { modals: s.modals.map((m) => (m.id === id ? { ...m, isOpen: true } : m)) };
      return { modals: [...s.modals, { id, isOpen: true }] };
    });
  },
  closeModal(id) {
    set((s) => ({
      modals: s.modals.map((m) => (m.id === id ? { ...m, isOpen: false } : m)),
    }));
  },
}));
