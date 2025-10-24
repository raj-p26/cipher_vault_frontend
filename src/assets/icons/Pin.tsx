import { defaultIconProps, type IconProps } from ".";

const Pin: React.FC<IconProps> = (props) => {
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
      <path d="m640-480 80 80v80H520v240l-40 40-40-40v-240H240v-80l80-80v-280h-40v-80h400v80h-40v280Z" />
    </svg>
  );
};

export default Pin;
