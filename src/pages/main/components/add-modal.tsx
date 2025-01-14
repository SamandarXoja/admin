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
  title: string;
  content: React.ReactNode;
  footerContent: React.ReactNode;
  customStyles?: React.CSSProperties;
  handleSubmit?: () => void; // Сделано необязательным
  setCategoryName?: any;
  categoryName?: string;
}

const AddModal: React.FC<CustomModalProps> = ({
  isOpen,
  onRequestClose,
  customStyles,
  handleSubmit,

  number,
  name,
  measurement,
  price,

  setNumber,
  setName,
  setMeasurement,
  setPrice,
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
          height: "450px",
          margin: "auto",
          ...customStyles,
        },
      }}
      //   className="min-h-[200px] bg-white mx-auto"
    >
      <div className=" relative">
        <div className="flex flex-col  mt-4">
          <span className="mb-1">Number</span>
          <Input
            placeholder="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <div className="flex flex-col  mt-4">
          <span className="mb-1">Name</span>
          <Input
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col  mt-4">
          <span className="mb-1">Measurement</span>
          <Input
            placeholder="measurement"
            value={measurement}
            onChange={(e) => setMeasurement(e.target.value)}
          />
        </div>
        <div className="flex flex-col  mt-4">
          <span className="mb-1">price</span>
          <Input
            placeholder="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="flex justify-end mt-6">
          <Button
            onClick={handleSubmit}
            className="bg-cyan-700 text-white w-full max-w-[100px] block"
          >
            Send
          </Button>
        </div>
        <button
          onClick={onRequestClose}
          className="absolute right-[-20px] top-[-37px]"
        >
          <X color="#B22222" />
        </button>
      </div>
    </Modal>
  );
};

export default AddModal;
