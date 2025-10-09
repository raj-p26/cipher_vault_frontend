import { defaultIconProps, type IconProps } from ".";

export default function Check(props: IconProps) {
  const { size = defaultIconProps.size, color = defaultIconProps.color } =
    props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      viewBox="0 -960 960 960"
      width={size}
      fill={color}
    >
      <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
    </svg>
  );
}
