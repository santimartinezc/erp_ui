//ProductTable
import React, { useContext, useEffect, useState } from "react";
import { TransactionContext } from "./TransactionContext";
import ProcessProductModal from "./ProcessProductModal"; // Importa tu componente modal

const TransactionTable = () => {
  const {
    productsInCart,
    modalOpened,
    selectedProduct,
    handleProductClick,
    handleOpenModal,
    handleCloseModal,
    handleDeleteProduct,
    handleAddProductToCart,
    handleUpdateProductInCart,
  } = useContext(TransactionContext);

  console.log("modalOpened:", modalOpened);
  if (productsInCart.length == 0)
    return (
      <div>
        Cesta de la compra vacía
        <ProcessProductModal
          product={selectedProduct}
          onAdd={handleAddProductToCart}
          onClose={handleCloseModal}
          onDelete={handleDeleteProduct}
        />
      </div>
    );

  return (
    <div>
      <div className="flex justify-center">
        <div className="max-w-4xl w-full overflow-x-auto mt-6">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Nombre del Producto</th>
                <th className="px-4 py-2">Precio (€)</th>
                <th className="px-4 py-2">Cantidad</th>
                <th className="px-4 py-2">Impuestos (%)</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {productsInCart.map((product) => (
                <tr
                  key={product.productId}
                  className="border-b cursor-pointer"
                  onClick={() => handleProductClick(product)}
                >
                  <td className="px-4 py-2 border">{product.productId}</td>
                  <td className="px-4 py-2 border">{product.productName}</td>
                  <td className="px-4 py-2 border">
                    {product.price.toFixed(2)}€
                  </td>
                  <td className="px-4 py-2 border">{product.quantity}</td>
                  <td className="px-4 py-2 border">
                    {product.taxes_pctg.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Botón para abrir el modal */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handleOpenModal}
          className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4"
        >
          +
        </button>
      </div>
      {modalOpened && (
        <ProcessProductModal
          product={selectedProduct}
          onAdd={handleAddProductToCart}
          onModify={handleUpdateProductInCart}
          onClose={handleCloseModal}
          onDelete={handleDeleteProduct}
        />
      )}
    </div>
  );
};

export default TransactionTable;
