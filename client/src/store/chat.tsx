import { create } from "zustand";
import { chatState } from "../types/types";

export const useChat = create<{
  chats: chatState[];
  addChat: (newChat: chatState) => void;
  clearChats: () => void;
}>((set) => ({
  chats: [], 
  addChat: (newChat) =>
    set((state) => ({
      chats: [...state.chats, newChat], 
    })),
  clearChats: () => set({ chats: [] }), 
}));