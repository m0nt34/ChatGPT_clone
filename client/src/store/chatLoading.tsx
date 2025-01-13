import { create } from "zustand";

export const useLoading = create<{
  loading: boolean;
  setLoading: (newLoading: boolean) => void;
}>((set) => ({
  loading: false,
  setLoading: (newLoading) => set({ loading: newLoading }),
}));
