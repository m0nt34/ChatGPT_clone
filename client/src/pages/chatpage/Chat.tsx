import Logo from "../../assets/icons/Logo";
import style from "../../assets/styles/pages/chatpage.module.scss";
const Chat = () => {
  return (
    <div className={style.chatPage}>
      <div className={style.chat}>
        <div className={`${style.wrapper}`}>
          <div className={`${style.message} ${style.user}`}>
            Test message from user
          </div>
        </div>
        <div className={`${style.wrapper}`}>
          <div className={`${style.message}`}>
            <div className={style.AIIcon}>
              <div className={style.logo}>
                <Logo />
              </div>
            </div>
            Test message from AI
          </div>
        </div>
        <div className={`${style.wrapper}`}>
          <div className={`${style.message} ${style.user}`}>
            Test message from user
          </div>
        </div>
        <div className={`${style.wrapper}`}>
          <div className={`${style.message}`}>
            <div className={style.AIIcon}>
              <div className={style.logo}>
                <Logo />
              </div>
            </div>
            Test message from AI
          </div>
        </div>
        <div className={`${style.wrapper}`}>
          <div className={`${style.message} ${style.user}`}>
            Test message from user
          </div>
        </div>
        <div className={`${style.wrapper}`}>
          <div className={`${style.message}`}>
            <div className={style.AIIcon}>
              <div className={style.logo}>
                <Logo />
              </div>
            </div>
            Test message from AI
          </div>
        </div>
        <div className={`${style.wrapper}`}>
          <div className={`${style.message} ${style.user}`}>
            Test message from user
          </div>
        </div>
        <div className={`${style.wrapper}`}>
          <div className={`${style.message}`}>
            <div className={style.AIIcon}>
              <div className={style.logo}>
                <Logo />
              </div>
            </div>
            Test message from AI
          </div>
        </div>
        <div className={`${style.wrapper}`}>
          <div className={`${style.message} ${style.user}`}>
            Test message from user
          </div>
        </div>
        <div className={`${style.wrapper}`}>
          <div className={`${style.message}`}>
            <div className={style.AIIcon}>
              <div className={style.logo}>
                <Logo />
              </div>
            </div>
            Test message from AI
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
