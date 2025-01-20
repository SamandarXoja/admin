import axios from "axios";
import { ChevronDown, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Catergories() {
  const navigate = useNavigate();
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
      <div key={node.id} >
        <div
          className={`flex items-center text-[#9A9CAE] cursor-pointer p-1 ${
            !node.isParent && selectedNodeId === node.id
              ? "bg-blue-500 text-white rounded-md"
              : ""
          } ${!node.isParent ? "ml-[20px] mb-2" : "mb-2"}`}
          onClick={() => {
            // Построение полного пути на основе родительской цепочки
            let path = `/${node.id}`;
            let currentNode = node;

            while (currentNode.parentId !== null) {
              path = `/${currentNode.parentId}${path}`;
              currentNode = findNodeById(categoriesData, currentNode.parentId);
            }

            // Навигация
            navigate(path);

            // Логика выбора и вызова действий
            if (!node.isParent) {
              //   dispatch(setSelectedCategoryId(node.id));
              //   dispatch(fetchCategoryMaterialData(node.id));
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
  const findNodeById = (nodes, id) => {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node.children && node.children.length > 0) {
        const found = findNodeById(node.children, id);
        if (found) return found;
      }
    }
    return null;
  };
  return (
    <div className="bg-[#131619] w-[250px] flex flex-col pt-[150px]">
      {categoriesData.map(renderTree)}
    </div>
  );
}

export default Catergories;
