import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import userStore from "../../stores/user-store";
import FloatingActionButton from "../../components/Button/FloatingActionButton";
import Add from "../../assets/icons/Add";
import CredentialsList from "./CredentialsList";
import Dialog from "../../components/Dialog/Dialog";
import CredentialForm from "./CredentialForm";
import { useCredentialActions } from "../../stores/credential-store";
import ky from "ky";
import { type ServerResponse } from "../../types/server";
import Loading from "../../components/Loading";
import { Password } from "../../assets/icons";
import GeneratePassword from "./GeneratePassword";
import { BASE_URL } from "../../utils";

type DialogAction = "new-cred" | "gen-pass" | "none";

function Dashboard() {
  const [dialogOption, setDialogOption] = useState<DialogAction>("none");
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { setCredentials } = useCredentialActions();
  const { token } = userStore((s) => s.user);

  useEffect(() => {
    if (token) {
      ky.get(`${BASE_URL}/credentials`, {
        headers: { Authorization: token },
      })
        .json<ServerResponse>()
        .then((resp) => {
          if (resp.status === "success") {
            setCredentials(resp.payload.credentials);
          }
          setLoading(false);
        });
    } else {
      navigate("/auth");
    }
  }, [navigate, setCredentials, token]);

  if (loading) {
    return (
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Loading />
      </div>
    );
  }

  return (
    <>
      <CredentialsList />
      <Dialog
        title={
          dialogOption === "new-cred"
            ? "Create new Credential"
            : "Generate Password"
        }
        active={dialogOption !== "none"}
        onClose={() => setDialogOption("none")}
      >
        {dialogOption === "new-cred" ? (
          <CredentialForm onSaveCredential={() => setDialogOption("none")} />
        ) : (
          <GeneratePassword />
        )}
      </Dialog>
      <div
        style={{
          position: "fixed",
          bottom: "16px",
          right: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
          gap: "16px",
        }}
      >
        <FloatingActionButton
          label="Generate Password"
          size="baseline"
          onClick={() => setDialogOption("gen-pass")}
          color="secondary"
        >
          <Password />
        </FloatingActionButton>
        <FloatingActionButton
          label="Create Credential"
          onClick={() => setDialogOption("new-cred")}
          size="medium"
        >
          <Add size={28} />
        </FloatingActionButton>
      </div>
    </>
  );
}

export default memo(Dashboard);
