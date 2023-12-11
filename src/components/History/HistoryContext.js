//TransactionContext
import { createContext, useState, useEffect, useContext } from "react";
import {
  deleteTransactionAPI,
  fetchBillingDataBetweenDates,
  fetchTransactionsBetweenDates,
  getAllTransactionsAPI,
  getLinesByTransactionIdAPI,
} from "../../api"; // Asume que las funciones están en services/transactionservice.js
export const HistoryContext = createContext();

export function HistoryContextProvider(props) {
  const [page, setPage] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [productsInTransaction, setProductsInTransaction] = useState(null);
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split(".")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split(".")[0]
  );

  console.log("History Context");
  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleChangePage = async (newPage) => {
    if (newPage >= 0) {
      // Asegúrate de que la nueva página no sea negativa
      setPage(newPage);
      await fetchTransactionsFiltered(); // Espera a que fetchtransactions se complete
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
      await fetchTransactionsFiltered();
    }
  };

  const fetchTransactionsFiltered = async () => {
    console.log(startDate);
    console.log(endDate);
    const fetchedtransactions = await fetchTransactionsBetweenDates(
      new Date(startDate).toISOString().split(".")[0],
      new Date(endDate).toISOString().split(".")[0]
    );
    setTransactions(fetchedtransactions);
  };

  const fetchWeeklyData = async () => {
    console.log(startDate);
    const fetchedWeeklyData = await fetchBillingDataBetweenDates("week",
      new Date(startDate).toISOString().split(".")[0]
    );
    setWeeklyData(fetchedWeeklyData);
  };

  const fetchMonthlyData = async () => {
    console.log(startDate);
    const fetchedMonthlyData = await fetchBillingDataBetweenDates("month",
      new Date(startDate).toISOString().split(".")[0]
    );
    setMonthlyData(fetchedMonthlyData);
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
    console.log(transactionDetails);
    setProductsInTransaction(transactionDetails);
  };

  return (
    <HistoryContext.Provider
      value={{
        transactions,
        fetchTransactionsFiltered,
        selectedTransaction,
        handleTransactionClick,
        handleCloseModal,
        handleDeleteTransaction,
        updateTransactionInList,
        page,
        handleChangePage,
        productsInTransaction,
        handleFindTransactionDetais,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        fetchWeeklyData,
        weeklyData,
        fetchMonthlyData,
        monthlyData,
      }}
    >
      {props.children}
    </HistoryContext.Provider>
  );
}
