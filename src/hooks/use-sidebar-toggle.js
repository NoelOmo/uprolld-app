import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useSidebarToggle = create(
  persist(
    (set, get) => ({
      isOpen: false,
      setIsOpen: () => {
        set({ isOpen: !get().isOpen });
      }
    }),
    {
      name: 'sidebarOpen',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
