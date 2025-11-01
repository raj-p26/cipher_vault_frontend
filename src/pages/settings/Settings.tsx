import { useState } from "react";
import Button from "../../components/Button/Button";
import Switch from "../../components/Switch/Switch";
import themeStore from "../../stores/theme-store";
import userStore from "../../stores/user-store";
import Dialog from "../../components/Dialog/Dialog";
import Input from "../../components/Input/Input";
import ky, { HTTPError } from "ky";
import { BASE_URL } from "../../utils";
import type { ServerResponse } from "../../types/server";
import ChangeUsername from "./ChangeUsername";
import "./Settings.css";

function Profile() {
  const theme = themeStore((s) => s.theme);
  const toggleTheme = themeStore((s) => s.toggleTheme);
  const user = userStore((s) => s.user);
  const setUser = userStore((s) => s.setUser);

  const [changePassword, setChangePassword] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const logout = () => {
    localStorage.removeItem("user");
    setUser({});
  };

  const submit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);

    const currentPass = formData.get("currentPassword")!.toString();
    const newPass = formData.get("newPassword")!.toString();
    const confirmPass = formData.get("confirmNewPassword")!.toString();

    if (currentPass.trim().length === 0) {
      setError("Current password cannot be blank");
      return;
    }

    if (newPass.trim().length === 0) {
      setError("New password cannot be blank");
      return;
    }

    if (newPass !== confirmPass) {
      setError("New password and confirmation password did not match");
      return;
    }

    try {
      await ky
        .patch(`${BASE_URL}/auth/update-password`, {
          headers: { Authorization: user.token },
          json: { oldPassword: currentPass, newPassword: newPass },
        })
        .json<ServerResponse>();

      setChangePassword(false);
    } catch (e) {
      console.error(e);
      if (e instanceof HTTPError) {
        const resp = await e.response.json();
        setError(resp["message"]);
      }
    }
  };

  return (
    <>
      <div className="profile-container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "56px",
          }}
        >
          <label style={{ font: "var(--headline-small)" }}>Dark Mode</label>
          <Switch active={theme === "dark"} onToggle={() => toggleTheme()} />
        </div>
        <p style={{ font: "var(--headline-small)" }}>
          Logged in using: {user.email}
        </p>
        <ChangeUsername />
        <div>
          <Button variant="text" onClick={() => setChangePassword(true)}>
            Change password
          </Button>
        </div>
        <div>
          <Button variant="text" color="error" onClick={logout}>
            Logout
          </Button>
        </div>
      </div>

      <Dialog
        active={changePassword}
        onClose={() => {
          setError(undefined);
          setChangePassword(false);
        }}
        title="Change Password"
      >
        <form onSubmit={submit} noValidate>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <Input
              name="currentPassword"
              label="Current password"
              type="password"
            />
            <Input name="newPassword" label="New password" type="password" />
            <Input
              name="confirmNewPassword"
              label="Confirm new password"
              type="password"
            />
            {error && <p className="error-label">{error}</p>}
            <Button variant="filled">Change</Button>
          </div>
        </form>
      </Dialog>
    </>
  );
}

export default Profile;
