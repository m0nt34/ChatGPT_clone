import { Link, useLocation, useNavigate } from "react-router-dom";
import { chatListType } from "../../types/types";
import Trash from "../../assets/icons/Trash";
import ThreeDots from "../../assets/icons/ThreeDots";
import { getChatContent } from "../../services/getChatContent";
import { useChat } from "../../store/chat";
import { useCurrentChatId } from "../../store/currectChatId";
import { useState } from "react";
import style from "../../assets/styles/components/chatList.module.scss";
import Pen2 from "../../assets/icons/Pen2";
import { useChatList } from "../../store/chatList";
import { editChatTitle } from "../../services/editChatTitle";
import { useUser } from "@clerk/clerk-react";
import { deleteChatService } from "../../services/deleteChat";

const ChatListListComp = ({ chat }: { chat: chatListType }) => {
  const { setChat } = useChat();
  const { setCurrentChatId } = useCurrentChatId();
  const { setNewChatName, deleteChat } = useChatList();
  const { user } = useUser();
  const [open, setOpen] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(chat.Title);
  const location = useLocation();
  const navigate = useNavigate();
  const setOption = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen((prev) => !prev);
  };
  const editFunc = (e: any) => {
    e.stopPropagation();
    setTitle(chat.Title);
    setEdit(true);
    setOpen(false);
  };
  const setNewTitleFunc = () => {

    if (title !== chat.Title && title.trim().substring(0, 50)) {
      setNewChatName(chat.ID, title.trim().substring(0, 50));
      if (user?.id) editChatTitle(user.id, { ID: chat.ID, NewTitle: title.trim().substring(0, 50) });
    }
    setEdit(false);
  };
  
  const deleteFunc = () => {
    deleteChat(chat.ID);
    deleteChatService(chat.ID);
    const locID = location.pathname.split("/");
    if (chat.ID == locID[locID.length - 1]) {
      navigate("/dashboard", { replace: true });
    }
  };

  return (
    <div className={style.ChatList_component_main_wrapper}>
      <Link
        to={`/dashboard/chats/${chat.ID}`}
        onClick={async () => {
          const res = await getChatContent(chat.ID);
          setCurrentChatId(chat.ID);
          setChat(res);
        }}
      >
        <div
          className={
            open
              ? `${style.custom_hover} ${style.option_opened}`
              : style.custom_hover
          }
        >
          {edit ? (
            <input
              type="text"
              value={title}
              className={style.edit_input}
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
              onBlur={setNewTitleFunc}
            />
          ) : (
            <span>
              {chat.Title}

              <button
                className={style.three_dots}
                onClick={setOption}
                onBlur={() => {
                  setTimeout(() => {
                    setOpen(false);
                  }, 250);
                }}
              >
                <ThreeDots />
              </button>
            </span>
          )}
        </div>
      </Link>
      {open && (
        <div
          className={style.option_wrapper}
          onClick={(e: any) => e.stopPropagation()}
        >
          <div className={style.option_cont}>
            <button onClick={editFunc}>
              <Pen2 />
              Rename
            </button>
            <button onClick={deleteFunc}>
              <Trash />
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatListListComp;
