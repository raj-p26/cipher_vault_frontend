import { memo } from "react";
import "./AppBar.css";
import Button from "../Button/Button";
import themeStore from "../../stores/theme-store";
import { DarkMode, LightMode } from "../../assets/icons";
import userStore from "../../stores/user-store";

const AppBar: React.FC = () => {
  const theme = themeStore((s) => s.theme);
  const toggleTheme = themeStore((s) => s.toggleTheme);
  const setUser = userStore((s) => s.setUser);
  const logout = () => {
    localStorage.removeItem("user");
    setUser({});
  };

  return (
    <div className="appbar-container">
      <div className="appbar-leading">
        <h1>Cipher Vault</h1>
      </div>
      <ul className="appbar-actions">
        <li>
          <Button onClick={toggleTheme} variant="text">
            {theme === "light" ? <DarkMode /> : <LightMode />}
          </Button>
        </li>
        <li>
          <Button variant="text" color="error" onClick={logout}>
            Logout
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default memo(AppBar);
