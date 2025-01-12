import Logo from "../../assets/icons/Logo";
import style from "../../assets/styles/pages/chatpage.module.scss";
import { useChat } from "../../store/chat";
import Markdown from "react-markdown";
const Chat = () => {
  const { chats } = useChat();
  return (
    <div className={style.chatPage}>
      <div className={style.chat}>
        {chats.map((message, i) => {
          return message.user ? (
            <div key={i} className={`${style.wrapper}`}>
              <div className={`${style.message} ${style.user}`}>
                {message.text}
              </div>
            </div>
          ) : (
            <div key={i} className={`${style.wrapper}`}>
              <div className={`${style.message}`}>
                <div className={style.AIIcon}>
                  <div className={style.logo}>
                    <Logo />
                  </div>
                </div>
                <div className={style.text}>
                  <Markdown>{message.text}</Markdown>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Chat;
