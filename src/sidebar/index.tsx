import { Button } from "../components/ui";
import {
  fetchCategoryMaterialData,
  setSelectedCategoryId,
} from "../redux/slice/treeSlice";
import AddModal from "./components/modal";
import axios from "axios";
import {
  Angry,
  ChevronDown,
  ChevronRight,
  File,
  LogOut,
  Plus,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router";

function Sidebar({ onLogout }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoriesData, setCategoriesData] = useState([]);
  const [openNodes, setOpenNodes] = useState(new Set());

  const [selectedNodeId, setSelectedNodeId] = useState(null);

  useEffect(() => {
    async function fetchCategories() {
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

        setCategoriesData(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchCategories();
  }, []);

  const toggleNode = (id) => {
    setOpenNodes((prevOpenNodes) => {
      const newOpenNodes = new Set(prevOpenNodes);
      if (newOpenNodes.has(id)) {
        newOpenNodes.delete(id);
      } else {
        newOpenNodes.add(id);
      }
      return newOpenNodes;
    });
  };

  const renderTree = (node) => {
    return (
      <div key={node.id}>
        <div
          className={`flex items-center text-[#9A9CAE] cursor-pointer p-1 ${
            !node.isParent && selectedNodeId === node.id
              ? "bg-blue-500 text-white rounded-md"
              : ""
          } ${!node.isParent ? "ml-[20px] mb-2" : "mb-2"}`}
          onClick={() => {
            if (!node.isParent) {
              dispatch(setSelectedCategoryId(node.id));
              dispatch(fetchCategoryMaterialData(node.id));
              setSelectedNodeId(node.id);
            } else {
              toggleNode(node.id);
            }
          }}
        >
          {node.isParent && (
            <span className="mr-2">
              {openNodes.has(node.id) ? <ChevronDown /> : <ChevronRight />}
            </span>
          )}

          <span className="text-2xl">{node.name}</span>
          {node.isParent && node.children.length === 0 && (
            <span className="ml-2 text-gray-400">[icon]</span>
          )}
        </div>
        {node.isParent && openNodes.has(node.id) && (
          <div className="ml-4">
            {node.children.map((child) => renderTree(child))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-[300px] flex flex-col justify-between bg-[#212a33] h-screen pt-3">
      <div>
        <div className="ml-[20px] max-w-[200px] min-h-[40px] flex items-center mb-10">
          <Angry color="#FFE4C4" size={60} />
        </div>
        <div className="ml-[0px] pr-[0px]">
          <NavLink to={`/main`}>
            <div className="flex gap-[2px] items-center">
              <div className="mt-5 ml-4">{categoriesData.map(renderTree)}</div>
            </div>
          </NavLink>
        </div>

        <div className="mt-[40px] ml-[10px] pl-[10px] pr-[20px]">
          <NavLink
            to="/"
            onClick={() => setSelectedNodeId(null)} // Reset selected node when "Spravochnik" is clicked
            className={({ isActive }) =>
              `text-[#9A9CAE] flex items-center text-2xl cursor-pointer max-w-[230px] ${
                isActive || selectedNodeId === "spravochnik"
                  ? "bg-blue-500 flex gap-2 text-white rounded-md px-2 py-1"
                  : "px-2 py-1 flex gap-2"
              }`
            }
          >
            <File color="#fff" />
            Spravochnik
          </NavLink>
        </div>

        <NavLink
          to="/user-add"
          className={({ isActive }) =>
            `flex text-[#9A9CAE] max-w-[230px] px-2 py-1 rounded-md items-center ml-[20px] gap-2 cursor-pointer mt-5 ${
              isActive ? "bg-blue-500 px-2 py-1 text-white" : ""
            }`
          }
        >
          <User color="#fff" size={25} />
          <div className="flex gap-[2px] items-center text-2xl">
            User Qo'shish
            <Plus color="#fff" />
          </div>
        </NavLink>
      </div>

      <button
        onClick={onLogout}
        className="cursor-pointer mb-20 ml-6 flex items-end gap-2"
      >
        <LogOut color="#fff" size={24} />
        <span className="text-white text-xl">LogOut</span>
      </button>

      <AddModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        title="Modal Title"
        content={<p>This is the content of the modal.</p>}
        footerContent={
          <button onClick={() => setIsModalOpen(false)}>Close</button>
        }
      />
    </div>
  );
}

export default Sidebar;
