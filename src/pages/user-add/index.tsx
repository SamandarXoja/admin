import {
  Button,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui";
import Catergories from "../../sidebar/components/catergories";
import EditModal from "./components/edit-modal";
import AddModal from "./components/modal";
import axios from "axios";
import { CircleX, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

function UserAdd() {
  const [role, setRole] = useState(null);
  const [usersData, setUsersData] = useState(null);
  const [error, setError] = useState(null);

  const [userId, setUserId] = useState(null);

  const [otdel, setOtdel] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openEditModal = (id) => {
    setIsEditModal(true);
    setUserId(id);
    // console.log(id);
  };
  const closeEditModal = () => setIsEditModal(false);

  const userInfo = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        return;
      }

      const response = await axios.get("http://147.45.107.174:5000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsersData(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          setError("Токен не найден");
          return;
        }

        const response = await axios.get(
          "http://147.45.107.174:5000/api/user/get-role",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setRole(response.data);
      } catch (err) {
        setError("Ошибка при получении роли");
        console.error(err);
      }
    };

    const fetchOtdel = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          setError("Токен не найден");
          return;
        }

        const response = await axios.get(
          "http://147.45.107.174:5000/api/user/get-otdel",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOtdel(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    userInfo();
    fetchUserRole();
    fetchOtdel();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("Токен не найден");
        return;
      }

      const response = await axios.delete(
        `http://147.45.107.174:5000/api/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Пользователь успешно удален!");

        const userInfo = async () => {
          try {
            const response = await axios.get(
              "http://147.45.107.174:5000/api/user",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setUsersData(response.data.data);
          } catch (err) {
            console.log(err);
          }
        };
        userInfo();
      }
    } catch (error) {
      console.error("Ошибка при удалении пользователя:", error);
    }
  };

  //   console.log(usersData);

  return (
    <div className="p-[20px] mt-4">
      <div className="bg-white p-[20px] rounded-xl shadow-lg">
        <Button className="bg-cyan-600 text-white mb-3" onClick={openModal}>
          User Qo'shish
        </Button>
        <Table className="my-custom-class">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>UserName</TableHead>
              <TableHead>Fio</TableHead>
              <TableHead>roleName</TableHead>
              <TableHead>otdelName</TableHead>
              <TableHead>Operatsya</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usersData?.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.userName}</TableCell>
                  <TableCell>{item.fio}</TableCell>
                  <TableCell>{item.roleName}</TableCell>
                  <TableCell>{item.otdelName}</TableCell>
                  <TableCell className="flex gap-[6px]">
                    <Button
                      onClick={() => handleDelete(item.id)}
                      className="bg-[#dbdbdb] w-[30px] h-[30px]"
                    >
                      <Trash2 className="text-[#ec2f2f]" size={22} />
                    </Button>
                    <Button
                      onClick={() => openEditModal(item.id)}
                      className="bg-[#dbdbdb] w-[30px] h-[30px]"
                    >
                      <Pencil className="text-[#008000]" size={22} />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <AddModal
        role={role}
        otdel={otdel}
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        title="Modal Title"
        content={<p>This is the content of the modal.</p>}
        footerContent={<button onClick={closeModal}>Close</button>}
        userInfo={userInfo}
      />

      <EditModal
        userId={userId}
        role={role}
        otdel={otdel}
        isOpen={isEditModal}
        onRequestClose={closeEditModal}
        title="Modal Title"
        content={<p>This is the content of the modal.</p>}
        footerContent={<button onClick={closeEditModal}>Close</button>}
        userInfo={userInfo}
      />
    </div>
  );
}

export default UserAdd;
