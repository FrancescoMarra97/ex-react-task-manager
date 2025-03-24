import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ title, content, show, onClose, onConfirm, confirmText = "Conferma", isDelete = false }) => {
    if (!show) return null

    return ReactDOM.createPortal(
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h5>{title}</h5>
                </div>
                <div className="modal-body">
                    <p>{content}</p>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={onClose}>
                        Annulla
                    </button>
                    <button className={`btn ${isDelete ? 'btn-danger' : 'btn-success'}`} onClick={onConfirm}>
                        {confirmText}
                    </button>
                </div>
            </div>
        </div >,
        document.getElementById("modal-root")
    );
};

export default Modal;
