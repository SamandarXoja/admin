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

const DirectoryModal: React.FC<CustomModalProps> = ({
  isOpen,
  onRequestClose,
  title,
  content,
  footerContent,
  customStyles,
  handleSubmit,
  setCategoryName,
  categoryName,
  createDirectory,
  setDirectoryName,
  directoryName,
  directoryTitle,
  setDirectoryTitle,
  setDirectoryId,
  directory,
}) => {
  const handleSelectChange = (value) => {
    const selectedItem = directory.find((item) => item.name === value);
    if (selectedItem) {
      setDirectoryId(selectedItem.id);
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
          height: "350px",
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
            value={directoryName}
            onChange={(e) => setDirectoryName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-5 mt-8">
          <Input
            placeholder="Title"
            value={directoryTitle}
            onChange={(e) => setDirectoryTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-5 mt-8">
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger className="max-w-[700px]">
              <SelectValue placeholder="Tanglang" />
            </SelectTrigger>
            <SelectContent className="bg-white shadow-md">
              {directory?.map((item) => {
                return (
                  <SelectItem value={item.name} key={item.id}>
                    {item.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end mt-6">
          <Button
            onClick={createDirectory}
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

export default DirectoryModal;
