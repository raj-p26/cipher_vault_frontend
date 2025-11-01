import { memo, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./Dialog.css";

type DialogProps = {
  title?: string;
  children?: React.ReactNode;
  active: boolean;
  onClose?: () => void;
};

const Dialog: React.FC<DialogProps> = (props) => {
  const { title, active, onClose } = props;
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

    if (onClose) {
      setVisible(false);
      setTimeout(() => onClose(), 100);
    }
  };

  const content = (
    <>
      <div
        className={`dialog-scrim ${visible ? "visible" : ""}`}
        onClick={close}
        aria-hidden
      ></div>
      <div className={`dialog ${visible ? "visible" : ""}`}>
        {title && (
          <h1 style={{ font: "var(--headline-large)", marginBottom: 16 }}>
            {title}
          </h1>
        )}
        <div className="dialog-body">{props.children}</div>
      </div>
    </>
  );
  return createPortal(
    active ? content : undefined,
    document.getElementById("dialog-portal")!
  );
};

export default memo(Dialog);
