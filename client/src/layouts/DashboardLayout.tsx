import { Outlet, useLocation, useNavigate } from "react-router-dom";
import style from "../assets/styles/layouts/dashboardLayout.module.scss";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import InputForm from "../components/InputForm";
import NavBar from "../components/NavBar";

const DashboardLayout = () => {
  const { userId, isLoaded } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
  }, [isLoaded, userId, navigate]);
  if (!isLoaded) return "loading...";
  return (
    <div className={style.dashboardLayout}>
      {location.pathname.includes("dashboard") && <NavBar />}
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
