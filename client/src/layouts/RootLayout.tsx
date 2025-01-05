import style from "../assets/styles/layouts/layout.module.scss";
import { Link, Outlet, useLocation } from "react-router-dom";
import Logo from "../assets/icons/Logo";
import { ClerkProvider, SignedIn, UserButton } from "@clerk/clerk-react";
import ChatList from "../components/ChatList";
import { useOpen } from "../store/chatListOpen";
import Dashboard from "../assets/icons/Dashboard";
import Copy from "../assets/icons/Copy";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const RootLayout = () => {
  const location = useLocation();
  const { open, setOpen } = useOpen();
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <div className={style.rootLayout}>
        <div className={style.navBar_dashboard}>
          {location.pathname.includes("dashboard") && <ChatList />}
          <main>
            <header
              style={{
                padding: !location.pathname.includes("dashboard")
                  ? "16px 5%"
                  : "12px",
              }}
            >
              {location.pathname.includes("dashboard") ? (
                <div className={style.header_left}>
                  {!open && (
                    <div className={style.buttons}>
                      <button onClick={setOpen}>
                        <Dashboard />
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
            <Outlet />
          </main>
        </div>
      </div>
    </ClerkProvider>
  );
};

export default RootLayout;
