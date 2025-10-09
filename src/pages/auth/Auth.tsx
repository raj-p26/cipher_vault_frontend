import { memo, useEffect, useState } from "react";
import Register from "./Register";
import Login from "./Login";
import userStore from "../../stores/user-store";
import { useNavigate } from "react-router";
import Card from "../../components/Card/Card";

function Auth() {
  const [showLogin, setShowLogin] = useState<boolean>();
  const user = userStore((s) => s.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.token) navigate("/");
  }, [user, navigate]);

  return (
    <div
      style={{
        maxWidth: "600px",
        width: "100%",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Card type="filled" width="100%">
        {showLogin ? (
          <Login onShowRegister={() => setShowLogin(false)} />
        ) : (
          <Register onShowLogin={() => setShowLogin(true)} />
        )}
      </Card>
    </div>
  );
}

export default memo(Auth);
