import { memo } from "react";
import { useCredentials } from "../../stores/credential-store";
import CredentialItem from "./CredentialItem";

function CredentialList() {
  const credentials = useCredentials();
  const pinned = credentials.filter((c) => c.pinned === 1);

  if (credentials.length === 0) {
    return (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <p style={{ font: "var(--title-large)" }}>No credentials created yet</p>
      </div>
    );
  }

  return (
    <>
      {pinned.length > 0 && (
        <>
          <h2 style={{ font: "var(--display-small)" }}>Pinned</h2>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {pinned.map((c) => (
              <CredentialItem cred={c} key={c.id} />
            ))}
          </div>
          <hr />
        </>
      )}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {credentials.map((c) => (
          <CredentialItem cred={c} key={c.id} />
        ))}
      </div>
    </>
  );
}

export default memo(CredentialList);
