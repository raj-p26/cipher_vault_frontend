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
import Dropdown from "../../components/Dropdown/Dropdown";
import { BASE_URL, CRED_OPTIONS } from "../../utils";

type CredentialFormProps = {
  onSaveCredential: (c: Credential) => void;
  id?: string;
  credential?: CreateCredential;
};

const CredentialForm: React.FC<CredentialFormProps> = (props) => {
  const { credential: c } = props;
  const initialSelection = c
    ? { name: c.cred_type, value: CRED_OPTIONS[c.cred_type] }
    : undefined;

  const [errors, setErrors] = useState<CredentialErrors>({});
  const [serverError, setServerError] = useState("");
  const user = userStore((s) => s.user);
  const { addCredential } = useCredentialActions();
  const [credType, setCredType] = useState<
    { name: string; value: string } | undefined
  >(initialSelection);

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

    if (credType === undefined) {
      setServerError("Credential Type must be set");
      return;
    }

    const formData = new FormData(ev.currentTarget);
    const credential: CreateCredential = {
      user_id: user.id!,
      cred_type: credType!.name,
      cred_value: formData.get("cred_value")!.toString(),
      password: formData.get("password")!.toString(),
      comment: formData.get("comment")!.toString(),
    };

    try {
      let resp: ServerResponse;
      if (props.id) {
        resp = await ky
          .patch(`${BASE_URL}/credentials/${props.id}`, {
            json: { ...credential, id: props.id },
            headers: { Authorization: user.token },
          })
          .json<ServerResponse>();

        if (resp.status === "success") {
          props.onSaveCredential(resp.payload.credential);
        }
      } else {
        resp = await ky
          .post(`${BASE_URL}/credentials/`, {
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
    <form onSubmit={submit} noValidate>
      <Dropdown
        label="Credential Type"
        items={CRED_OPTIONS}
        selected={credType?.name}
        onSelect={(name, value) => setCredType({ name, value })}
      />
      <div style={{ margin: "16px 0" }}></div>
      <Input
        label="Credential Value"
        name="cred_value"
        defaultValue={props.credential?.cred_value}
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
      <Input
        label="Comment"
        name="comment"
        type="text"
        defaultValue={props.credential?.comment}
      />
      <div style={{ margin: "16px 0" }}></div>
      {serverError && <p className="server-error-label">{serverError}</p>}
      <div style={{ margin: "16px 0" }}></div>
      <div style={{ width: "fit-content", marginLeft: "auto" }}>
        <Button variant="filled">{props.id ? "Update" : "Add"}</Button>
      </div>
    </form>
  );
};

export default memo(CredentialForm);
