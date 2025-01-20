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
import { X } from "lucide-react";
import React from "react";
import Modal from "react-modal";

// Убедитесь, что модальное окно связано с элементом root вашего приложения
Modal.setAppElement("#root");

interface CustomModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  organizationCreate: () => void;
  customStyles?: React.CSSProperties;
  setOrganizationName?: any;
  organizationName?: string;
}

const OrganizationModal: React.FC<CustomModalProps> = ({
  isOpen,
  onRequestClose,
  customStyles,
  organizationCreate,
  setOrganizationName,
  organizationName,
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
          //   maxHeight: "400px",
          height: "200px",
          margin: "auto",
          ...customStyles,
        },
      }}
      //   className="min-h-[200px] bg-white mx-auto"
    >
      <div className=" relative">
        <div className="flex flex-col gap-5 mt-8">
          <Input
            placeholder="Nomi"
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
          />
        </div>

        <div className="flex justify-end mt-6">
          <Button
            onClick={organizationCreate}
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

export default OrganizationModal;
