// import React from "react";
import React, { useContext, useEffect, useState } from "react";
import { HistoryContext } from "./HistoryContext";
import TransactionDetail from "./TransactionDetail";
import { fetchTransactionsBetweenDates } from "../../api";

const HistoryTable = () => {
  const {
    transactions,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    fetchTransactionsFiltered,
    handleFindTransactionDetais,
  } = useContext(HistoryContext);
  const [transactionsToShow, setTransactionsToShow] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const [totalAmountRange, setTotalAmountRange] = useState(0);

  useEffect(() => {
    fetchTransactionsFiltered();
  }, []);

  useEffect(() => {
    setTransactionsToShow(transactions);
    setTotalAmountRange(
      transactions.reduce(
        (sum, transaction) => sum + transaction.totalAmount,
        0
      )
    );
  }, [transactions]);

  const handleRowClick = async (transactionId) => {
    setSelectedTransaction(
      selectedTransaction === transactionId ? null : transactionId
    );
    await handleFindTransactionDetais(transactionId);
  };

  const filterTransactions = async () => {
    console.log("Entra a filtrar");
    const filtered = await fetchTransactionsBetweenDates(
      new Date(startDate).toISOString().split(".")[0],
      new Date(endDate).toISOString().split(".")[0]
    );
    setTransactionsToShow(filtered);
    setTotalAmountRange(
      filtered.reduce((sum, transaction) => sum + transaction.totalAmount, 0)
    );
  };
  console.log(transactionsToShow);

  if (!transactionsToShow) return <div>Cargando...</div>;
  return (
    <div>
      <div className="flex items-center justify-center py-6">
        <input
          type="date"
          value={new Date(startDate).toISOString().split("T")[0]}
          onChange={(e) => setStartDate(e.target.value)}
          className="mx-2 p-3 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <input
          type="date"
          value={new Date(endDate).toISOString().split("T")[0]}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          onClick={filterTransactions}
          className="mx-4 px-5 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Filtrar
        </button>
      </div>
      <div className="flex justify-center">
        <div className="max-w-4xl w-full overflow-x-auto mt-6">
          <div className="flex justify-end text-xl font-bold mb-4">
            <div className="flex bg-blue-500 text-white py-2 px-4 rounded-lg shadow">
              <h2 className="mr-4">TOTAL:</h2>
              <h2>{totalAmountRange.toFixed(2)} €</h2>
            </div>
          </div>
          <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-4 py-3 border-2">ID</th>
                <th className="px-4 py-3 border-2">Fecha</th>
                <th className="px-4 py-3 border-2">Hora</th>
                <th className="px-4 py-3 border-2">Vendedor</th>
                <th className="px-4 py-3 border-2">Importe total</th>
              </tr>
            </thead>
            <tbody>
              {transactionsToShow.length === 0 && (
                <tr key="NoTransitions" className="border-b">
                  <td className="px-4 py-3 text-center" colSpan="5">
                    {"No hay datos"}
                  </td>
                </tr>
              )}
              {transactionsToShow.map((transaction) => (
                <React.Fragment key={transaction.transactionId}>
                  <tr
                    className="border-b hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleRowClick(transaction.transactionId)}
                  >
                    <td className="px-4 py-3 border">
                      {transaction.transactionId}
                    </td>
                    <td className="px-4 py-3 border">
                      {Intl.DateTimeFormat("es-ES", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                      }).format(new Date(transaction.createdAt))}
                    </td>
                    <td className="px-4 py-2 border">
                      {Intl.DateTimeFormat("es-ES", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      }).format(new Date(transaction.createdAt))}
                    </td>
                    <td className="px-4 py-3 border">{transaction.vendorId}</td>
                    <td className="px-4 py-3 border">
                      {transaction.totalAmount.toFixed(2)} €
                    </td>
                  </tr>
                  {selectedTransaction === transaction.transactionId && (
                    <tr>
                      <td colSpan="5">
                        <TransactionDetail />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistoryTable;
