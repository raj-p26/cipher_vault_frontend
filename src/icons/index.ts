import Add from "./Add";
import DarkMode from "./DarkMode";
import LightMode from "./LightMode";
import Password from "./Password";
import { ChevronDown } from "./ChevronDown";

type IconProps = {
  size?: number;
  color?: string;
  className?: string;
} & React.AriaAttributes;

const defaultIconProps: IconProps = { size: 24, color: "currentColor" };

export {
  Add,
  ChevronDown,
  DarkMode,
  LightMode,
  Password,
  defaultIconProps,
  type IconProps,
};
