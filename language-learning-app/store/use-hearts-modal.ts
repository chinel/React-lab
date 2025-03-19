import { create } from "zustand";

type HeartsModalState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useHeartsModal = create<HeartsModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
