import Link from "next/link";
import React from "react";
import { BsChevronDown } from "react-icons/bs";

const data = [
  { id: 1, name: "Home", url: "/" },
  { id: 2, name: "Categories", subMenu: true },
];

const subMenuData = [
  { id: 1, name: "Jordan", doc_count: 11 },
  { id: 2, name: "Sneakers", doc_count: 8 },
  { id: 3, name: "Running shoes", doc_count: 64 },
  { id: 4, name: "Football shoes", doc_count: 107 },
];

const Menu = ({ showCatMenu, setShowCatMenu, categories }) => {
  return (
    <ul className="hidden md:flex items-center gap-8 font-medium text-black">
      {data.map((item) => {
        return (
          <React.Fragment key={item.id}>
            {!!item?.subMenu ? (
              <li
                className="relative cursor-pointer flex items-center gap-2"
                onMouseEnter={() => setShowCatMenu(true)}
                onMouseLeave={() => setShowCatMenu(false)}
              >
                {item?.name} <BsChevronDown className="stroke-1" size={14} />
                {showCatMenu && (
                  <ul className="bg-white absolute top-6 left-0 min-w-[250px] py-1 px-1 text-black shadow-lg">
                    {categories?.map(({ id, attributes: category }) => {
                      return (
                        <Link
                          href={`/category/${category?.slug}`}
                          key={id}
                          onClick={() => setShowCatMenu(false)}
                        >
                          <li className="h-12 flex justify-between items-center px-3 hover:bg-black/[0.03] rounded-md">
                            {category?.name}
                            <span className="opacity-50 text-sm">{`(${category?.products?.data?.length})`}</span>
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                )}
              </li>
            ) : (
              <li className="cursor-pointer">
                <Link href={item?.url}>{item?.name}</Link>
              </li>
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default Menu;
