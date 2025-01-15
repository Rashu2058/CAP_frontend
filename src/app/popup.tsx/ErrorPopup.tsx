import React, { useEffect, useState } from "react";

type ErrorPopupProps = {
  message: string;
  onClose: () => void;
};

const ErrorPopup: React.FC<ErrorPopupProps> = ({ message, onClose }) => {
  const [slideOut, setSlideOut] = useState(false);

  useEffect(() => {
    if (message) {
      const slideOutTimer = setTimeout(() => {
        setSlideOut(true);
      }, 2000);

      const closeTimer = setTimeout(onClose, 3000);

      return () => {
        clearTimeout(slideOutTimer);
        clearTimeout(closeTimer);
      };
    }
  }, [message, onClose]);

  if (!message) return null;

  const containerStyle: React.CSSProperties = {
    position: "fixed",
    bottom: "25px",
    left: "20px",
    backgroundColor: "#fdecea", // Light red background
    color: "#dc3545", // Red text for error
    border: "1px solid #dc3545", // Border matching the text color
    padding: "12px 16px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: "400px",
    transform: slideOut ? "translateY(20px)" : "translateY(0)",
    opacity: slideOut ? 0 : 1,
    transition: "transform 0.4s ease, opacity 0.4s ease",
    zIndex: 1000,
  };

  const messageStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "16px",
    fontWeight: "500",
  };

  const closeButtonStyle: React.CSSProperties = {
    background: "none",
    border: "none",
    color: "#dc3545",
    fontSize: "16px",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <div style={messageStyle}>
        <span
          style={{
            display: "flex",
            width: "20px",
            height: "20px",
            backgroundColor: "#dc3545",
            color: "white",
            borderRadius: "50%",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          ✖
        </span>
        {message}
      </div>
      <button onClick={onClose} style={closeButtonStyle}>
        ✖
      </button>
    </div>
  );
};

export default ErrorPopup;
