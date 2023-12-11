import React, { useContext, useEffect, useState } from "react";
import { HistoryContextProvider } from "./HistoryContext";
import HistoryTable from "./HistoryTable";
import Menu from "./Menu";
import DailyGraph from "./DailyGraph";
import WeeklyGraph from "./WeeklyGraph";
import MonthlyGraph from "./MonthlyGraph";

const ProductView = () => {
  const [activeSection, setActiveSection] = useState("Inicio");

  const renderContent = () => {
    switch (activeSection) {
      case "transactions":
        return <HistoryTable />;
      case "dailyGraph":
        return <DailyGraph />;
      case "weeklyGraph":
        return <WeeklyGraph />;
      case "monthlyGraph":
        return <MonthlyGraph />;
      default:
        return <HistoryTable />;
    }
  };

  return (
    <HistoryContextProvider>
      <div className="flex">
        <Menu
          setActiveSection={setActiveSection}
          activeSection={activeSection}
        />
        <div className="w-4/5">{renderContent()}</div>
      </div>
    </HistoryContextProvider>
  );
};

export default ProductView;
