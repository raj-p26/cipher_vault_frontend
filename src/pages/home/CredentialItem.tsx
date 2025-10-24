import { memo, useState } from "react";
import { useCredentialActions } from "../../stores/credential-store";
import type { Credential } from "../../types/credential";
import Card from "../../components/Card/Card";
import ky from "ky";
import userStore from "../../stores/user-store";
import Dialog from "../../components/Dialog/Dialog";
import CredentialForm from "./CredentialForm";
import { BASE_URL, CRED_OPTIONS } from "../../utils";
import Button from "../../components/Button/Button";
import Pin from "../../assets/icons/Pin";
import Unpin from "../../assets/icons/Unpin";

type CredentialProps = { cred: Credential };

function CredentialItem(props: CredentialProps) {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

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

  const togglePin = async () => {
    try {
      const pin = c.pinned === 0 ? 1 : 0;
      await ky.patch(`${BASE_URL}/credentials/${c.id}`, {
        headers: { Authorization: user.token },
        json: { pinned: c.pinned === 0 ? 1 : 0 },
      });
      updateCredential({ ...c, pinned: pin });
    } catch (e) {
      alert("Something went wrong");
      console.error(e);
    }
  };

  return (
    <>
      <Card type="outlined">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Button variant="text" onClick={togglePin}>
            {c.pinned === 0 ? <Pin /> : <Unpin />}
          </Button>
          <div style={{ marginTop: "16px" }}>
            <p style={{ font: "var(--title-large)", marginBottom: "1rem" }}>
              <b>{CRED_OPTIONS[c.cred_type]}:</b> {c.cred_value}
            </p>
            <p style={{ font: "var(--body-large)", marginBottom: "1rem" }}>
              <b>Password:</b> {c.password}
            </p>
            <p style={{ font: "var(--body-large)" }}>
              <b>Comment:</b> {c.comment}
            </p>
            {c.inserted_at !== c.updated_at && (
              <p style={{ font: "var(--label-small)" }}>(Edited)</p>
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: "1rem",
            }}
          >
            <Button
              variant="text"
              color="error"
              onClick={() => setConfirmDelete(true)}
            >
              Delete
            </Button>
            <Button variant="tonal" onClick={() => setShowDialog(true)}>
              Edit
            </Button>
          </div>
        </div>
      </Card>

      <Dialog
        active={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        title="Confirm Delete?"
      >
        <p style={{ font: "var(--body-large)" }}>
          Are you sure you want to delete?
        </p>

        <div style={{ display: "flex", justifyContent: "end", gap: "16px" }}>
          <Button color="error" onClick={remove}>
            Delete
          </Button>
          <Button variant="text" onClick={() => setConfirmDelete(false)}>
            Cancel
          </Button>
        </div>
      </Dialog>

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
