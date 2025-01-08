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
}

const EditModal: React.FC<CustomModalProps> = ({
  role,
  otdel,
  isOpen,
  onRequestClose,
  title,
  content,
  footerContent,
  customStyles,
}) => {
  //   console.log(otdel);

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    fio: "",
    roleId: 0,
    otdelId: 0,
  });

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

          height: "480px",
          margin: "auto",
          ...customStyles,
        },
      }}
    >
      <div className="relative">
        <div className="flex flex-col gap-5 mt-8">
          <Input placeholder="foydalanuvchi ismi" name="userName" />

          <Input placeholder="Parol" name="password" />

          <Input placeholder="FIO" name="fio" />
          <div>
            <div>
              <p className="mb-1 ml-[2px]">Roli</p>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Roli" />
                </SelectTrigger>
                <SelectContent className="bg-white shadow-md">
                  <SelectItem value="Roli">Roli</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mt-3">
              <p className="mb-1 ml-[2px]">Otdel</p>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Otdel" />
                </SelectTrigger>
                <SelectContent className="bg-white shadow-md">
                  <SelectItem value="Otdel"></SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button className="bg-cyan-700 text-white w-full max-w-[100px] block">
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
