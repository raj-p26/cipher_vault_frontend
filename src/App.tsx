import { memo } from "react";
import { Outlet } from "react-router";
import AppBar from "./components/AppBar/AppBar";

function App() {
  return (
    <>
      <AppBar />
      <div style={{ marginTop: "80px" }}>
        <Outlet />
      </div>
    </>
  );
}

export default memo(App);
