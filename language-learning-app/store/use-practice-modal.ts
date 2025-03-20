import { create } from "zustand";

type PracticeModalState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const usePracticeModal = create<PracticeModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
