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
        <h1 className="text-3xl font-bold mb-8">Histórico</h1>
      </div>
      <ul className="space-y-0">
        <li
          onClick={() => setActiveSection("transactions")}
          className={menuItemClass("transactions")}
        >
          Transacciones
        </li>
        <li
          onClick={() => setActiveSection("dailyGraph")}
          className={menuItemClass("dailyGraph")}
        >
          Gráfica diaria
        </li>
        <li
          onClick={() => setActiveSection("weeklyGraph")}
          className={menuItemClass("weeklyGraph")}
        >
          Gráfica semanal
        </li>
        <li
          onClick={() => setActiveSection("monthlyGraph")}
          className={menuItemClass("monthlyGraph")}
        >
          Gráfica mensual
        </li>
        <li
          onClick={() => setActiveSection("yearlyGraph")}
          className={menuItemClass("yearlyGraph")}
        >
          Gráfica anual
        </li>
      </ul>
    </div>
  );
};

export default Menu;
