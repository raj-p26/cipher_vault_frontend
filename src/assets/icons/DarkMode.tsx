import { memo } from "react";
import { defaultIconProps, type IconProps } from ".";

const DarkMode: React.FC<IconProps> = (props) => {
  const {
    size = defaultIconProps.size,
    color = defaultIconProps.color,
    ...rest
  } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      viewBox="0 -960 960 960"
      width={size}
      fill={color}
      {...rest}
    >
      <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Z" />
    </svg>
  );
};

export default memo(DarkMode);
