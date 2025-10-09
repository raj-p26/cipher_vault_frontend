import Add from "./Add";
import DarkMode from "./DarkMode";
import LightMode from "./LightMode";
import Password from "./Password";

type IconProps = { size?: number; color?: string };

const defaultIconProps: IconProps = { size: 24, color: "currentColor" };

export { Add, DarkMode, LightMode, Password, type IconProps, defaultIconProps };
