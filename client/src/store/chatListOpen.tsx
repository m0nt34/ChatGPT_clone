import { create } from "zustand";
import { openStruct } from "../types/types";



export const useOpen = create<openStruct>((set) => ({
  open: true,
  setOpen: () =>
    set((state) => ({
      open: !state.open,
    })),
}));
