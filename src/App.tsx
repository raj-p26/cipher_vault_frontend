import { memo } from "react";
import { Outlet } from "react-router";
import AppBar from "./components/AppBar/AppBar";

function App() {
  return (
    <>
      <AppBar />
      <div className="app-container">
        <Outlet />
      </div>
    </>
  );
}

export default memo(App);
