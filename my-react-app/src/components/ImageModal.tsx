import React from 'react';
import Modal from 'react-modal';
import css from "./ImageModal.module.css";

interface ModalWindowProps {
    isOpen: boolean;
    isClosed: () => void;
    src: string;
    alt_description: string;
    onClick: () => void;
  }
  

Modal.setAppElement("#root");

const ModalWindow: React.FC<ModalWindowProps> = ({
  isOpen,
  isClosed,
  src,
  alt_description,
  onClick,
}) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={isClosed}
      className={css.modal}
      style={customStyles}
    >
      <img
        className={css.img}
        src={src}
        alt={alt_description}
        onClick={onClick}
      />
    </Modal>
  );
}

export default ModalWindow;