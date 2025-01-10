// CustomModal.tsx

import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui";
import axios from "axios";
import { X } from "lucide-react";
import React, { useState } from "react";
import Modal from "react-modal";

// Убедитесь, что модальное окно связано с элементом root вашего приложения
Modal.setAppElement("#root");

interface CustomModalProps {
  role: any;
  otdel: any;
  isOpen: boolean;
  onRequestClose: () => void;
  title: string;
  content: React.ReactNode;
  footerContent: React.ReactNode;
  customStyles?: React.CSSProperties;
  userId?: number;
  userInfo: () => Promise<void>;
}

const EditModal: React.FC<CustomModalProps> = ({
  userId,
  role,
  otdel,
  isOpen,
  onRequestClose,
  editCatergoies,
  customStyles,
  userInfo,
  editCatergoiesName,
  setEditCatergoiesName,
}) => {
  function handleInputChange(e) {
    setEditCatergoiesName(e.target.value);

    // console.log();
    
  }

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

          height: "180px",
          margin: "auto",
          ...customStyles,
        },
      }}
    >
      <div className="relative">
        <div className="flex flex-col gap-5 mt-8">
          <Input
            onChange={handleInputChange}
            value={editCatergoiesName}
            placeholder="Shtatka Nomi"
            name="userName"
          />
        </div>

        <div className="flex justify-end mt-6">
          <Button
            onClick={editCatergoies}
            className="bg-cyan-700 text-white w-full max-w-[100px] block"
          >
            Send
          </Button>
        </div>
        <button
          onClick={onRequestClose}
          className="absolute right-[-20px] top-[-50px]"
        >
          <X color="#B22222" />
        </button>
      </div>
    </Modal>
  );
};

export default EditModal;
