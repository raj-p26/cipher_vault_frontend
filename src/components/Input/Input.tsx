import { memo, useRef } from "react";
import "./Input.css";

type InputProps = {
  label?: string;
  name?: string;
  supportingText?: string;
  hasError?: boolean;
  variant?: "filled" | "outlined";
} & React.AllHTMLAttributes<HTMLInputElement>;

function Input(props: InputProps) {
  const {
    label,
    supportingText,
    hasError,
    type,
    placeholder = label,
    variant = "filled",
    ...rest
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const focus = () => inputRef.current?.focus();

  if (type === "file") {
    return <input type={type} {...rest} />;
  }

  return (
    <>
      <div
        className={`input-container ${variant} ${hasError ? "invalid" : ""}`}
        title={label}
        onClick={focus}
      >
        <div>
          <input
            name={props.name}
            ref={inputRef}
            title={label}
            className="input"
            required
            type={type}
            placeholder={placeholder}
            {...rest}
          />
          {label && (
            <label className="input-label" htmlFor={props.name}>
              {label}
            </label>
          )}
        </div>
      </div>
      {supportingText && (
        <div className="leading-container">
          <p className="supporting-label">{supportingText}</p>
        </div>
      )}
    </>
  );
}

export default memo(Input);
