import { defaultIconProps, type IconProps } from ".";

const Unpin: React.FC<IconProps> = (props) => {
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
      <path d="M680-840v80h-40v327L313-760l-33-33v-47h400ZM480-40l-40-40v-240H240v-80l80-80v-46L56-792l56-56 736 736-58 56-264-264h-6v240l-40 40Z" />
    </svg>
  );
};

export default Unpin;
