import { memo, useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import Checkbox from "../../components/Checkbox/Checkbox";
import Input from "../../components/Input/Input";
import Check from "../../assets/icons/Check";

const NUMS = "0123456789";
const ALPHABETS = "abcdefghijklmnopqrstuvwxyz";
const SPECIAL_CHARS = "~`!@#$%^&*()_-=+\\|{}[];:\"',<.>/?";

const CHARACTERS = NUMS + ALPHABETS + SPECIAL_CHARS;

type PasswordPattern = {
  upcase: boolean;
  nums: boolean;
  specialChars: boolean;
  letters: boolean;
};

const defaultPattern: PasswordPattern = {
  nums: false,
  upcase: false,
  specialChars: false,
  letters: true,
};

function generatePassword(
  args: PasswordPattern = { ...defaultPattern },
  length: number = 8
) {
  let pass = "";
  let allowedChars = CHARACTERS;

  if (!args.letters) allowedChars = allowedChars.replace(ALPHABETS, "");
  if (!args.nums) allowedChars = allowedChars.replace(NUMS, "");
  if (!args.specialChars) {
    allowedChars = allowedChars.replace(SPECIAL_CHARS, "");
  }
  if (args.upcase && !allowedChars.includes(ALPHABETS)) {
    allowedChars += ALPHABETS.toUpperCase();
  }

  for (let i = 0; i < length; i++) {
    const randomIdx = Math.round(Math.random() * (allowedChars.length - 1));
    const currentChar = allowedChars[randomIdx];

    if (!args.upcase) {
      pass += currentChar;
      continue;
    }

    const upcase = Boolean(Math.round(Math.random() * 2));
    if (upcase && ALPHABETS.includes(currentChar)) {
      pass += currentChar.toUpperCase();
    } else {
      pass += currentChar;
    }
  }

  return pass;
}

function GeneratePassword() {
  const [pattern, setPattern] = useState<PasswordPattern>({
    ...defaultPattern,
  });
  const [passwordLength, setPasswordLength] = useState<string>("8");
  const [password, setPassword] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const pass = generatePassword();
    setPassword(pass);
  }, []);

  const setLength = (ev: React.InputEvent<HTMLInputElement>) => {
    const num = ev.currentTarget.value.trim();

    if (Number.isNaN(num) && num !== "") {
      ev.preventDefault();
      return;
    }

    setPasswordLength(num);
  };

  const submit = () => {
    const length = +passwordLength;
    if (length < 6) {
      setError("Minimum password length is 6");
      setTimeout(() => setError(""), 2000);
      return;
    }

    if (length > 80) {
      setError("Maximum password length is 80");
      setTimeout(() => setError(""), 2000);
      return;
    }

    const pass = generatePassword({ ...pattern }, length);

    setPassword(pass);
  };

  const handleCheckboxes = (value: boolean, name: string) => {
    const checked = Object.entries(pattern).filter((p) => p[1]);

    if (checked.length === 1 && value === false) return;
    else setPattern((pre) => ({ ...pre, [name]: value }));
  };

  const copy = async () => {
    setCopied(true);
    await navigator.clipboard.writeText(password);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <>
      {password && (
        <p
          style={{
            font: "var(--title-large)",
            margin: "16px",
            overflowWrap: "break-word",
          }}
        >
          {password}
        </p>
      )}
      <Input
        label="Password Length"
        hasError={error !== ""}
        supportingText={error}
        type="number"
        value={passwordLength}
        onChange={setLength}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginTop: "16px",
        }}
      >
        <Checkbox
          checked={pattern.letters}
          label="Letters"
          name="letters"
          onChange={handleCheckboxes}
        />
        <Checkbox
          checked={pattern.nums}
          label="Numbers"
          name="nums"
          onChange={handleCheckboxes}
        />
        <Checkbox
          checked={pattern.specialChars}
          label="Symbols"
          name="specialChars"
          onChange={handleCheckboxes}
        />
        <Checkbox
          checked={pattern.upcase}
          label="Uppercase"
          name="upcase"
          onChange={handleCheckboxes}
        />
      </div>
      <div
        style={{
          marginTop: "16px",
          display: "flex",
          justifyContent: "end",
          gap: "16px",
        }}
      >
        <Button variant="text" onClick={copy}>
          {copied && <Check />} {copied ? "Copied!" : "Copy"}
        </Button>
        <Button disabled={error !== ""} onClick={submit}>
          Generate
        </Button>
      </div>
    </>
  );
}

export default memo(GeneratePassword);
