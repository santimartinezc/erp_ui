import React from "react";

const Menu = ({ setActiveSection, activeSection }) => {
  const menuItemClass = (section) =>
    `px-4 py-2 transition duration-200 ease-in-out cursor-pointer ${
      section === activeSection
        ? "bg-gray-700 text-white"
        : "hover:bg-gray-700 text-gray-300"
    }`;

  return (
    <div className="w-1/5 bg-gray-800 text-white">
      <div className="flex flex-col justify-center items-center py-10">
        <h1 className="text-2xl font-bold mb-8">INVENTARIO</h1>
      </div>
      <ul className="space-y-0">
        <li
          onClick={() => setActiveSection("products")}
          className={menuItemClass("products")}
        >
          Consultar inventario
        </li>
        <li
          onClick={() => setActiveSection("new_product")}
          className={menuItemClass("new_product")}
        >
          Registrar producto
        </li>
      </ul>
    </div>
  );
};

export default Menu;
