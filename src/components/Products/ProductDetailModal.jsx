// ProductDetailModal.js
import React, { useContext, useState } from "react";
import { updateProductAPI } from "../../api"; // Asume que las funciones están en services/productService.js
import { ProductsContext } from "./ProductsContext";

const ProductDetailModal = ({ product, onClose, onDelete }) => {
  const { updateProductInList } = useContext(ProductsContext);

  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleChange = (e) => {
    setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Lógica para actualizar el producto
    await updateProductAPI(updatedProduct.productId, updatedProduct);
    updateProductInList(updatedProduct);
    console.log("Producto actualizado: ", updatedProduct);
    onClose(); // Cerrar modal después de la actualización
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg w-1/2">
        <h2 className="text-xl font-bold mb-4">Actualizar Producto</h2>
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
            <label className="block">Códgio de barras</label>
            <input
              type="text"
              name="quantity"
              value={updatedProduct.barCode}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
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
              name="quantity"
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
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Actualizar
              </button>
              <button
                onClick={onClose}
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 ml-2"
              >
                Cancelar
              </button>
            </div>
            <button
              onClick={onDelete}
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 ml-2"
            >
              Eliminar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductDetailModal;
