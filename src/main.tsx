import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Auth from "./pages/auth/Auth.tsx";
import { setTheme, type Theme } from "./stores/theme-store.ts";
import RequireAuth from "./RequireAuth.tsx";
import "./index.css";

const Settings = React.lazy(() => import("./pages/settings/Settings.tsx"));
const Dashboard = React.lazy(() => import("./pages/home/Dashboard.tsx"));
const localTheme: "light" | "dark" =
  (localStorage.getItem("theme") as Theme) || "light";
setTheme(localTheme);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<RequireAuth />}>
          <Route path="" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
