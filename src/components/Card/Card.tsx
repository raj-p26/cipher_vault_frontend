import { memo } from "react";
import "./Card.css";

type CardTypes = "filled" | "outlined" | "elevated";

type CardProps = {
  children?: React.ReactNode;
  type?: CardTypes;
  disabled?: boolean;
  width?: number | string;
  height?: number | string;
};

function Cart(props: CardProps) {
  const { type = "elevated", disabled } = props;

  return (
    <div
      className={`card base ${type} ${disabled ? "disabled" : ""}`}
      style={{
        width: props.width || "fit-content",
        height: props.height,
      }}
    >
      {props.children}
    </div>
  );
}

export default memo(Cart);
