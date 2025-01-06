import { Angry, ChevronDown, ChevronRight, File } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";

function Sidebar() {
  // Структура данных для категорий и субкатегорий
  const categories = [
    {
      title: "Общий",
      path: "/",
      subcategories: [
        { title: "Akumlaytor", path: "/" },
        { title: "Субкатегория 2", path: "/sub2" },
      ],
    },
    {
      title: "Kirim chiqim",
      path: "/revenue",
      subcategories: [
        { title: "Доходы", path: "/income" },
        { title: "Расходы", path: "/expenses" },
      ],
    },
  ];

  // Состояние для хранения индекса открытого подменю
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState<number | null>(null);

  const toggleSubmenu = (categoryIndex: number) => {
    setOpenSubmenuIndex((prevIndex) =>
      prevIndex === categoryIndex ? null : categoryIndex
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
            {/* Основная категория */}
            <div
              className="flex items-center justify-between py-[7px] rounded-[5px] pl-[20px] cursor-pointer my-[10px]"
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

            {/* Субкатегории */}
            {openSubmenuIndex === index && (
              <div className="pl-[30px]">
                {category.subcategories.map((subcategory, subIndex) => (
                  <NavLink
                    key={subIndex}
                    to={subcategory.path}
                    className={({ isActive }) =>
                      `block py-[7px] pl-[10px] rounded-[5px] text-[#9A9CAE] text-[15px] cursor-pointer my-[5px] ${
                        isActive ? "bg-[#1C1C21]" : ""
                      }`
                    }
                  >
                    {subcategory.title}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
