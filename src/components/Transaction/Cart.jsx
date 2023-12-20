//ProductTable
import React, { useContext, useEffect, useState } from "react";
import { TransactionContext } from "./TransactionContext";
import ProcessProductModal from "./ProcessProductModal"; // Importa tu componente modal
import EndOfTransactionModal from "./EndOfTransactionModal";

const TransactionTable = () => {
  const {
    productsInCart,
    modalOpened,
    endOfTransactionModalOpened,
    selectedProduct,
    handleProductClick,
    handleOpenModal,
    handleCloseModal,
    handleDeleteProduct,
    handleAddProductToCart,
    handleUpdateProductInCart,
    handleOpenEndOfTransactionModal,
    totalAmount,
    handleFinishTransaction,
    handleCancelEndOfTransaction,
  } = useContext(TransactionContext);

  console.log("modalOpened:", modalOpened);
  console.log(productsInCart);

  const isCartEmpty = () => {
    return productsInCart.length == 0;
  };
  const isButtonDisabled = isCartEmpty();

  return (
    <div className="flex justify-center">
      <div className="max-w-4xl w-full overflow-x-auto mt-6">
        <table className="min-w-full table-auto leading-normal">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300">ID</th>
              <th className="px-6 py-3 border-b-2 border-gray-300">
                Nombre del Producto
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300">
                Precio (€)
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300">Cantidad</th>
              <th className="px-6 py-3 border-b-2 border-gray-300">
                Impuestos (%)
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300">Importe</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {productsInCart.map((product) => (
              <tr
                key={product.productId}
                className="hover:bg-gray-100 cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                <td className="px-6 py-4 border-b border-gray-300">
                  {product.productId}
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  {product.productName}
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  {parseFloat(product.price).toFixed(2)}€
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  {product.quantity}
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  {product.taxes_pctg.toFixed(2)}%
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  {(product.quantity * product.price).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end bg-blue-700 text-white text-xl font-bold py-3 px-6">
          <h2 className="mr-4">IMPORTE TOTAL:</h2>
          <h2>{totalAmount.toFixed(2)} €</h2>
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={handleOpenModal}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors"
          >
            +
          </button>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleOpenEndOfTransactionModal}
            type="button"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isButtonDisabled}
          >
            FINALIZAR COMPRA
          </button>
        </div>
        {modalOpened && (
          <ProcessProductModal
            product={selectedProduct}
            onAdd={handleAddProductToCart}
            onModify={handleUpdateProductInCart}
            onClose={handleCloseModal}
            onFinishTransaction={handleOpenEndOfTransactionModal}
            onDelete={handleDeleteProduct}
          />
        )}
        {endOfTransactionModalOpened && (
          <EndOfTransactionModal
            onFinish={handleFinishTransaction}
            onCancel={handleCancelEndOfTransaction}
          />
        )}
      </div>
    </div>
  );
};

export default TransactionTable;
