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
  userInfo: () => Promise<void>;
}

const AddModal: React.FC<CustomModalProps> = ({
  role,
  otdel,
  isOpen,
  onRequestClose,
  userInfo,
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Токен не найден");
      return;
    }
    try {
      const response = await axios.post(
        "http://147.45.107.174:5000/api/user/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Пользователь успешно добавлен!");
        setFormData({
          userName: "",
          password: "",
          fio: "",
          roleId: 0,
          otdelId: 0,
        });
        await userInfo();
        onRequestClose();
      }
    } catch (error) {
      console.error("Ошибка при создании пользователя:", error);
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

          height: "480px",
          margin: "auto",
          ...customStyles,
        },
      }}
    >
      <div className="relative">
        <div className="flex flex-col gap-5 mt-8">
          <Input
            placeholder="foydalanuvchi ismi"
            name="userName"
            value={formData.userName}
            onChange={handleInputChange}
          />

          <Input
            placeholder="Parol"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />

          <Input
            placeholder="FIO"
            name="fio"
            value={formData.fio}
            onChange={handleInputChange}
          />
          <div>
            <div>
              <p className="mb-1 ml-[2px]">Roli</p>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("roleId", Number(value))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Roli" />
                </SelectTrigger>
                <SelectContent className="bg-white shadow-md">
                  {role?.map((item) => {
                    return (
                      <SelectItem value={String(item.id)} key={item?.id}>
                        {item?.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            <div className="mt-3">
              <p className="mb-1 ml-[2px]">Otdel</p>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("otdelId", Number(value))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Otdel" />
                </SelectTrigger>
                <SelectContent className="bg-white shadow-md">
                  {otdel?.map((item) => {
                    return (
                      <SelectItem value={String(item.id)} key={item?.id}>
                        {item?.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
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
