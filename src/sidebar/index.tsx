import { Button } from "../components/ui";
import AddModal from "./components/modal";
import {
  Angry,
  ChevronDown,
  ChevronRight,
  File,
  Plus,
  User,
} from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router";

function Sidebar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const allClass = useSelector((state: RootState) => state.counter.allClass);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const categories = [
    {
      title: "Общий",
      path: "/",
      subcategories: [
        {
          title: "Akumlaytor",
          path: "/",
          subcategories: [
            {
              title: "Akumly",
              path: "/#",
              subcategories: [
                {
                  title: "Akumlyatorlar",
                  path: "/",
                  subcategories: [
                    {
                      title: "Подкатегория дохода 3",
                      path: "#",
                    },
                    {
                      title: "Подкатегория дохода 4",
                      path: "#",
                    },
                  ],
                },
              ],
            },
            { title: "Подкатегория 2", path: "/sub2" },
          ],
        },
        { title: "Субкатегория 2", path: "/sub2" },
      ],
    },

    {
      title: "Kirim chiqim",
      path: "",
      subcategories: [
        {
          title: "Доходы",
          path: "/income",
          subcategories: [
            {
              title: "Подкатегория дохода 1",
              path: "/income/sub1",
              subcategories: [
                {
                  title: "Great-Grandson", // Новый уровень "great-grandson"
                  path: "/revenue",
                  subcategories: [
                    {
                      title: "Подкатегория дохода 3",
                      path: "/income/sub1/great-grandson/sub1",
                    },
                    {
                      title: "Подкатегория дохода 4",
                      path: "/income/sub1/great-grandson/sub2",
                    },
                  ],
                },
              ],
            },
            { title: "Подкатегория дохода 2", path: "/income/sub2" },
          ],
        },
        {
          title: "Расходы",
          path: "/expenses",
          subcategories: [
            { title: "Подкатегория расхода 3", path: "/expenses/sub1" },
            { title: "Подкатегория расхода 4", path: "/expenses/sub2" },
          ],
        },
      ],
    },
  ];

  const [openSubmenuIndex, setOpenSubmenuIndex] = useState<number | null>(null);
  const [openSubSubmenuIndex, setOpenSubSubmenuIndex] = useState<number | null>(
    null
  );
  const [openSubSubSubmenuIndex, setOpenSubSubSubmenuIndex] = useState<
    number | null
  >(null);

  const toggleSubmenu = (categoryIndex: number) => {
    setOpenSubmenuIndex((prevIndex) =>
      prevIndex === categoryIndex ? null : categoryIndex
    );
  };

  const toggleSubSubmenu = (subcategoryIndex: number) => {
    setOpenSubSubmenuIndex((prevIndex) =>
      prevIndex === subcategoryIndex ? null : subcategoryIndex
    );
  };

  const toggleSubSubSubmenu = (subSubcategoryIndex: number) => {
    setOpenSubSubSubmenuIndex((prevIndex) =>
      prevIndex === subSubcategoryIndex ? null : subSubcategoryIndex
    );
  };

  return (
    <div className="w-[300px] bg-[#212a33] h-screen pt-3">
      <div className="ml-[20px] max-w-[200px] min-h-[40px] flex items-center">
        <Angry color="#FFE4C4" size={60} />
      </div>
      <div className="mt-[40px] ml-[10px] pl-[10px] pr-[20px]">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-[#9A9CAE] cursor-pointer max-w-[230px] ${
              isActive
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
          `flex text-[#9A9CAE] max-w-[230px] px-2 py-1 rounded-md items-center ml-[20px] gap-2 cursor-pointer mt-10 ${
            isActive ? "bg-blue-500 px-2 py-1 text-white" : ""
          }`
        }
      >
        <User color="#fff" size={25} />
        <div className="flex gap-[2px] items-center">
          User Qo'shish
          <Plus color="#fff" />
        </div>
      </NavLink>

      <AddModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        title="Modal Title"
        content={<p>This is the content of the modal.</p>}
        footerContent={<button onClick={closeModal}>Close</button>}
      />
    </div>
  );
}

export default Sidebar;
