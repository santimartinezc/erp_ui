// EndOfTransactionModal.js
import React, { useContext, useState } from "react";
import { TransactionContext } from "./TransactionContext";

const EndOfTransactionModal = ({ onFinish, onCancel }) => {
  const {
    handleUpdateProductInCart,
    handleSearch,
    selectedProduct,
    totalAmount,
    handleFinish,
    handleCancel,
  } = useContext(TransactionContext);

  const [amountGiven, setAmountGiven] = useState(0);
  const [changeDue, setChangeDue] = useState(0);

  // const totalAmount = calculateTotal(); // Asegúrate de que esta función esté implementada

  const handleAmountGivenChange = (e) => {
    const amount = parseFloat(e.target.value);
    if (!isNaN(amount) || e.target.value == "") {
      setAmountGiven(amount);
      if (amount > totalAmount) setChangeDue(amount - totalAmount);
      else {
        setChangeDue(0);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-1/3">
        <h2 className="text-xl font-semibold mb-4">Finalizar Transacción</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Importe Total
          </label>
          <p className="p-2 bg-gray-100 rounded">{totalAmount} €</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Cantidad Aportada por el Cliente
          </label>
          <input
            type="number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={amountGiven}
            onChange={handleAmountGivenChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Cambio a Devolver
          </label>
          <p className="p-2 bg-gray-100 rounded">{changeDue.toFixed(2)}</p>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={onFinish}
          >
            Finalizar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndOfTransactionModal;
