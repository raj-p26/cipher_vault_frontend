import { memo, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import userStore from "../../stores/user-store";
import Settings from "../../icons/Settings";
import "./AppBar.css";
import Button from "../Button/Button";

const AppBar: React.FC = () => {
  const [hasScrolled, setHasScrolled] = useState<boolean>(window.scrollY > 0);
  const user = userStore((s) => s.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.token) navigate("/auth");
  }, [navigate, user]);

  useEffect(() => {
    const handleEvent = () => setHasScrolled(window.scrollY > 0);

    window.addEventListener("scroll", handleEvent);

    return () => {
      window.removeEventListener("scroll", handleEvent);
    };
  }, []);

  return (
    <div className={`appbar-container ${hasScrolled ? "scrolled" : ""}`.trim()}>
      <div className="appbar-leading">
        <Link to="/">
          <h1>Cipher Vault</h1>
        </Link>
      </div>
      <ul className="appbar-actions">
        <li>
          <Link to="/settings">
            <Button variant="text">
              <Settings />
            </Button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default memo(AppBar);
