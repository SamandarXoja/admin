import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui";
import AddModal from "./components/add-modal";
import EditModal from "./components/edit-modal";
import ModalTabEdit from "./components/edit-modal";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

const data = [
  { name: "Иван", age: 28 },
  { name: "Анна", age: 24 },
  { name: "Петр", age: 30 },
];

function Home() {
  const [materialData, setMaterialData] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [categoriesId, setCategoriesId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const [currentParentId, setCurrentParentId] = useState(null);

  const [categoriesEditId, setCategoriesEditId] = useState(null);
  const [categoriesParentId, setCategoriesParentId] = useState(null);

  const [editCatergoiesName, setEditCatergoiesName] = useState("");

  async function materialCategory() {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        return;
      }

      const response = await axios.get(
        "http://147.45.107.174:5000/api/material-category",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCurrentData(response.data);
      setMaterialData(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    materialCategory();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openModalEdit = (id, parentId) => {
    setCategoriesEditId(id);
    setCategoriesParentId(parentId);

    setIsModalOpenEdit(true);
  };
  const closeModalEdit = () => setIsModalOpenEdit(false);

  const handleSubmit = async () => {
    if (!categoryName) {
      alert("Пожалуйста, укажите имя категории.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        alert("Токен не найден. Пожалуйста, войдите.");
        return;
      }

      // Добавляем parentId, только если currentParentId существует
      const requestData = {
        name: categoryName,
        ...(currentParentId && { parentId: currentParentId }),
      };

      const response = await axios.post(
        "http://147.45.107.174:5000/api/material-category/create",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      closeModal();
      materialCategory(); // Обновляем данные
      setCategoryName("");
      console.log("Категория успешно создана:", response.data);
    } catch (error) {
      console.error("Ошибка при создании категории:", error.response || error);
      alert(
        `Ошибка при создании категории: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const handleParentClick = (parent) => {
    setCurrentParentId(parent.id);
    if (parent.children && parent.children.length > 0) {
      setCurrentData(parent.children);
    } else {
      alert("Нет дочерних элементов");
    }
  };

  const handleBack = () => {
    setCurrentParentId(null);
    setCurrentData(materialData);
  };

  const editCatergoies = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        alert("Токен не найден. Пожалуйста, войдите.");
        return;
      }

      const response = await axios.put(
        `http://147.45.107.174:5000/api/material-category/${categoriesEditId}`,
        {
          parentId: categoriesParentId,
          name: editCatergoiesName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Category updated successfully:", response.data);
      materialCategory();
      closeModalEdit();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const renderOptions = (data) => {
    return data.map((item) => (
      <div key={item.id}>
        <SelectItem value={item.name} onClick={() => setCategoriesId(item.id)}>
          {item.name}
        </SelectItem>
        {item.children?.length > 0 && renderOptions(item.children)}
      </div>
    ));
  };

  const deleteChildRecursively = (data, id) => {
    return data
      .map((item) => {
        if (item.id === id) return null; // Удаляем элемент
        if (item.children) {
          item.children = deleteChildRecursively(item.children, id); // Рекурсивно удаляем из дочерних
        }
        return item;
      })
      .filter(Boolean); // Удаляем null из массива
  };

  async function deleteCategories(id) {
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("Токен не найден. Пожалуйста, войдите.");
      return;
    }

    try {
      await axios.delete(
        `http://147.45.107.174:5000/api/material-category/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Категория успешно удалена");

      // Обновляем только текущее состояние
      const updatedData = deleteChildRecursively(currentData, id);
      setCurrentData(updatedData);

      // Если нужно обновить общее состояние
      const updatedMaterialData = deleteChildRecursively(materialData, id);
      setMaterialData(updatedMaterialData);
    } catch (error) {
      console.error("Ошибка при удалении категории:", error.response || error);
      alert(
        `Ошибка при удалении категории: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  }

  return (
    <>
      <Tabs defaultValue="Shtatka qo'shish" className="w-full">
        <TabsList className="bg-slate-100 min-h-[50px] mt-7 ml-4 ">
          <TabsTrigger
            value="Shtatka qo'shish"
            className="p-2 rounded-lg data-[state=active]:bg-white data-[state=active]:text-black"
          >
            Shtatka qo'shish
          </TabsTrigger>

          <TabsTrigger
            value="Ombor"
            className="p-2 rounded-lg data-[state=active]:bg-white data-[state=active]:text-black"
          >
            Ombor
          </TabsTrigger>
          <TabsTrigger
            className="p-2 rounded-lg data-[state=active]:bg-white data-[state=active]:text-black"
            value="Bo'limga kerakli malumotlar"
          >
            Bo'limga kerakli malumotlar
          </TabsTrigger>
        </TabsList>

        <TabsContent value="Ombor">
          <div className="w-[97%] mx-auto mt-[70px]  px-6 py-6  rounded-md shadow-md ">
            <div className=" rounded-md">
              <div className="flex justify-between">
                <Button className="bg-sky-600 text-white mb-4">
                  Shtatka qo'shish
                </Button>
                <Button
                  // onClick={openModalTab}
                  className="bg-red-600 text-white mb-4"
                >
                  tablitsaga qo'shish
                </Button>
              </div>
              <Table className="border ">
                <TableHeader>
                  <TableRow>
                    <TableHead>Название</TableHead>
                    <TableHead>Возраст</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.age}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell>Итого</TableCell>
                    <TableCell>{data.length}</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>

            <AddModal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              title="Modal Title"
              content={<p>This is the content of the modal.</p>}
              footerContent={<button onClick={closeModal}>Close</button>}
            />
            {/* <AddModalTab
              // isOpen={isModalOpenTab}
              onRequestClose={closeModalTab}
              title="Modal Title"
              content={<p>This is the content of the modal.</p>}
              footerContent={<button onClick={closeModalTab}>Close</button>}
            /> */}
          </div>
        </TabsContent>
        <TabsContent value="Bo'limga kerakli malumotlar">
          <div className="ml-[20px] mt-[30px]">
            <Select>
              <SelectTrigger className="max-w-[700px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent className="bg-white shadow-md">
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-[97%] mx-auto mt-[20px]  px-6 py-6  rounded-md shadow-md ">
            <div className=" rounded-md">
              <div className="flex justify-end">
                <Button
                  // onClick={openModalTab}
                  className="bg-red-600 text-white mb-4"
                >
                  tablitsaga qo'shish
                </Button>
              </div>
              <Table className="border ">
                <TableHeader>
                  <TableRow>
                    <TableHead>Название</TableHead>
                    <TableHead>Возраст</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.age}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell>Итого</TableCell>
                    <TableCell>{data.length}</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>

            <AddModal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              title="Modal Title"
              content={<p>This is the content of the modal.</p>}
              footerContent={<button onClick={closeModal}>Close</button>}
            />
          </div>
        </TabsContent>
        <TabsContent value="Shtatka qo'shish">
          <div className="w-[97%] mx-auto mt-[50px]  px-6 py-6  rounded-md shadow-md ">
            <div className="flex justify-between">
              <Button
                className="bg-blue-500 text-white mb-4"
                onClick={openModal}
              >
                Yegi Shtatka yaratish
              </Button>
              {currentData !== materialData && (
                <Button
                  onClick={handleBack}
                  className="bg-red-500 text-white mb-4"
                >
                  Назад
                </Button>
              )}
            </div>
            <Table className="border ">
              <TableHeader>
                <TableRow>
                  <TableHead>Nomi</TableHead>
                  <TableHead className="flex justify-end items-center text-xl">
                    Operatsya
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentData?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell
                      className="cursor-pointer"
                      onClick={() => handleParentClick(item)}
                    >
                      {item.name}
                    </TableCell>
                    <TableCell className="flex gap-2 cursor-pointer justify-end">
                      <Button
                        className="bg-[#dbdbdb] w-[30px] h-[30px]"
                        onClick={() => deleteCategories(item.id)}
                      >
                        <Trash2 className="text-[#ec2f2f]" size={22} />
                      </Button>
                      <Button
                        className="bg-[#dbdbdb] w-[30px] h-[30px]"
                        onClick={() => openModalEdit(item.id, item.parentId)}
                      >
                        <Pencil className="text-[#008000]" size={22} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      <AddModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        title="Modal Title"
        content={<p>This is the content of the modal.</p>}
        footerContent={<button onClick={closeModal}>Close</button>}
        handleSubmit={handleSubmit}
        setCategoryName={setCategoryName}
        categoryName={categoryName}
      />

      <EditModal
        isOpen={isModalOpenEdit}
        onRequestClose={closeModalEdit}
        title="Modal Title"
        content={<p>This is the content of the modal.</p>}
        footerContent={<button onClick={closeModalEdit}>Close</button>}
        editCatergoies={editCatergoies}
        editCatergoiesName={editCatergoiesName}
        setEditCatergoiesName={setEditCatergoiesName}
      />
    </>
  );
}

export default Home;
