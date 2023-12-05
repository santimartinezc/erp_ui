import React, { useContext, useEffect, useState } from "react";
import { HistoryContext } from "./HistoryContext";

const Menu = ({setActiveSection }) => {
  return (
    <div className="w-1/5 bg-gray-800 text-white">
      <div className="flex flex-col justify-center items-center py-10">
        <h1 className="text-3xl font-bold mb-8">Histórico</h1>
      </div>
      <ul className="space-y-2">
        <li
          onClick={() => setActiveSection("transactions")}
          className="hover:bg-gray-700 px-4 py-2 transition duration-200 ease-in-out cursor-pointer"
        >
          Transacciones
        </li>
        <li
          onClick={() => setActiveSection("graphs")}
          className="hover:bg-gray-700 px-4 py-2 transition duration-200 ease-in-out cursor-pointer"
        >
          Gráficas
        </li>
      </ul>
    </div>
  );
};

export default Menu;
