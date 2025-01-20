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
import Catergories from "../../sidebar/components/catergories";
import AddModal from "./components/add-modal";
import DirectoryModal from "./components/directory-modal";
import EditModal from "./components/edit-modal";
import ModalTabEdit from "./components/edit-modal";
import OrganizationModal from "./components/organization-modal";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

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

  const [directory, setDirectory] = useState(null);

  const [selectedData, setselectedData] = useState(null);

  const [active, setActive] = useState("");

  const [organizationData, setOrganizationData] = useState(null);

  const [directoryId, setDirectoryId] = useState(null);

  // console.log(directoryId);

  const [isDirectoryModal, setIsDirectoryModal] = useState(false);
  const [isOrganizationModal, setIsOrganizationModal] = useState(false);

  const [directoryName, setDirectoryName] = useState("");
  const [directoryTitle, setDirectoryTitle] = useState("");

  const [organizationType, setOrganizationType] = useState(0);

  const [organizationName, setOrganizationName] = useState("");

  // console.log(organizationType);

  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "Shtatka qo'shish" // Устанавливаем сохранённый таб или дефолтный
  );

  const handleTabChange = (value) => {
    setActiveTab(value);
    localStorage.setItem("activeTab", value);
  };

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

  async function fetchDirectory() {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        return;
      }

      const response = await axios.get(
        "http://147.45.107.174:5000/api/spravochnik/type-of-sp",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDirectory(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchSelectedData(id) {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        return;
      }

      const response = await axios.get(
        `http://147.45.107.174:5000/api/spravochnik/typeOfSpId/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setselectedData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function organization(type) {
    // http://147.45.107.174:5000/api/organization/type/0
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        return;
      }

      const response = await axios.get(
        `http://147.45.107.174:5000/api/organization/type/${type}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrganizationData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    materialCategory();
    fetchDirectory();
    handleClick("Prixod", 0);
    // fetchSelectedData();
  }, []);

  const [selectedValue, setSelectedValue] = useState("");
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openDirectoryModal = () => setIsDirectoryModal(true);
  const closeDirectoryModal = () => setIsDirectoryModal(false);

  const openOrganizationModal = () => setIsOrganizationModal(true);
  const closeOrganizationModal = () => setIsOrganizationModal(false);

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

  async function createDirectory() {
    // directoryId

    try {
      const token = localStorage.getItem("authToken");

      const directoryData = {
        name: directoryName,
        title: directoryTitle,
        typeOfSpId: directoryId,
      };

      const response = await axios.post(
        "http://147.45.107.174:5000/api/spravochnik/create",
        directoryData,
        {
          headers: {
            uthorization: `Bearer ${token}`,
          },
        }
      );

      alert("Success");
      fetchDirectory();
      fetchSelectedData(directoryId);
      closeDirectoryModal();
    } catch (err) {
      console.log(err);
    }
  }

  async function organizationCreate() {
    // console.log(organizationName);

    try {
      const token = localStorage.getItem("authToken");

      const organizationData = {
        name: organizationName,
        type: organizationType,
      };

      const response = await axios.post(
        "http://147.45.107.174:5000/api/organization/create",
        organizationData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      closeOrganizationModal();
      organization(organizationType);
    } catch (err) {
      console.log(err);
    }
  }

  const handleSelectChange = (value) => {
    const selectedItem = directory.find((item) => item.name === value);

    if (selectedItem) {
      // setDirectoryId(selectedItem.id);
      fetchSelectedData(selectedItem.id);
    }
  };

  const handleClick = (button, type) => {
    setActive(button);
    organization(type);
    setOrganizationType(type);
  };

  // console.log(selectedData);

  return (
    <>
      <Tabs
        defaultValue={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="bg-slate-100 min-h-[50px] mt-7 ml-4 ">
          <TabsTrigger
            value="Ombor"
            className="p-2 rounded-lg data-[state=active]:bg-white data-[state=active]:text-black"
          >
            Ombor
          </TabsTrigger>

          <TabsTrigger
            value="Shtatka qo'shish"
            className="p-2 rounded-lg data-[state=active]:bg-white data-[state=active]:text-black"
          >
            Shtatka qo'shish
          </TabsTrigger>

          <TabsTrigger
            value="Organization"
            className="p-2 rounded-lg data-[state=active]:bg-white data-[state=active]:text-black"
          >
            Organization
          </TabsTrigger>
          <TabsTrigger
            className="p-2 rounded-lg data-[state=active]:bg-white data-[state=active]:text-black"
            value="Spravochnik"
          >
            Spravochnik
          </TabsTrigger>
        </TabsList>

        <TabsContent value="Organization">
          <div className="w-[97%] mx-auto mt-[70px]  px-6 py-6  rounded-md shadow-md ">
            <div className=" rounded-md">
              <div className="flex justify-between">
                <div className="mb-3 flex gap-3">
                  <Button
                    onClick={() => handleClick("Prixod", 0)}
                    className={`${
                      active === "Prixod"
                        ? "bg-cyan-600 text-white"
                        : "bg-white text-black"
                    } px-4 py-2 border rounded`}
                  >
                    Prixod
                  </Button>
                  <Button
                    onClick={() => handleClick("Rasxod", 1)}
                    className={`${
                      active === "Rasxod"
                        ? "bg-cyan-600 text-white"
                        : "bg-white text-black"
                    } px-4 py-2 border rounded`}
                  >
                    Rasxod
                  </Button>
                </div>
                <Button
                  className="bg-cyan-600 text-white"
                  onClick={openOrganizationModal}
                >
                  Qo'shish
                </Button>
              </div>

              {/* openOrganizationModal */}
              <Table className="border ">
                <TableHeader>
                  <TableRow>
                    <TableHead>Название</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {organizationData?.data?.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="flex gap-2 cursor-pointer justify-end">
                        <Button
                          className="bg-[#dbdbdb] w-[30px] h-[30px]"
                          // onClick={() => deleteCategories(item.id)}
                        >
                          <Trash2 className="text-[#ec2f2f]" size={22} />
                        </Button>
                        <Button
                          className="bg-[#dbdbdb] w-[30px] h-[30px]"
                          // onClick={() => openModalEdit(item.id, item.parentId)}
                        >
                          <Pencil className="text-[#008000]" size={22} />
                        </Button>
                      </TableCell>
                      {/* <TableCell>{item.age}</TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
                {/* <TableFooter>
                  <TableRow>
                    <TableCell>Итого</TableCell>
                    <TableCell>{data.length}</TableCell>
                  </TableRow>
                </TableFooter> */}
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

        <TabsContent value="Spravochnik">
          <div className="ml-[20px] mt-[30px]">
            <Select value={selectedValue} onValueChange={handleSelectChange}>
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

          <div className="w-[97%] mx-auto mt-[20px]  px-6 py-6  rounded-md shadow-md ">
            <div className=" rounded-md">
              <div className="flex justify-end">
                <Button
                  onClick={openDirectoryModal}
                  className="bg-cyan-600 text-white mb-4"
                >
                  Tablitsaga qo'shish
                </Button>
              </div>
              <Table className="border ">
                <TableHeader>
                  <TableRow>
                    <TableHead>name</TableHead>
                    <TableHead>title</TableHead>
                    <TableHead>typeOfSpName</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedData?.data.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.typeOfSpName}</TableCell>
                      <TableCell className="flex gap-2 cursor-pointer justify-end">
                        <Button
                          className="bg-[#dbdbdb] w-[30px] h-[30px]"
                          // onClick={() => deleteCategories(item.id)}
                        >
                          <Trash2 className="text-[#ec2f2f]" size={22} />
                        </Button>
                        <Button
                          className="bg-[#dbdbdb] w-[30px] h-[30px]"
                          // onClick={() => openModalEdit(item.id, item.parentId)}
                        >
                          <Pencil className="text-[#008000]" size={22} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                {/* <TableFooter>
                  <TableRow>
                    <TableCell>Итого</TableCell>
                    <TableCell>{data.length}</TableCell>
                  </TableRow>
                </TableFooter> */}
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
        <TabsContent value="Ombor" className=" flex">
          <Catergories />
          <div className="flex-1">
            <Outlet />
          </div>
        </TabsContent>
      </Tabs>

      <OrganizationModal
        isOpen={isOrganizationModal}
        onRequestClose={closeOrganizationModal}
        organizationCreate={organizationCreate}
        setOrganizationName={setOrganizationName}
        organizationName={organizationName}
      />

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
      <DirectoryModal
        isOpen={isDirectoryModal}
        onRequestClose={closeDirectoryModal}
        createDirectory={createDirectory}
        setDirectoryName={setDirectoryName}
        directoryName={directoryName}
        directoryTitle={directoryTitle}
        setDirectoryTitle={setDirectoryTitle}
        setDirectoryId={setDirectoryId}
        directory={directory}
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
