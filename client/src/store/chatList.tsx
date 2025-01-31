import { create } from "zustand";
import { chatListType } from "../types/types";

type chatListState = {
  chatList: chatListType[];
  setChatList: (newChatList: chatListType[]) => void;
  addChatToChatList: (addChat: chatListType) => void;
  setNewChatName: (ID: string | number, newTitle: string) => void;
  deleteChat: (ID: string | number) => void;
};

export const useChatList = create<chatListState>((set) => ({
  chatList: [],
  setChatList: (newChatList) => set({ chatList: newChatList.reverse() }),
  addChatToChatList: (addChat) =>
    set((state) => ({
      chatList: [addChat, ...state.chatList],
    })),
  setNewChatName: (ID, newTitle) =>
    set((state) => ({
      chatList: state.chatList.map((chat) =>
        chat.ID === ID ? { ...chat, Title: newTitle } : chat
      ),
    })),
  deleteChat: (ID) =>
    set((state) => ({
      chatList: state.chatList.filter((chat) => chat.ID !== ID),
    })),
}));
