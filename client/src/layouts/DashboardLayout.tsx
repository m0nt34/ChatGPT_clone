import { Outlet, useNavigate } from "react-router-dom";
import style from "../assets/styles/layouts/dashboardLayout.module.scss";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import InputForm from "../components/InputForm";

const DashboardLayout = () => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
  }, [isLoaded, userId, navigate]);
  if (!isLoaded) return "loading...";
  return (
    <div className={style.dashboardLayout}>
      <div className={style.content}>
        <Outlet />
      </div>
      <InputForm />
      <span className={style.details}>
        ChatGPT can make mistakes. Check important info.
      </span>
    </div>
  );
};

export default DashboardLayout;
