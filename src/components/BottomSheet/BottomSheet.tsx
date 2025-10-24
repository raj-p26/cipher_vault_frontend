import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./BottomSheet.css";

type BottomSheetProps = {
  active: boolean;
  height?: string;
  children?: React.ReactNode;
  title?: string;
  onClose: () => void;
};

export default function BottomSheet(props: BottomSheetProps) {
  const { active, height = "50%", onClose, title } = props;
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (active) {
      setTimeout(() => setVisible(true), 0);
    }
  }, [active]);

  useEffect(() => {
    const listener = (ev: KeyboardEvent) => {
      if (ev.code === "Escape" && onClose) {
        setVisible(false);
        setTimeout(() => onClose(), 100);
      }
    };

    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [onClose]);

  const close = () => {
    setVisible(false);

    setVisible(false);
    setTimeout(() => onClose(), 100);
  };

  const content = (
    <>
      <div aria-hidden className="sheet-scrim" onClick={close} />
      <div
        className={`sheet ${visible ? "visible" : ""}`.trim()}
        style={{ height }}
      >
        {title && (
          <h1 style={{ font: "var(--title-large)", marginBottom: "22px" }}>
            {title}
          </h1>
        )}
        {props.children}
      </div>
    </>
  );

  return createPortal(
    active ? content : undefined,
    document.getElementById("dialog-portal")!
  );
}
