import { Outlet, useNavigate } from "react-router-dom";
import style from "../assets/styles/layouts/dashboardLayout.module.scss";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";

const DashboardLayout = () => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
  }, [isLoaded, userId, navigate]);
if(!isLoaded) return "loading..."
  return (
    <div className={style.dashboardLayout}>
      <span className={style.menu}>MENU</span>
      <div className={style.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
