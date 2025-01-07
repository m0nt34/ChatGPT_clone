import { useEffect, useState } from "react";
import Logo from "../../assets/icons/Logo";
import style from "../../assets/styles/pages/dashboardpage.module.scss";
import { getChatDirectionArr } from "../../utils/GetChatDirection";

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

  useEffect(() => {
    const arr = getChatDirectionArr();
    setChats(arr);
  }, []);

  return (
    <div className={style.dashboard}>
      <div className={style.empty_cont}>
        <div className={style.logo}>
          <Logo />
        </div>
        <div className={style.chatsDirection}>
          <div className={style.row}>
            <button className={style.chat}>
              <header>{chats[0]?.icon}</header>
              <div className={style.text}>{chats[0]?.topics[0]?.header}</div>
            </button>
            <button className={style.chat}>
              <header>{chats[1]?.icon}</header>
              <div className={style.text}>{chats[1]?.topics[0]?.header}</div>
            </button>
          </div>
          <div className={style.row}>
            <button className={style.chat}>
              <header>{chats[2]?.icon}</header>
              <div className={style.text}>{chats[2]?.topics[0]?.header}</div>
            </button>
            <button className={style.chat}>
              <header>{chats[3]?.icon}</header>
              <div className={style.text}>{chats[3]?.topics[0]?.header}</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
