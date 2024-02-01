/* eslint-disable react-hooks/rules-of-hooks */
import React, { FC } from "react";
import "./modal.css";

import { ModalProps } from "../../@types/ModalProps";
import RegisterPerson from "../RegisterPeson/RegisterPerson";

const Modal: FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header"></div>

        <div className="btn-close">
          <div className="teste">
            <RegisterPerson />
          </div>
          <button
            className="modal-close-button"
            onClick={() => {
              onClose();
            }}
          >
            Fechar X
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
