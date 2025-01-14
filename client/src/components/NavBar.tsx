import { Link } from "react-router-dom";
import Copy from "../assets/icons/Copy";
import style from "../assets/styles/layouts/layout.module.scss";

import { SignedIn, UserButton } from "@clerk/clerk-react";
import { useOpen } from "../store/chatListOpen";
import Logo from "../assets/icons/Logo";
import Dashboard from "../assets/icons/Dashboard";
import Menu from "../assets/icons/Menu";
const NavBar = () => {
  const { open, setOpen } = useOpen();
  return (
    <header
      style={{
        padding: !location.pathname.includes("dashboard") ? "16px 5%" : "12px",
      }}
    >
      {location.pathname.includes("dashboard") ? (
        <div className={style.header_left}>
          {!open && (
            <div className={style.buttons}>
              <button onClick={setOpen}>
                <Dashboard />
                <Menu/>
              </button>
              <button>
                <Copy />
              </button>
            </div>
          )}
          <Link className={style.dashboard_logo} to="/">
            ChatGPT
          </Link>
        </div>
      ) : (
        <Link className={style.logo_cont} to="/">
          <div className={style.logo}>
            <Logo />
          </div>
          ChatGPT
        </Link>
      )}
      <div className={style.user}>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
};

export default NavBar;
