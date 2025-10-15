import { useState } from "react";
import { ChevronDown } from "../../assets/icons";
import "./Dropdown.css";

type DropdownProps = {
  /**
   * Items/Options in dropdown menu.
   */
  items: Record<string, any>;
  /**
   * @param name name of the item
   * @param value value of the item
   * @returns nothing
   */
  onSelect: (name: string, value: any) => void;
  /**
   * Key of the item that is selected.
   * It can also be used to set default selection.
   */
  selected?: string;
  label?: string;
};

const Dropdown: React.FC<DropdownProps> = (props) => {
  const { items, label, onSelect, selected } = props;
  const [active, setActive] = useState<boolean>(false);
  const s = selected ? items[selected] : undefined;

  return (
    <>
      <div className={`dropdown-container`.trim()}>
        <div
          className={`dropdown ${active || selected ? "active" : ""}`.trim()}
          onClick={() => setActive((a) => !a)}
          tabIndex={0}
          onBlur={() => setActive(false)}
        >
          <div>
            {label && <p className="dropdown-label">{label}</p>}
            <p style={{ userSelect: "none" }}>{s ?? "Select"}</p>
          </div>
          <ChevronDown className={`dropdown-icon ${active ? "active" : ""}`} />
        </div>
        <div className={`dropdown-menu ${active ? "active" : ""}`.trim()}>
          {Object.entries(items).map(([k, v]) => (
            <div
              onClick={() => {
                setActive(false);
                onSelect(k, v);
              }}
              tabIndex={0}
              key={k}
              className={`dropdown-item ${
                k === selected ? "selected" : ""
              }`.trim()}
            >
              {v}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dropdown;
