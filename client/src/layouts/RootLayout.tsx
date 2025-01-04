import style from "../assets/styles/layouts/layout.module.scss";
import { Link, Outlet, useLocation } from "react-router-dom";
import Logo from "../assets/icons/Logo";
import { ClerkProvider, SignedIn, UserButton } from "@clerk/clerk-react";
import ChatList from "../components/ChatList";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const RootLayout = () => {
  const location = useLocation();
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <div className={style.rootLayout}>
        <div className={style.navBar_dashboard}>
          {location.pathname.includes("dashboard") && <ChatList />}
          <main>
            <header>
              <Link className={style.logo_cont} to="/">
                <div className={style.logo}>
                  <Logo />
                </div>
                ChatGPT
              </Link>
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
