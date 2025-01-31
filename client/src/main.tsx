import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/index.scss";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/homepage/Home.tsx";
import Dashboard from "./pages/dashboardpage/Dashboard.tsx";
import Chat from "./pages/chatpage/Chat.tsx";
import RootLayout from "./layouts/RootLayout.tsx";
import DashboardLayout from "./layouts/DashboardLayout.tsx";
import SignInPage from "./pages/signin/SignIn.tsx";
import SignUpPage from "./pages/signup/Signup.tsx";
import NotFound from "./pages/notFound/NotFound.tsx";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/sign-in/*",
        element: <SignInPage />,
      },
      {
        path: "/sign-up/*",
        element: <SignUpPage />,
      },
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/dashboard/chats/:id",
            element: <Chat />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
