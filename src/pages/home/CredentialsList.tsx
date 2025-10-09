import { memo } from "react";
import { useCredentials } from "../../stores/credential-store";
import CredentialItem from "./CredentialItem";

function CredentialList() {
  const credentials = useCredentials();

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {credentials.map((c) => (
        <CredentialItem cred={c} key={c.id} />
      ))}
    </div>
  );
}

export default memo(CredentialList);
