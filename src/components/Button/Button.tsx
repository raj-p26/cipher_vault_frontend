import React, { memo } from "react";
import "./Button.css";

type ButtonTypes = "filled" | "elevated" | "tonal" | "outlined" | "text";
type ButtonSizes = "xs" | "sm" | "md" | "lg" | "xl";
type ButtonShapes = "square" | "rounded";
type ButtonColors = "primary" | "secondary" | "tertiary" | "error";

type ButtonProps = {
  children?: React.ReactNode;
  variant?: ButtonTypes;
  size?: ButtonSizes;
  shape?: ButtonShapes;
  color?: "primary" | "secondary" | "tertiary" | "error";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const getButtonColor = (
  variant: ButtonTypes,
  color: ButtonColors
): [string | undefined, string | undefined] => {
  switch (variant) {
    case "filled":
      return [`--${color}`, `--on-${color}`];
    case "elevated":
      return [`--surface-container-low`, `--${color}`];
    case "outlined":
      return [undefined, `--${color}`];
    case "text":
      return [undefined, `--${color}`];
    case "tonal":
      return [undefined, undefined];
  }
};

const Button = (props: ButtonProps) => {
  const {
    variant = "filled",
    size = "md",
    color = "primary",
    shape = "rounded",
    ...rest
  } = props;
  const className = `${variant} ${size} ${shape} base`;
  const [bgColorVar, colorVar] = getButtonColor(variant, color);

  return (
    <button
      className={className}
      style={{
        backgroundColor:
          bgColorVar &&
          `light-dark(rgb(var(${bgColorVar})), rgb(var(${bgColorVar}-dark)))`,
        color:
          color &&
          `light-dark(rgb(var(${colorVar})), rgb(var(${colorVar}-dark)))`,
      }}
      {...rest}
    >
      {props.children}
    </button>
  );
};

export default memo(Button);
