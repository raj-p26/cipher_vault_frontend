import { memo } from "react";
import "./FloatingActionButton.css";

type FABProps = {
  variant?: "tonal" | "base";
  size?: "baseline" | "medium" | "large";
  color?: "primary" | "secondary" | "tertiary";
  label?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const FloatingActionButton: React.FC<FABProps> = (props) => {
  const {
    variant = "base",
    size = "baseline",
    color = "primary",
    label,
    children,
    ...rest
  } = props;
  const fabBgColor = `--${variant === "base" ? color : `${color}-container`}`;
  const fabTextColor = `--on-${
    variant === "base" ? color : `${color}-container`
  }`;

  let fabLabelFont = "";
  switch (size) {
    case "baseline":
      fabLabelFont = "var(--title-medium)";
      break;
    case "medium":
      fabLabelFont = "var(--title-large)";
      break;
    case "large":
      fabLabelFont = "var(--display-small)";
      break;
  }

  return (
    <button
      style={{
        backgroundColor: `light-dark(rgb(var(${fabBgColor})), rgb(var(${fabBgColor}-dark)))`,
        color: `light-dark(rgb(var(${fabTextColor})), rgb(var(${fabTextColor}-dark)))`,
      }}
      className={`fab-${size} fab`}
      {...rest}
    >
      {children}
      {label && (
        <p className="fab-label" style={{ font: fabLabelFont }}>
          {label}
        </p>
      )}
    </button>
  );
};

export default memo(FloatingActionButton);
