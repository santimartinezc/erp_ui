// import React from "react";
import React, { useContext, useEffect, useState } from "react";
import { HistoryContext } from "./HistoryContext";
import {
  fetchBillingDataBetweenDates,
  fetchTransactionsBetweenDates,
} from "../../api";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const MonthlyGraph = () => {
  const { monthlyData, startDate, setStartDate, fetchMonthlyData } =
    useContext(HistoryContext);
  const [monthlyDataToShow, setMonthlyDataToShow] = useState([]);

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    fetchMonthlyData();
  }, []);

  useEffect(() => {
    setMonthlyDataToShow(monthlyData);
    setTotalAmount(monthlyData.reduce((sum, day) => sum + day.totalAmount, 0));
  }, [monthlyData]);

  const filterData = async () => {
    console.log("Entra a filtrar");
    console.log(startDate);
    const filtered = await fetchBillingDataBetweenDates("month",
      new Date(startDate).toISOString().split(".")[0]
    );
    setMonthlyDataToShow(filtered);
    setTotalAmount(filtered.reduce((sum, day) => sum + day.totalAmount, 0));
  };
  console.log(monthlyDataToShow);

  const monthlyData2 = {
    labels: monthlyDataToShow.map((item) => new Date(item.date).toLocaleDateString()),
    datasets: [
      {
        label: "Facturación Diaria",
        data: monthlyDataToShow.map((item) => item.totalAmount),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <div className="flex items-center justify-center pt-4">
        <input
          type="date"
          value={new Date(startDate).toISOString().split("T")[0]}
          onChange={(e) => setStartDate(e.target.value)}
          className="mx-2 p-2 border border-gray-300 rounded shadow-sm"
        />

        <button
          onClick={filterData}
          className="mx-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Buscar
        </button>
      </div>
      <div className="flex justify-center  text-xl font-bold">
        <div className="flex mt-4 bg-gray-800 text-white p-1 rounded-lg">
          <h2> TOTAL: </h2>
          <h2 className="ml-4">{totalAmount.toFixed(2)} € </h2>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="max-w-4xl w-full overflow-x-auto mt-6">
          {monthlyData.length > 0 && <Bar data={monthlyData2} />}
        </div>
      </div>
    </div>
  );
};

export default MonthlyGraph;
