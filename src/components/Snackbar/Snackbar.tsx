import { useState, useEffect } from "react";
import "./Snackbar.css";

interface SnackbarProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

export const Snackbar = (props: SnackbarProps) => {
  const { message, duration = 3000, onClose } = props;
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (visible) {
      timer = setTimeout(() => {
        onClose();
        setVisible(false);
      }, duration);
    }
    return () => clearTimeout(timer);
  }, [visible, duration]);

  const handleClose = () => {
    setVisible(false);
    onClose();
  };

  return (
    <div className={`snackbar ${visible ? "show" : ""}`}>
      <span className="message">{message}</span>
      <button className="close-btn" onClick={handleClose}>
        &times;
      </button>
    </div>
  );
};
