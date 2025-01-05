import { create } from "zustand";

type openStruct = {
  open: boolean;
  setOpen: () => void;
};

export const useOpen = create<openStruct>((set) => ({
  open: true,
  setOpen: () =>
    set((state) => ({
      open: !state.open,
    })),
}));
