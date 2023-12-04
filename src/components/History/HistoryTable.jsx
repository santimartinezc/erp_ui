// import React from "react";
import React, { useContext, useEffect, useState } from "react";
import { HistoryContext } from "./HistoryContext";
import TransactionDetail from "./TransactionDetail";

const HistoryTable = () => {
  const { transactions, fetchTransactions, page, handleFindTransactionDetais } =
    useContext(HistoryContext);
  const [transactionsToShow, setTransactionsToShow] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    setTransactionsToShow(transactions);
  }, [transactions]);

  useEffect(() => {
    fetchTransactions(); // Esto se llamará cada vez que page cambie
    setTransactionsToShow(transactions);
  }, [page]); // Agregar page a la lista de dependencias

  if (!transactionsToShow) return <div>Loading</div>;

  const handleRowClick = async (transactionId) => {
    setSelectedTransaction(
      selectedTransaction === transactionId ? null : transactionId
    );
    await handleFindTransactionDetais(transactionId);
  };

  console.log(transactionsToShow);
  return (
    <div>
      <div className="flex justify-center">
        <div className="max-w-4xl w-full overflow-x-auto mt-6">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2 border-2">ID</th>
                <th className="px-4 py-2 border-2">Fecha</th>
                <th className="px-4 py-2 border-2">Hora</th>
                <th className="px-4 py-2 border-2">Vendedor</th>
                <th className="px-4 py-2 border-2">Importe total (€)</th>
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
                      {transaction.totalAmount}
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
      {/* <div className="flex justify-center mt-4">
        <button onClick={() => handleChangePage(page - 1)}>◀-  </button>
        <p>{page}</p>
        <button onClick={() => handleChangePage(page + 1)}> -▶</button>
      </div> */}
      {/* {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={handleCloseModal}
          onDelete={handleDeleteProduct}
        />
      )} */}
    </div>
  );
};

export default HistoryTable;
