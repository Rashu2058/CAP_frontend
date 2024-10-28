// ErrorPopup.tsx
import React from "react";

type ErrorPopupProps = {
  message: string;
  onClose: () => void;
};

const ErrorPopup: React.FC<ErrorPopupProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-4 left-4 bg-red-600 text-white p-4 rounded shadow-md z-50">
      <p>{message}</p>
      <button
        onClick={onClose}
        className="text-sm mt-2 text-gray-100 underline"
      >
        Close
      </button>
    </div>
  );
};

export default ErrorPopup;
