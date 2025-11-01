import { useEffect, useState } from "react";
import App from "./App";
import userStore from "./stores/user-store";
import Loading from "./components/Loading";
import { useNavigate } from "react-router";

export default function RequireAuth() {
  const user = userStore((s) => s.user);
  const [authenticated, setAuthenticated] = useState<boolean>(
    user.token !== undefined
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (user.token === undefined) {
      setAuthenticated(false);
      navigate("/auth");
    }
  }, [user.token, navigate]);

  if (authenticated) return <App />;
  return <Loading />;
}
