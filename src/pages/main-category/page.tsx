import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui";
import AddModal from "./components/add-modal";
import EditModal from "./components/edit-modal";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Page({ data }) {
  const { id } = useParams();
  const params = useParams();
  const [materialData, setMaterialData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [materialsCategoryId, setMaterialCategoryId] = useState(null);

  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);

  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [measurement, setMeasurement] = useState("");
  const [price, setPrice] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const closeModalEdit = () => setIsModalOpenEdit(false);

  async function fetchmaterialData() {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        return;
      }

      const response = await axios.get(
        `http://147.45.107.174:5000/api/material/materialCgId/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMaterialData(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchmaterialData();
  }, [id]);

  async function handleSubmit() {
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("Токен не найден");
      return;
    }

    try {
      const data = {
        number,
        name,
        measurement,
        price: Number(price),
        materialCategoryId: id,
      };

      const response = await axios.post(
        "http://147.45.107.174:5000/api/material/create",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response", response.data);
      alert("Data sent successfully!");
      fetchmaterialData();
      closeModal();
    } catch (error) {
      console.log("Error sending data:", error);
      alert("Failed to send data. Please try again.");
    }
  }

  async function handleEdit() {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("Токен не найден");
        return;
      }

      const data = {
        materialCategoryId: id, // id выбранной категории
        number,
        name,
        measurement,
        price: Number(price),
      };

      const response = await axios.put(
        `http://147.45.107.174:5000/api/material/${materialsCategoryId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Data updated successfully!");
        console.log("Updated data:", response.data);
        closeModalEdit();
        // dispatch(fetchCategoryMaterialData(selectedCategoryId));
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(id) {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const response = await axios.delete(
        `http://147.45.107.174:5000/api/material/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Malumot o'chorildi");
        fetchmaterialData();
        console.log("Item deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }

  const openModalEdit = (id) => {
    setIsModalOpenEdit(true);
    setMaterialCategoryId(id);
  };

  return (
    <>
      <div className="p-[20px] mt-4">
        {/* {params.id} */}
        <div className="bg-white p-[20px] rounded-xl shadow-lg">
          <Button onClick={openModal} className="bg-cyan-600 text-white mb-3">
            Malumot Qo'shish
          </Button>

          <Table className="my-custom-class">
            <TableHeader>
              <TableRow>
                <TableHead>measurement</TableHead>
                <TableHead>name</TableHead>
                <TableHead>number</TableHead>
                <TableHead>price</TableHead>
                <TableHead>Operatsya</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {materialData?.data?.length ? (
                materialData?.data?.map((item) => {
                  return (
                    <TableRow>
                      <TableCell>{item.measurement}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.number}</TableCell>
                      <TableCell>{item.price}</TableCell>

                      <TableCell className="flex gap-[6px] ">
                        <Button
                          onClick={() => handleDelete(item.id)}
                          className="bg-[#dbdbdb] w-[30px] h-[30px]"
                        >
                          <Trash2 className="text-[#ec2f2f]" size={22} />
                        </Button>
                        <Button
                          onClick={() => openModalEdit(item.id)}
                          className="bg-[#dbdbdb] w-[30px] h-[30px]"
                        >
                          <Pencil className="text-[#008000]" size={22} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <h3 className="text-2xl mt-3">Malumot Yo'q</h3>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <AddModal
        number={number}
        name={name}
        measurement={measurement}
        price={price}
        setNumber={setNumber}
        setName={setName}
        setMeasurement={setMeasurement}
        setPrice={setPrice}
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        title="Modal Title"
        content={<p>This is the content of the modal.</p>}
        footerContent={<button onClick={closeModal}>Close</button>}
        handleSubmit={handleSubmit}
      />
      <EditModal
        number={number}
        name={name}
        measurement={measurement}
        price={price}
        setNumber={setNumber}
        setName={setName}
        setMeasurement={setMeasurement}
        setPrice={setPrice}
        isOpen={isModalOpenEdit}
        onRequestClose={closeModalEdit}
        title="Modal Title"
        content={<p>This is the content of the modal.</p>}
        footerContent={<button onClick={closeModalEdit}>Close</button>}
        handleEdit={handleEdit}
      />
    </>
  );
}

export default Page;
