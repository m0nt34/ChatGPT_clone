import { Link } from "react-router-dom";
import style from "../assets/styles/components/chatList.module.scss";
import Logo from "../assets/icons/Logo";
import Dashboard from "../assets/icons/Dashboard";
import Copy from "../assets/icons/Copy";
import "../assets/styles/index.scss";
import Upgrade from "../assets/icons/Upgrade";
const ChatList = () => {
  return (
    <div className={style.chatList}>
      <div className={style.header}>
        <button>
          <div className="customHover">
            <Dashboard />
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
              <span>MY chat title</span>
            </div>
          </Link>
          <Link to="/">
            <div className="customHover">
              <span>MY chat title</span>
            </div>
          </Link>
          <Link to="/">
            <div className="customHover">
              <span>MY chat titlsdfgsdfgase</span>
            </div>
          </Link>
          <Link to="/">
            <div className="customHover">
              <span>MY chat title</span>
            </div>
          </Link>
          <Link to="/">
            <div className="customHover">
              <span>MY chat title</span>
            </div>
          </Link>
          <Link to="/">
            <div className="customHover">
              <span>MY chat titlesdfsdfsdfserdfgdsdff</span>
            </div>
          </Link>
          <Link to="/">
            <div className="customHover">
              <span>MY chat title</span>
            </div>
          </Link>
          <Link to="/">
            <div className="customHover">
              <span>MY chat title</span>
            </div>
          </Link>
          <Link to="/">
            <div className="customHover">
              <span>MY chat title</span>
            </div>
          </Link>
          <Link to="/">
            <div className="customHover">
              <span>MY chat title</span>
            </div>
          </Link>
          <Link to="/">
            <div className="customHover">
              <span>MY chat title</span>
            </div>
          </Link>
          <Link to="/">
            <div className="customHover">
              <span>MY chat title</span>
            </div>
          </Link>
          <Link to="/">
            <div className="customHover">
              <span>MY chat title</span>
            </div>
          </Link>
          <Link to="/">
            <div className="customHover">
              <span>MY chat title</span>
            </div>
          </Link>
          <Link to="/">
            <div className="customHover">
              <span>MY chat title</span>
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
  );
};

export default ChatList;
