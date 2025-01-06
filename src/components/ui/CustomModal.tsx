// CustomModal.tsx
import React from "react";
import Modal from "react-modal";

// Убедитесь, что модальное окно связано с элементом root вашего приложения
Modal.setAppElement("#root");

interface CustomModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  title: string;
  content: React.ReactNode;
  footerContent: React.ReactNode;
  customStyles?: React.CSSProperties;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onRequestClose,
  title,
  content,
  footerContent,
  customStyles,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.75)",
        },
        content: {
          padding: "20px",
          borderRadius: "10px",
          maxWidth: "500px",
          margin: "auto",
          ...customStyles,
        },
      }}
    >
      <h2>{title}</h2>
      <div>{content}</div>
      <div>{footerContent}</div>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export { CustomModal };
