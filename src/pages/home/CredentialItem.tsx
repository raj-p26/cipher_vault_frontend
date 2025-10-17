import { memo, useState } from "react";
import { useCredentialActions } from "../../stores/credential-store";
import type { Credential } from "../../types/credential";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import ky from "ky";
import userStore from "../../stores/user-store";
import Dialog from "../../components/Dialog/Dialog";
import CredentialForm from "./CredentialForm";
import { BASE_URL } from "../../utils";

type CredentialProps = { cred: Credential };

function CredentialItem(props: CredentialProps) {
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const { cred: c } = props;
  const { removeCredential, updateCredential } = useCredentialActions();
  const user = userStore((s) => s.user);

  const remove = async () => {
    try {
      await ky.delete(`${BASE_URL}/credentials/${c.id}`, {
        headers: { Authorization: user.token },
      });

      removeCredential(c);
    } catch (e) {
      alert("Something went wrong");
      console.error(e);
    }
  };

  return (
    <>
      <Card>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <div>
            <p style={{ font: "var(--title-large)", marginBottom: "1rem" }}>
              {c.cred_value}
            </p>
            <p style={{ font: "var(--body-large)", marginBottom: "1rem" }}>
              {c.password}
            </p>
            {c.inserted_at !== c.updated_at && (
              <p style={{ font: "var(--label-small)" }}>(Edited)</p>
            )}
          </div>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Button variant="text" color="error" onClick={remove}>
              Delete
            </Button>
            <Button variant="tonal" onClick={() => setShowDialog(true)}>
              Edit
            </Button>
          </div>
        </div>
      </Card>

      <Dialog
        active={showDialog}
        onClose={() => setShowDialog(false)}
        title="Update credentials"
      >
        <CredentialForm
          id={c.id}
          credential={{ ...c }}
          onSaveCredential={(c) => {
            updateCredential(c);
            setShowDialog(false);
          }}
        />
      </Dialog>
    </>
  );
}

export default memo(CredentialItem);
