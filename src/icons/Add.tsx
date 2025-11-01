import { memo } from "react";
import { type IconProps, defaultIconProps } from ".";

function Add(props: IconProps) {
  const {
    size = defaultIconProps.size,
    color = defaultIconProps.color,
    ...rest
  } = props;
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        height={`${size}px`}
        width={`${size}px`}
        fill={color}
        {...rest}
      >
        <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
      </svg>
    </>
  );
}

export default memo(Add);
