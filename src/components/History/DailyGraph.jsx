// import React from "react";
import React, { useContext, useEffect, useState } from "react";
import { HistoryContext } from "./HistoryContext";
import { fetchTransactionsBetweenDates } from "../../api";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const DailyGraph = () => {
  const { transactions, startDate, setStartDate, fetchTransactionsFiltered } =
    useContext(HistoryContext);
  const [transactionsToShow, setTransactionsToShow] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    fetchTransactionsFiltered();
  }, []);

  useEffect(() => {
    setTransactionsToShow(transactions);
    setTotalAmount(
      transactions.reduce(
        (sum, transaction) => sum + transaction.totalAmount,
        0
      )
    );
  }, [transactions]);

  const filterTransactions = async () => {
    console.log("Entra a filtrar");
    console.log(startDate);
    const filtered = await fetchTransactionsBetweenDates(
      new Date(startDate).toISOString().split(".")[0],
      new Date(startDate).toISOString().split(".")[0]
    );
    setTransactionsToShow(filtered);
    setTotalAmount(
      filtered.reduce((sum, transaction) => sum + transaction.totalAmount, 0)
    );
  };
  console.log(transactionsToShow);

  const hours = Array.from({ length: 13 }, (_, i) => 9 + i);
  const totalsByHour = hours.map((hour) => {
    return transactionsToShow
      .filter((transaction) => {
        const transactionHour = new Date(transaction.createdAt).getHours();
        return transactionHour === hour;
      })
      .reduce((sum, transaction) => sum + transaction.totalAmount, 0);
  });

  const dataDaily = {
    labels: hours.map((hour) => `${hour}:00`),
    datasets: [
      {
        label: "Facturación por Hora",
        data: totalsByHour,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
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
          onClick={filterTransactions}
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
          <Bar data={dataDaily} />
        </div>
      </div>
    </div>
  );
};

export default DailyGraph;
