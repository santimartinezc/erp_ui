// ProductDetailModal.js
import React, { useContext, useState } from "react";
import { createProductAPI, updateProductAPI } from "../../api"; // Asume que las funciones están en services/productService.js
import { ProductsContext } from "./ProductsContext";

const ProductDetailModal = ({ operation, product, onClose, onDelete }) => {
  const { updateProductInList } = useContext(ProductsContext);

  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [barCodeInUse, setBarCodeInUse] = useState(false);

  const handleChange = (e) => {
    console.log(e.target.name);
    setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Lógica para actualizar el producto
    if (operation == "update") {
      const res = await updateProductAPI(
        updatedProduct.productId,
        updatedProduct
      );
      updateProductInList(updatedProduct);
      if (!res) setBarCodeInUse(true);
      else setBarCodeInUse(false);
      console.log("Producto actualizado: ", updatedProduct);
    }
    if (operation == "create") {
      const res = await createProductAPI(updatedProduct);
      if (!res) setBarCodeInUse(true);
      else setBarCodeInUse(false);
      console.log("Producto creado: ", updatedProduct);
    }
    onClose(); // Cerrar modal después de la actualización
  };

  const isFormValid = () => {
    return (
      updatedProduct.productName &&
      updatedProduct.price &&
      updatedProduct.quantity &&
      updatedProduct.taxes_pctg
    );
  };
  const isButtonDisabled = !isFormValid();

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-1/2 mx-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {operation === "create" ? "Crear producto" : "Actualizar producto"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Nombre del Producto
            </label>
            <input
              type="text"
              name="productName"
              value={updatedProduct.productName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Código de barras
            </label>
            <input
              type="text"
              name="barCode"
              value={updatedProduct.barCode}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {barCodeInUse && (
              <p className="text-red-600 text-sm mt-2">
                Ya existe un producto con ese código de barras
              </p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Precio (€)
            </label>
            <input
              type="text"
              name="price"
              value={updatedProduct.price}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Cantidad
            </label>
            <input
              type="text"
              name="quantity"
              value={updatedProduct.quantity}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Impuestos (%)
            </label>
            <input
              type="text"
              name="taxes_pctg"
              value={updatedProduct.taxes_pctg}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                disabled={isButtonDisabled}
              >
                {operation === "create" ? "CREAR" : "ACTUALIZAR"}
              </button>
              <button
                onClick={onClose}
                type="button"
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              >
                Cancelar
              </button>
            </div>
            {operation === "update" && (
              <button
                onClick={onDelete}
                type="button"
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Eliminar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductDetailModal;
