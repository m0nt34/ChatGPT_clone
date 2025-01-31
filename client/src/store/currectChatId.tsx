import { create } from "zustand";

type CurrentChatIdState = {
  currentChatId: string;
  setCurrentChatId: (newCurrentChatId: string) => void;
  clearCurrentChatId: () => void;
};

export const useCurrentChatId = create<CurrentChatIdState>((set) => ({
  currentChatId: "",
  setCurrentChatId: (newCurrentChatId) =>
    set({ currentChatId: newCurrentChatId }),
  clearCurrentChatId: () => set({ currentChatId: "" }),
}));
