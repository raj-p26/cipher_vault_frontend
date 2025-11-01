import { memo } from "react";
import "./Switch.css";

type SwitchProps = {
  active?: boolean;
  onToggle: (pre: boolean) => void;
};

function Switch(props: SwitchProps) {
  const { active, onToggle } = props;
  return (
    <div
      className={`switch-container ${active ? "active" : ""}`.trim()}
      onClick={() => onToggle(!active)}
    >
      <div className={`switch-handle ${active ? "active" : ""}`.trim()}></div>
    </div>
  );
}

export default memo(Switch);
