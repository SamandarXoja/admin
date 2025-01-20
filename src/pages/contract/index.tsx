import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui";
import ContractAdd from "./contract-add";
import axios from "axios";
import { Pencil, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";

function Contract() {
  const [contracts, setContracts] = useState([]);

  const [openAddContract, setOpenAddContract] = useState(true);

  useEffect(() => {
    async function fetchContract() {
      try {
        const token = localStorage.getItem("authToken"); // Получаем токен из localStorage
        const response = await axios.get(
          "http://147.45.107.174:5000/api/contract",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Добавляем токен в заголовок
            },
          }
        );
        setContracts(response.data); // Сохраняем полученные данные в состоянии
      } catch (err) {
        console.error("Ошибка при получении данных:", err);
      }
    }

    fetchContract();
  }, []);
  // console.log(contracts?.data);

  function handleOpenContractAdd() {
    setOpenAddContract(false);
  }

  return (
    <div className="p-[20px] mt-4">
      {openAddContract ? (
        <>
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold mb-5">Contract</h2>
            <div className="flex justify-end">
              <Button
                onClick={handleOpenContractAdd}
                className="bg-cyan-600  flex items-center justify-center "
              >
                <Plus size={24} color="#fff" />
              </Button>
            </div>
          </div>
          <div className="bg-white p-[20px] rounded-xl shadow-lg">
            <Table className="my-custom-class">
              <TableHeader>
                <TableRow>
                  <TableHead>organizatsyanomi</TableHead>
                  <TableHead>Dokument Sana</TableHead>
                  <TableHead>Dokument Nomi</TableHead>
                  <TableHead>Operatsya</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contracts?.data?.map((item) => {
                  return (
                    <TableRow>
                      <TableCell>{item.organizationName}</TableCell>
                      <TableCell>{item.docDate}</TableCell>
                      <TableCell>{item.docNum}</TableCell>

                      <TableCell className="flex gap-[6px]">
                        <Button
                          // onClick={() => handleDelete(item.id)}
                          className="bg-[#dbdbdb] w-[30px] h-[30px]"
                        >
                          <Trash2 className="text-[#ec2f2f]" size={22} />
                        </Button>
                        <Button
                          // onClick={() => openEditModal(item.id)}
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
        </>
      ) : (
        <ContractAdd setOpenAddContract={setOpenAddContract} />
      )}
    </div>
  );
}

export default Contract;
