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
    const filtered = await fetchTransactionsBetweenDates(new Date(startDate).toISOString().split(".")[0], new Date(endDate).toISOString().split(".")[0]);
    setTransactionsToShow(filtered);
    setTotalAmountRange(
      filtered.reduce((sum, transaction) => sum + transaction.totalAmount, 0)
    );
  };
  console.log(transactionsToShow);

  if (!transactionsToShow) return <div>Cargando...</div>;
  return (
    <div>
      <div className="flex items-center justify-center pt-4">
        <input
          type="date"
          value={new Date(startDate).toISOString().split("T")[0]}
          onChange={(e) => setStartDate(e.target.value)}
          className="mx-2 p-2 border border-gray-300 rounded shadow-sm"
          />
        <input
          type="date"
          value={new Date(endDate).toISOString().split("T")[0]}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 border border-gray-300 rounded shadow-sm"
        />

        <button
          onClick={filterTransactions}
          className="mx-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Filtrar
        </button>
      </div>
      <div className="flex justify-center">
        <div className="max-w-4xl w-full overflow-x-auto mt-6">
          <div className="flex justify-end  text-xl font-bold">
            <div className="flex bg-gray-800 text-white p-1 rounded-lg">
              <h2 className="mr-4"> TOTAL: </h2>
              <h2 className="mr-4">{totalAmountRange.toFixed(2)} € </h2>
            </div>
          </div>
          <table className="min-w-full table-auto">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2 border-2">ID</th>
                <th className="px-4 py-2 border-2">Fecha</th>
                <th className="px-4 py-2 border-2">Hora</th>
                <th className="px-4 py-2 border-2">Vendedor</th>
                <th className="px-4 py-2 border-2">Importe total</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {transactionsToShow.map((transaction) => (
                <>
                  <tr
                    key={transaction.transactionId}
                    className="border-b cursor-pointer"
                    onClick={() => handleRowClick(transaction.transactionId)}
                  >
                    <td className="px-4 py-2 border">
                      {transaction.transactionId}
                    </td>
                    {/* <td className="px-4 py-2 border">{transaction.createdAt}</td> */}
                    <td className="px-4 py-2 border">
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
                    <td className="px-4 py-2 border">{transaction.vendorId}</td>
                    <td className="px-4 py-2 border">
                      {transaction.totalAmount.toFixed(2)} €
                    </td>
                  </tr>
                  {selectedTransaction === transaction.transactionId && (
                    <tr>
                      <td colSpan="5">
                        {/* Aquí renderizas los detalles de la transacción */}
                        {/* Detalles de la Transacción... */}
                        <TransactionDetail />
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistoryTable;
