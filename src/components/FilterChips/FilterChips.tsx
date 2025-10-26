import { memo } from "react";
import "./FilterChips.css";

type ChipsProps = {
  items: Record<string, any>;
  selected?: string;
  onSelect: (key: string, value: any) => void;
  variant?: "elevated" | "outlined";
};

function Chips(props: ChipsProps) {
  const { items, variant = "outlined", selected } = props;
  return (
    <div className="chip-container">
      {Object.entries(items).map(([k, v]) => (
        <div
          key={k}
          className={`chip ${variant} ${
            selected === k ? "selected" : ""
          }`.trim()}
          tabIndex={0}
          onClick={() => props.onSelect(k, v)}
        >
          {v}
        </div>
      ))}
    </div>
  );
}

export default memo(Chips);
