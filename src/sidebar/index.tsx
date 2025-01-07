import { Button } from "../components/ui";
import AddModal from "./components/modal";
import { Angry, ChevronDown, ChevronRight, File, Plus } from "lucide-react";
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
    <div className="w-[300px] bg-[#212a33] h-screen">
      <div className="ml-[20px] max-w-[200px] min-h-[40px] flex items-center">
        <Angry color="#FFE4C4" size={60} />
      </div>
      <div className="mt-[40px] pl-[10px] pr-[20px]">
        {categories.map((category, index) => (
          <div key={index}>
            <div
              className="flex items-center justify-between py-[3px] rounded-[5px] pl-[20px] cursor-pointer my-[10px]"
              onClick={() => toggleSubmenu(index)}
            >
              <div className="flex items-center gap-[7px]">
                <File color="#fff" />
                <span className="text-[#9A9CAE] text-[17px]">
                  {category.title}
                </span>
              </div>
              {openSubmenuIndex === index ? (
                <ChevronDown color="#fff" size={20} />
              ) : (
                <ChevronRight color="#fff" size={20} />
              )}
            </div>

            <div
              className={`transition-all overflow-hidden pl-[30px] ${
                openSubmenuIndex === index
                  ? "max-h-[200px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              {category.subcategories.map((subcategory, subIndex) => (
                <div key={subIndex}>
                  <div
                    className="flex items-center justify-between py-[3px] rounded-[5px] pl-[10px] cursor-pointer my-[5px]"
                    onClick={() => toggleSubSubmenu(subIndex)}
                  >
                    <span className="text-[#9A9CAE] text-[15px]">
                      {subcategory.title}
                    </span>
                    {openSubSubmenuIndex === subIndex ? (
                      <ChevronDown color="#fff" size={20} />
                    ) : (
                      <ChevronRight color="#fff" size={20} />
                    )}
                  </div>

                  <div
                    className={`transition-all overflow-hidden pl-[30px] ${
                      openSubSubmenuIndex === subIndex
                        ? "max-h-[200px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    {subcategory.subcategories?.map(
                      (subSubcategory, subSubIndex) => (
                        <div key={subSubIndex}>
                          <div
                            className="flex items-center justify-between py-[3px] rounded-[5px] pl-[10px] cursor-pointer my-[5px]"
                            onClick={() => toggleSubSubSubmenu(subSubIndex)}
                          >
                            <span className="text-[#9A9CAE] text-[15px]">
                              {subSubcategory.title}
                            </span>
                            {openSubSubSubmenuIndex === subSubIndex ? (
                              <ChevronDown color="#fff" size={20} />
                            ) : (
                              <ChevronRight color="#fff" size={20} />
                            )}
                          </div>

                          <div
                            className={`transition-all overflow-hidden pl-[30px] ${
                              openSubSubSubmenuIndex === subSubIndex
                                ? "max-h-[200px] opacity-100"
                                : "max-h-0 opacity-0"
                            }`}
                          >
                            {subSubcategory.subcategories?.map(
                              (subSubSubcategory, subSubSubIndex) => (
                                <NavLink
                                  key={subSubSubIndex}
                                  to={subSubSubcategory.path}
                                  className={({ isActive }) =>
                                    `block py-[7px] pl-[10px] rounded-[5px] text-[#9A9CAE] text-[15px] cursor-pointer my-[5px] ${
                                      isActive ? "bg-[#1C1C21]" : ""
                                    }`
                                  }
                                >
                                  {subSubSubcategory.title}
                                </NavLink>
                              )
                            )}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {allClass.map((item, i) => (
          <div className="mt-[16px] my-7 ml-[20px] gap-2 flex" key={i}>
            <File color="#fff" />
            <NavLink to={item.path} className="text-[#9A9CAE] cursor-pointer">
              {item.title}
            </NavLink>
          </div>
        ))}
      </div>

      <Button
        onClick={openModal}
        className="ml-[30px] text-white bg-sky-400 mt-5"
      >
        Shtatka qo'shish <Plus />
      </Button>

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
