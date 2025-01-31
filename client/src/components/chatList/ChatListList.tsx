
import { chatListType } from "../../types/types";
import { useChatList } from "../../store/chatList";
import style from "../../assets/styles/components/chatList.module.scss";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { getChatList } from "../../services/getChatList";

import ChatListListComp from "./ChatListListComp";
const ChatListList = () => {
  const { chatList } = useChatList();
  const { user } = useUser();
  const { setChatList } = useChatList();
  useEffect(() => {
    const getChatListFunc = async () => {
      if (!user?.id) return;
      const res = await getChatList(user.id);
      setChatList(Array.isArray(res) ? res : []);
    };
    getChatListFunc();
  }, [user]);

  return (
    <div className={style.list}>
      {chatList?.map((chat: chatListType, i: number) => (
        <ChatListListComp key={i} chat={chat}/>
      ))}
    </div>
  );
};

export default ChatListList;
