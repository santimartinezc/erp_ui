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
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg w-1/2">
        <h2 className="text-xl font-bold mb-4">
          {operation == "create" && "Crear producto"}
          {operation == "update" && "Actualizar producto"}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Campos del formulario */}
          <div className="mb-4">
            <label className="block">Nombre del Producto</label>
            <input
              type="text"
              name="productName"
              value={updatedProduct.productName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block">Código de barras</label>
            <input
              type="text"
              name="barCode"
              value={updatedProduct.barCode}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          {barCodeInUse && (
            <p>Ya existe un producto con ese código de barras</p>
          )}
          <div className="mb-4">
            <label className="block">Precio (€)</label>
            <input
              type="text"
              name="price"
              value={updatedProduct.price}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block">Cantidad</label>
            <input
              type="text"
              name="quantity"
              value={updatedProduct.quantity}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block">Impuestos (%)</label>
            <input
              type="text"
              name="taxes_pctg"
              value={updatedProduct.taxes_pctg}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          {/* Agrega más campos según sea necesario */}
          <div className="flex justify-between">
            <div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 ${isButtonDisabled ? 'opacity-50 cursor-not-allowed'"
                disabled={isButtonDisabled}
              >
                {operation == "create" && "CREAR"}
                {operation == "update" && "ACTUALIZAR"}
              </button>
              <button
                onClick={onClose}
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 ml-2"
              >
                Cancelar
              </button>
            </div>
            {operation == "update" && (
              <button
                onClick={onDelete}
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 ml-2"
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
