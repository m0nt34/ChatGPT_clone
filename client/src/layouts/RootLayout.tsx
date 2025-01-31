import style from "../assets/styles/layouts/layout.module.scss";
import { Outlet, useLocation } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";

import ChatList from "../components/chatList/ChatList";
import NavBar from "../components/NavBar";

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
            {!location.pathname.includes("dashboard") && <NavBar />}
            <Outlet />
          </main>
        </div>
      </div>
    </ClerkProvider>
  );
};

export default RootLayout;
