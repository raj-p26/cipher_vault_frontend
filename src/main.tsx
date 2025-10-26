// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Auth from "./pages/auth/Auth.tsx";
import Dashboard from "./pages/home/Dashboard.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/" element={<App />}>
        <Route path="" element={<Dashboard />} />
      </Route>
    </Routes>
  </BrowserRouter>
  // </StrictMode>
);
