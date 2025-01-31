import { useEffect, useState } from "react";
import style from "../../assets/styles/pages/dashboardpage.module.scss";
import { getChatDirectionArr } from "../../utils/GetChatDirection";
import Logo from "../../assets/icons/Logo";
import { createNewChat } from "../../services/createNewChat";
import { useChatList } from "../../store/chatList";
import { useCurrentChatId } from "../../store/currectChatId";
import { useNavigate } from "react-router-dom";
import { useChat } from "../../store/chat";
import { uploadContent } from "../../services/uploadContent";
import { getResponse } from "../../services/gptResponse";
import { useLoading } from "../../store/chatLoading";
import { useUser } from "@clerk/clerk-react";

type topicsType = {
  header: string;
  message: string;
};

type chatsType = {
  icon: JSX.Element;
  topics: topicsType[];
};

const Dashboard = () => {
  const [chats, setChats] = useState<chatsType[]>([]);
  const { addChatToChatList } = useChatList();
  const { currentChatId, setCurrentChatId } = useCurrentChatId();
  const { addChat } = useChat();
  const { setLoading } = useLoading();
  const navigate = useNavigate();
  const { user } = useUser();
  useEffect(() => {
    const arr = getChatDirectionArr();
    setChats(arr);
  }, []);
  const startNewChatWithDirection = async (prop: string) => {
    if (!user?.id) return;
    setLoading(true);
    const response = await createNewChat(user.id, prop.substring(0, 50));
    let tempID = "";

    if (response) {
      addChatToChatList(response);
      setCurrentChatId(response.ID);
      tempID = response.ID;
    }
    navigate(`/dashboard/chats/${response.ID}`);

    const newHistory = {
      Role: "user",
      Parts: [{ Text: prop }] as [{ Text: string }],
      Image: "",
    };
    addChat(newHistory);
    uploadContent(newHistory, tempID ? tempID : currentChatId);
    const imgCopy = {
      isLoading: false,
      error: "",
      dbData: {},
      aiData: { inlineData: { data: "", mimeType: "" } },
    };
    const { error, res } = await getResponse({ imgCopy, prop });

    setLoading(false);
    const modelReq = {
      Role: "model",
      Parts: [{ Text: res }] as [{ Text: string }],
      Image: "",
    };
    addChat(modelReq);
    uploadContent(modelReq, tempID ? tempID : currentChatId);
  };
  return (
    <div className={style.main_cont}>
      <div className={style.dashboard}>
        <div className={style.empty_cont}>
          <div className={style.logo}>
            <Logo />
          </div>
          <div className={style.chatsDirection}>
            <div className={style.row}>
              <button
                className={style.chat}
                onClick={() =>
                  startNewChatWithDirection(chats[0]?.topics[0]?.message)
                }
              >
                <header>{chats[0]?.icon}</header>
                <div className={style.text}>{chats[0]?.topics[0]?.header}</div>
              </button>
              <button
                className={style.chat}
                onClick={() =>
                  startNewChatWithDirection(chats[1]?.topics[0]?.message)
                }
              >
                <header>{chats[1]?.icon}</header>
                <div className={style.text}>{chats[1]?.topics[0]?.header}</div>
              </button>
            </div>
            <div className={style.row}>
              <button
                className={style.chat}
                onClick={() =>
                  startNewChatWithDirection(chats[2]?.topics[0]?.message)
                }
              >
                <header>{chats[2]?.icon}</header>
                <div className={style.text}>{chats[2]?.topics[0]?.header}</div>
              </button>
              <button
                className={style.chat}
                onClick={() =>
                  startNewChatWithDirection(chats[3]?.topics[0]?.message)
                }
              >
                <header>{chats[3]?.icon}</header>
                <div className={style.text}>{chats[3]?.topics[0]?.header}</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
