import { memo, useState } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import userStore from "../../stores/user-store";
import ky, { HTTPError } from "ky";
import { BASE_URL } from "../../utils";

function ChangeUsername() {
  const user = userStore((s) => s.user);
  const setUser = userStore((s) => s.setUser);

  const [newUsername, setNewUsername] = useState<string>(user.username!);

  const handleChange = (ev: React.InputEvent<HTMLInputElement>) => {
    setNewUsername(ev.currentTarget.value);
  };

  const updateUsername = async () => {
    try {
      await ky.patch(`${BASE_URL}/auth/edit`, {
        headers: { Authorization: user.token },
        json: { username: newUsername },
      });

      alert("Username changed");
      setUser({ ...user, username: newUsername });
    } catch (e) {
      console.error(e);
      if (e instanceof HTTPError) {
        const resp = await e.response.json();
        alert(resp["message"]);
      }
    }
  };

  return (
    <div style={{ marginTop: "1rem", display: "flex", gap: "8px" }}>
      <div style={{ flex: 1 }}>
        <Input
          label="Change username"
          value={newUsername}
          onChange={handleChange}
        />
      </div>
      <Button
        disabled={
          newUsername.trim().length === 0 || user.username === newUsername
        }
        onClick={updateUsername}
      >
        Change
      </Button>
    </div>
  );
}

export default memo(ChangeUsername);
