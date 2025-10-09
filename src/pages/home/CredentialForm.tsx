import { memo, useState } from "react";
import Input from "../../components/Input/Input";
import userStore from "../../stores/user-store";
import type {
  CreateCredential,
  Credential,
  CredentialErrors,
} from "../../types/credential";
import Button from "../../components/Button/Button";
import { useCredentialActions } from "../../stores/credential-store";
import ky, { HTTPError } from "ky";
import type { ServerResponse } from "../../types/server";

type CredentialFormProps = {
  onSaveCredential: (c: Credential) => void;
  id?: string;
  credential?: CreateCredential;
};

const CredentialForm: React.FC<CredentialFormProps> = (props) => {
  const [errors, setErrors] = useState<CredentialErrors>({});
  const [serverError, setServerError] = useState("");
  const user = userStore((s) => s.user);
  const { addCredential } = useCredentialActions();

  const validateNotEmpty = (ev: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    if (value.trim().length === 0) {
      setErrors((pre) => ({ ...pre, [name]: `${name} cannot be blank` }));
    } else {
      setErrors((pre) => ({ ...pre, [name]: undefined }));
    }
  };

  const submit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const formData = new FormData(ev.currentTarget);
    const credential: CreateCredential = {
      user_id: user.id!,
      domain: formData.get("domain")!.toString(),
      email: formData.get("email")!.toString(),
      password: formData.get("password")!.toString(),
    };

    try {
      let resp: ServerResponse;
      if (props.id) {
        resp = await ky
          .patch(`http://localhost:8080/credentials/${props.id}`, {
            json: { ...credential, id: props.id },
            headers: { Authorization: user.token },
          })
          .json<ServerResponse>();

        if (resp.status === "success") {
          props.onSaveCredential(resp.payload.credential);
        }
      } else {
        resp = await ky
          .post("http://localhost:8080/credentials/", {
            json: credential,
            headers: { Authorization: user.token },
          })
          .json<ServerResponse>();
        if (resp.status === "success") {
          addCredential(resp.payload.credential);
          props.onSaveCredential(resp.payload.credential);
        }
      }
    } catch (e) {
      if (e instanceof HTTPError) {
        const resp = await e.response.json();
        setServerError(resp.message);
      }
    }
  };

  return (
    <form onSubmit={submit}>
      <Input
        label="Domain name"
        name="domain"
        type="url"
        placeholder="https://www.example.com"
        onBlur={validateNotEmpty}
        hasError={errors.domain !== undefined}
        supportingText={errors.domain}
        defaultValue={props.credential?.domain}
      />
      <div style={{ margin: "16px 0" }}></div>
      <Input
        label="Email Address"
        name="email"
        type="email"
        placeholder="test@example.com"
        onBlur={validateNotEmpty}
        hasError={errors.email !== undefined}
        supportingText={errors.email}
        defaultValue={props.credential?.email}
      />
      <div style={{ margin: "16px 0" }}></div>
      <Input
        label="Password"
        name="password"
        type="password"
        onBlur={validateNotEmpty}
        hasError={errors.password !== undefined}
        supportingText={errors.password}
        defaultValue={props.credential?.password}
      />
      <div style={{ margin: "16px 0" }}></div>
      {serverError && <p>{serverError}</p>}
      <div style={{ margin: "16px 0" }}></div>
      <div style={{ width: "fit-content", marginLeft: "auto" }}>
        <Button>{props.id ? "Update" : "Add"}</Button>
      </div>
    </form>
  );
};

export default memo(CredentialForm);
