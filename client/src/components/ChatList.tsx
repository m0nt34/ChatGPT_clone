import { Link } from "react-router-dom";
import style from "../assets/styles/components/chatList.module.scss";
import Logo from "../assets/icons/Logo";
import Dashboard from "../assets/icons/Dashboard";
import Copy from "../assets/icons/Copy";
import "../assets/styles/index.scss";
import Upgrade from "../assets/icons/Upgrade";
import { useOpen } from "../store/chatListOpen";
import ThreeDots from "../assets/icons/ThreeDots";
import Menu from "../assets/icons/Menu";
const ChatList = () => {
  const { open, setOpen } = useOpen();
  return (
    <div
      className={`${style.wrapper} ${open ? style.opened : null}`}
      onClick={() => {
        if (window.innerWidth >= 768) return;
        if (open) setOpen();
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`${style.chatList} ${open ? style.opened : null}`}
        style={{
          transition:
            "width 400ms cubic-bezier(0.25, 0.46, 0.45, 1.1), padding 400ms",
          padding: open ? "0 0.25rem 0 0.75rem" : "0",
        }}
      >
        <div className={style.background}></div>
        <div className={style.header}>
          <button onClick={setOpen}>
            <div className="customHover">
              <Dashboard />
              <Menu />
            </div>
          </button>
          <button>
            <div className="customHover">
              <Copy />
            </div>
          </button>
        </div>

        <div className={style.middle_cont}>
          <div className={style.newChat}>
            <button>
              <div className="customHover">
                <div className={style.newChatLogo}>
                  <Logo />
                </div>
                <span>ChatGPT</span>
                <div className={style.copyIcon}>
                  <Copy />
                </div>
              </div>
            </button>
          </div>

          <br />
          <div className={style.list}>
            <Link to="/">
              <div className="customHover">
                <span>
                  MY chat title
                  <div className={style.three_dots}>
                    <ThreeDots />
                  </div>
                </span>
              </div>
            </Link>
            <Link to="/">
              <div className="customHover">
                <span>
                  MY chat title
                  <div className={style.three_dots}>
                    <ThreeDots />
                  </div>
                </span>
              </div>
            </Link>
            <Link to="/">
              <div className="customHover">
                <span>
                  MY chat title
                  <div className={style.three_dots}>
                    <ThreeDots />
                  </div>
                </span>
              </div>
            </Link>
            <Link to="/">
              <div className="customHover">
                <span>
                  MY chat title
                  <div className={style.three_dots}>
                    <ThreeDots />
                  </div>
                </span>
              </div>
            </Link>
            <Link to="/">
              <div className="customHover">
                <span>
                  MY chat title
                  <div className={style.three_dots}>
                    <ThreeDots />
                  </div>
                </span>
              </div>
            </Link>
            <Link to="/">
              <div className="customHover">
                <span>
                  MY chat titleasdfasasdfasdasdff
                  <div className={style.three_dots}>
                    <ThreeDots />
                  </div>
                </span>
              </div>
            </Link>
            <Link to="/">
              <div className="customHover">
                <span>
                  MY chat title
                  <div className={style.three_dots}>
                    <ThreeDots />
                  </div>
                </span>
              </div>
            </Link>
            <Link to="/">
              <div className="customHover">
                <span>
                  MY chat title
                  <div className={style.three_dots}>
                    <ThreeDots />
                  </div>
                </span>
              </div>
            </Link>
            <Link to="/">
              <div className="customHover">
                <span>
                  MY chat title
                  <div className={style.three_dots}>
                    <ThreeDots />
                  </div>
                </span>
              </div>
            </Link>
            <Link to="/">
              <div className="customHover">
                <span>
                  MY chat title
                  <div className={style.three_dots}>
                    <ThreeDots />
                  </div>
                </span>
              </div>
            </Link>
            <Link to="/">
              <div className="customHover">
                <span>
                  MY chat title
                  <div className={style.three_dots}>
                    <ThreeDots />
                  </div>
                </span>
              </div>
            </Link>
            <Link to="/">
              <div className="customHover">
                <span>
                  MY chat title
                  <div className={style.three_dots}>
                    <ThreeDots />
                  </div>
                </span>
              </div>
            </Link>
            <Link to="/">
              <div className="customHover">
                <span>
                  MY chat title
                  <div className={style.three_dots}>
                    <ThreeDots />
                  </div>
                </span>
              </div>
            </Link>
            <Link to="/">
              <div className="customHover">
                <span>
                  MY chat title
                  <div className={style.three_dots}>
                    <ThreeDots />
                  </div>
                </span>
              </div>
            </Link>
          </div>
          <br />
        </div>
        <div className={style.upgrade}>
          <div className="customHover">
            <div className={style.upgradeIcon}>
              <Upgrade />
            </div>
            <div className={style.texts}>
              <span>Upgrade plan</span>
              <span>More access to the best models</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
