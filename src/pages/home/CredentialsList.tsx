import { memo, useMemo, useState } from "react";
import { useCredentials } from "../../stores/credential-store";
import CredentialItem from "./CredentialItem";
import "./CredentialsList.css";
import FilterChips from "../../components/FilterChips/FilterChips";
import { CRED_OPTIONS } from "../../utils";

function CredentialList() {
  const credentials = useCredentials();
  const [filter, setFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return [...credentials];
    return credentials.filter((c) => c.cred_type === filter);
  }, [credentials, filter]);

  const pinned = filtered.filter((c) => c.pinned === 1);

  const emptyBlock = (
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

  if (credentials.length === 0) {
    return emptyBlock;
  }

  return (
    <>
      <FilterChips
        items={{ all: "All", ...CRED_OPTIONS }}
        onSelect={(k) => setFilter(k)}
        selected={filter}
      />
      {pinned.length > 0 && (
        <>
          <h2 style={{ font: "var(--display-small)" }}>Pinned</h2>
          <div className="credentials-grid">
            {pinned.map((c) => (
              <CredentialItem cred={c} key={c.id} />
            ))}
          </div>
          <hr />
        </>
      )}
      {filtered.length > 0 ? (
        <div className="credentials-grid">
          {filtered.map((c) => (
            <CredentialItem cred={c} key={c.id} />
          ))}
        </div>
      ) : (
        emptyBlock
      )}
    </>
  );
}

export default memo(CredentialList);
