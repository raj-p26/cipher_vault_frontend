import { defaultIconProps, type IconProps } from ".";

export const ChevronDown: React.FC<IconProps> = (props) => {
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
      <path d="M480-360 280-560h400L480-360Z" />
    </svg>
  );
};
