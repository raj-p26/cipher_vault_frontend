import { useEffect, useRef } from "react";
import "./Checkbox.css";
import Check from "../../icons/Check";

type CheckboxProps = {
  checked?: boolean;
  onChange?: (newValue: boolean, name: string) => void;
  disabled?: boolean;
  label?: string;
  name: string;
};

export default function Checkbox(props: CheckboxProps) {
  const checkboxRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLParagraphElement | null>(null);

  const { checked, label, name, onChange } = props;

  useEffect(() => {
    const ref = checkboxRef.current;
    const pRef = labelRef.current;
    const onKeydown = (ev: KeyboardEvent) => {
      if (ev.key === " " && onChange) onChange(!checked, name);
    };

    const onClick = () => {
      if (onChange) onChange(!checked, name);
    };

    if (ref) {
      ref.addEventListener("keydown", onKeydown);
      ref.addEventListener("click", onClick);
    }

    if (pRef) pRef.addEventListener("click", onClick);

    return () => {
      if (ref) {
        ref.removeEventListener("keydown", onKeydown);
        ref.removeEventListener("click", onClick);
      }

      if (pRef) pRef.removeEventListener("click", onClick);
    };
  }, [checked, name, onChange]);

  return (
    <div
      style={{
        display: label && "flex",
        alignItems: label && "center",
        gap: label && "6px",
        width: "fit-content",
      }}
    >
      <div
        className="checkbox-target-area"
        ref={checkboxRef}
        tabIndex={onChange && 0}
      >
        <div className={`checkbox-container ${checked ? "checked" : ""}`}>
          {checked && <Check size={18} />}
        </div>
      </div>
      {label && (
        <p
          ref={labelRef}
          style={{ font: "var(--label-large)", cursor: "default" }}
        >
          {label}
        </p>
      )}
    </div>
  );
}
