import React from "react";
import style from "../assets/styles/layouts/layout.module.scss";
import { Link, Outlet } from "react-router-dom";
import Logo from "../assets/icons/Logo";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const RootLayout = () => {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <div className={style.rootLayout}>
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
        <main>
          <Outlet />
        </main>
      </div>
    </ClerkProvider>
  );
};

export default RootLayout;
