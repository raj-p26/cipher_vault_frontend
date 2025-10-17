import ky, { HTTPError } from "ky";
import { memo, useState } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import userStore from "../../stores/user-store";
import type { RegisterErrors, RegisterUser } from "../../types/user";
import type { ServerResponse } from "../../types/server";
import { BASE_URL } from "../../utils";

type RegisterProps = { onShowLogin: () => void };

function Register(props: RegisterProps) {
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [serverError, setServerError] = useState<string>();
  const setUser = userStore((s) => s.setUser);

  const registerUser = async (user: RegisterUser) => {
    try {
      const response = await ky
        .post(`${BASE_URL}/auth/register`, { json: user })
        .json<ServerResponse>();

      if (response.status === "success") {
        const user = {
          username: response.payload["user"]["username"],
          id: response.payload["user"]["id"],
          email: response.payload["user"]["email"],
          token: response.payload.token,
        };
        setUser(user);
      } else {
        setServerError(response.message);
      }
    } catch (e) {
      if (e instanceof HTTPError) {
        const err = await e.response.json();
        setServerError(err.message);
      }
    }
  };

  const validateAndSetError = (formObject: RegisterUser) => {
    let invalid = false;

    Object.entries(formObject).forEach(([k, v]) => {
      if (v.toString().trim().length === 0) {
        setErrors((pre) => ({ ...pre, [k]: `${k} cannot be blank` }));
        invalid = true;
        return;
      } else {
        setErrors((pre) => ({ ...pre, [k]: undefined }));
      }
    });

    return invalid;
  };

  const validateNotEmpty = (ev: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    if (value.trim().length === 0) {
      setErrors((pre) => ({ ...pre, [name]: `${name} cannot be blank` }));
    } else {
      setErrors((pre) => ({ ...pre, [name]: undefined }));
    }
  };

  const submit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);
    const formValues: RegisterUser = {
      username: formData.get("username")!.toString(),
      email: formData.get("email")!.toString(),
      password: formData.get("password")!.toString(),
    };

    if (!validateAndSetError(formValues)) {
      registerUser(formValues);
    }
  };

  return (
    <>
      <h1
        style={{
          textAlign: "center",
          margin: "16px 0",
          font: "var(--display-medium)",
        }}
      >
        Register
      </h1>
      <form
        noValidate
        onSubmit={submit}
        id="login-form"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Input
          type="username"
          label="Username"
          name="username"
          supportingText={errors.username}
          hasError={errors.username !== undefined}
          onBlur={validateNotEmpty}
        />
        <div style={{ margin: "16px 0" }}></div>
        <Input
          type="email"
          label="Email"
          name="email"
          supportingText={errors.email}
          hasError={errors.email !== undefined}
          onBlur={validateNotEmpty}
        />
        <div style={{ margin: "16px 0" }}></div>
        <Input
          type="password"
          label="Password"
          name="password"
          supportingText={errors.password}
          hasError={errors.password !== undefined}
          onBlur={validateNotEmpty}
        />
      </form>
      {serverError && (
        <p
          style={{
            color: "light-dark(rgb(var(--error)), rgb(var(--error-dark)))",
            margin: "16px 0",
          }}
        >
          {serverError}
        </p>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "24px",
          gap: "16px",
        }}
      >
        <Button type="submit" form="login-form">
          Create account
        </Button>
        <Button variant="text" onClick={props.onShowLogin}>
          Already have an account?
        </Button>
      </div>
    </>
  );
}

export default memo(Register);
