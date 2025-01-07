// CustomModal.tsx

import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui";
import { addClass } from "../../redux/slice/treeSlice";
import { X } from "lucide-react";
import React, { useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";

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

const AddModal: React.FC<CustomModalProps> = ({
  isOpen,
  onRequestClose,
  title,
  content,
  footerContent,
  customStyles,
}) => {
  const dispatch = useDispatch();
  const [className, setClassName] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClassName(e.target.value);
  };

  const handleSubmit = () => {
    if (className.trim()) {
      dispatch(addClass({ title: className, path: "/" })); // Отправляем данные в store
      setClassName(""); // Очищаем поле ввода после отправки
      onRequestClose(); // Закрываем модальное окно
    }
  };

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
          height: "180px",
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
            value={className}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex justify-end mt-6">
          <Button
            className="bg-cyan-700 text-white w-full max-w-[100px] block"
            onClick={handleSubmit}
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

export default AddModal;
