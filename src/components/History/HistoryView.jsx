import React, { useContext, useEffect, useState } from "react";
import { HistoryContextProvider } from "./HistoryContext";
import HistoryTable from "./HistoryTable";
import Menu from "./Menu";

const ProductView = () => {
  const [activeSection, setActiveSection] = useState("Inicio");

  const renderContent = () => {
    switch (activeSection) {
      case "transactions":
        return <HistoryTable />;
      case "graphs":
        return <div>Contenido de Gráficos</div>;
      default:
        return <HistoryTable />;
    }
  };

  return (
    <HistoryContextProvider>
      <div className="flex">
        <Menu setActiveSection={setActiveSection} />
        <div className="w-4/5">{renderContent()}</div>
      </div>
    </HistoryContextProvider>
  );
};

export default ProductView;
