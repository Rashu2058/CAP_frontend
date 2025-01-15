import React, { useEffect, useState } from "react";

type SuccessBoxProps = {
  message: string;
  onClose: () => void;
};

const SuccessBox: React.FC<SuccessBoxProps> = ({ message, onClose }) => {
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
    backgroundColor: "#e9f9e9", // Light green background
    color: "#28a745", // Green text for success
    border: "1px solid #28a745", // Border matching the text color
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
    color: "#28a745",
    fontSize: "16px",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <div style={messageStyle}>
        <span
          style={{
            display: "inline-block",
            width: "20px",
            height: "20px",
            backgroundColor: "#28a745",
            borderRadius: "50%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ✓
        </span>
        {message}
      </div>
      <button onClick={onClose} style={closeButtonStyle}>
        ✖
      </button>
    </div>
  );
};

export default SuccessBox;
