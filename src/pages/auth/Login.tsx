import { memo, useCallback, useState } from "react";
import ky, { HTTPError } from "ky";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import userStore from "../../stores/user-store";
import type { LoginUser, LoginErrors } from "../../types/user";
import type { ServerResponse } from "../../types/server";

function Login(props: { onShowRegister: () => void }) {
  const [errors, setErrors] = useState<LoginErrors>({});
  const [serverError, setServerError] = useState<string | null>();
  const setUser = userStore((s) => s.setUser);

  const loginUser = useCallback(
    async (user: LoginUser) => {
      try {
        const response = await ky
          .post("http://localhost:8080/auth/login", {
            json: user,
          })
          .json<ServerResponse>();

        if (response.status === "success") {
          const user = {
            id: response.payload["user"]["id"],
            username: response.payload["user"]["username"],
            email: response.payload["user"]["email"],
            token: response.payload["token"],
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
    },
    [setUser]
  );

  const validateAndSetError = useCallback((formObject: LoginUser): boolean => {
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
  }, []);

  const validateNotEmpty = useCallback(
    (ev: React.FocusEvent<HTMLInputElement>) => {
      const { name, value } = ev.target;
      if (value.trim().length === 0) {
        setErrors((pre) => ({ ...pre, [name]: `${name} cannot be blank` }));
      } else {
        setErrors((pre) => ({ ...pre, [name]: undefined }));
      }
    },
    []
  );

  const submit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);
    const formValues: LoginUser = {
      email: formData.get("email")!.toString(),
      password: formData.get("password")!.toString(),
    };

    if (!validateAndSetError(formValues)) {
      loginUser(formValues);
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
        Login
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
          Login
        </Button>
        <Button variant="text" onClick={props.onShowRegister}>
          New to CipherVault?
        </Button>
      </div>
    </>
  );
}

export default memo(Login);
