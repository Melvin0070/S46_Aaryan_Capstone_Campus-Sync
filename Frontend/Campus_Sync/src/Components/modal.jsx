import React from "react";
import "./modal.css";

const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  confirmButtonText,
  showCancelButton,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p className="modal-message">{message}</p>
        <div className="modal-buttons">
          {showCancelButton && (
            <button onClick={onClose} className="cancel-button">
              Cancel
            </button>
          )}
          {onConfirm && (
            <button onClick={onConfirm} className="confirm-button">
              {confirmButtonText}
            </button>
          )}
          {!showCancelButton && (
            <div id="ok-button-div">
              <button onClick={onClose} className="ok-button">
                OK
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
