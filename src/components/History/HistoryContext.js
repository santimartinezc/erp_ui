//TransactionContext
import { createContext, useState, useEffect, useContext } from "react";
import {
  deleteTransactionAPI,
  getAllTransactionsAPI,
  getLinesByTransactionIdAPI,
} from "../../api"; // Asume que las funciones están en services/transactionservice.js
export const HistoryContext = createContext();

export function HistoryContextProvider(props) {
  const [page, setPage] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [productsInTransaction, setProductsInTransaction] = useState(null);

  console.log("History Context");
  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleChangePage = async (newPage) => {
    if (newPage >= 0) {
      // Asegúrate de que la nueva página no sea negativa
      setPage(newPage);
      await fetchTransactions(); // Espera a que fetchtransactions se complete
    }
  };

  const handleCloseModal = () => {
    setSelectedTransaction(null);
  };

  const handleDeleteTransaction = async () => {
    const confirmDelete = window.confirm(
      "Quieres borrar el transactiono? Esta operación no se puede deshacer"
    );
    if (confirmDelete) {
      await deleteTransactionAPI(selectedTransaction.transactionId);
      setSelectedTransaction(null);
      await fetchTransactions();
    }
  };

  const fetchTransactions = async () => {
    const fetchedtransactions = await getAllTransactionsAPI(page);
    setTransactions(fetchedtransactions);
  };

  const updateTransactionInList = (updatedTransaction) => {
    setTransactions(
      transactions.map((transaction) => {
        if (transaction.transactionId === updatedTransaction.transactionId) {
          return updatedTransaction;
        }
        return transaction;
      })
    );
  };

  const handleFindTransactionDetais = async (transactionId) => {
    const transactionDetails = await getLinesByTransactionIdAPI(transactionId);
    console.log(transactionDetails)
    setProductsInTransaction(transactionDetails);
  };

  return (
    <HistoryContext.Provider
      value={{
        transactions,
        fetchTransactions,
        selectedTransaction,
        handleTransactionClick,
        handleCloseModal,
        handleDeleteTransaction,
        updateTransactionInList,
        page,
        handleChangePage,
        productsInTransaction,
        handleFindTransactionDetais,
      }}
    >
      {props.children}
    </HistoryContext.Provider>
  );
}
