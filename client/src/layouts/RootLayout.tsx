import React from "react";
import style from "../assets/styles/layouts/layout.module.scss";
import { Link, Outlet } from "react-router-dom";
import Logo from "../assets/icons/Logo";
const RootLayout = () => {
  return (
    <div className={style.rootLayout}>
      <header>
        <Link to="/" style={{display:"flex"}}>
          <div style={{ height: "30px" ,width:'30px'}}>
            <Logo />
          </div>
          ChatGPT
        </Link>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
