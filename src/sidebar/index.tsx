import { Angry, ChevronDown, ChevronRight, File } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";

function Sidebar() {
  const categories = [
    {
      title: "Общий",
      path: "/",
      subcategories: [
        {
          title: "Akumlaytor",
          path: "/",
          subcategories: [
            { title: "Подкатегория 1", path: "/" },
            { title: "Подкатегория 2", path: "/sub2" },
          ],
        },
        { title: "Субкатегория 2", path: "/sub2" },
      ],
    },
    {
      title: "Kirim chiqim",
      path: "/revenue",
      subcategories: [
        {
          title: "Доходы",
          path: "/income",
          subcategories: [
            { title: "Подкатегория дохода 1", path: "/income/sub1" },
            { title: "Подкатегория дохода 2", path: "/income/sub2" },
          ],
        },
        {
          title: "Расходы",
          path: "/expenses",
          subcategories: [
            { title: "Подкатегория расхода 1", path: "/expenses/sub1" },
            { title: "Подкатегория расхода 2", path: "/expenses/sub2" },
          ],
        },
      ],
    },
  ];

  const [openSubmenuIndex, setOpenSubmenuIndex] = useState<number | null>(null);
  const [openSubSubmenuIndex, setOpenSubSubmenuIndex] = useState<number | null>(
    null
  );

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

            {/* Субкатегории */}
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

                  {/* Внутренние подкатегории (внуки) */}
                  <div
                    className={`transition-all overflow-hidden pl-[30px] ${
                      openSubSubmenuIndex === subIndex
                        ? "max-h-[200px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    {subcategory.subcategories?.map(
                      (subSubcategory, subSubIndex) => (
                        <NavLink
                          key={subSubIndex}
                          to={subSubcategory.path}
                          className={({ isActive }) =>
                            `block py-[7px] pl-[10px] rounded-[5px] text-[#9A9CAE] text-[15px] cursor-pointer my-[5px] ${
                              isActive ? "bg-[#1C1C21]" : ""
                            }`
                          }
                        >
                          {subSubcategory.title}
                        </NavLink>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
