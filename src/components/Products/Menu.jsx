import React from "react";

const Menu = ({ setActiveSection, activeSection }) => {
  const menuItemClass = (section) =>
    `px-4 md:px-6 py-3 transition duration-200 ease-in-out cursor-pointer text-sm md:text-lg ${
      section === activeSection
        ? "bg-gray-700 text-white"
        : "hover:bg-gray-600 hover:text-white text-gray-400"
    }`;

  return (
    <div className="w-full md:w-1/5 bg-gray-800 text-white shadow-lg">
      <div className="flex flex-col justify-center items-center py-6 md:py-10">
        <h1 className="text-xl md:text-3xl font-bold mb-5 md:mb-10">
          INVENTARIO
        </h1>
      </div>
      <ul className="space-y-1 md:space-y-2">
        <li
          onClick={() => setActiveSection("products")}
          className={menuItemClass("products")}
        >
          Consultar Inventario
        </li>
        <li
          onClick={() => setActiveSection("new_product")}
          className={menuItemClass("new_product")}
        >
          Registrar Producto
        </li>
      </ul>
    </div>
  );
};

export default Menu;
