// ProductDetailModal.js
import React, { useContext, useEffect, useState } from "react";
import { TransactionContext } from "./TransactionContext";

const ProductDetailModal = ({
  product,
  onAdd,
  onClose,
  onModify,
  onFinishTransaction,
  onDelete,
  productsInCart,
}) => {
  const { handleUpdateProductInCart, handleSearch, selectedProduct } =
    useContext(TransactionContext);

  const [barCode, setBarCode] = useState("");
  const [processingProduct, setprocessingProduct] = useState(product);
  const [productNotFound, setProductNotFound] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    console.log(product);
    console.log("Barcode::", product.barCode);
    if (product.barCode != "") {
      console.log("Cambia a true");
      setEditing(true);
      console.log(editing);
    }
  }, []);

  useEffect(() => {
    setProductNotFound(false);
    if (!product) {
      setProductNotFound(true);
      setprocessingProduct({
        productName: "",
        barCode: "",
        price: "",
        quantity: "",
        taxes_pctg: "",
      });
    }
  }, [product]);
  useEffect(() => {
    if (selectedProduct) {
      selectedProduct.quantity = 1;
      setprocessingProduct(selectedProduct);
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    setprocessingProduct({
      ...processingProduct,
      [e.target.name]: e.target.value,
    });
  };

  console.log(productNotFound);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // handleUpdateProductInCart(processingProduct);
    // console.log("Producto añadido: ", processingProduct);
    onAdd(processingProduct); // Cerrar modal después de la actualización
    setBarCode("");
    setprocessingProduct({
      productName: "",
      barCode: "",
      price: "",
      quantity: "",
      taxes_pctg: "",
    });
  };

  const isFormValid = () => {
    return (
      processingProduct.productName &&
      processingProduct.price &&
      processingProduct.quantity
    );
  };
  const isButtonDisabled = !isFormValid();

  const isCartEmpty = !productsInCart;
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-4 md:p-6 shadow-xl rounded-lg w-full max-w-2xl mx-4">
        {!editing && (
          <div className="flex flex-col md:flex-row w-full py-4">
            <input
              type="text"
              value={barCode}
              onChange={(e) => setBarCode(e.target.value)}
              placeholder="Introduce el código de barras"
              className="w-full mb-4 md:mb-0 md:mr-4 px-3 py-2 text-gray-700 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              onClick={() => handleSearch(barCode)}
              className="w-full md:w-auto px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Buscar
            </button>
          </div>
        )}
        {productNotFound && (
          <p className="text-red-600 font-bold text-center mt-4">
            Producto no encontrado
          </p>
        )}
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Nombre del Producto
              </label>
              <input
                type="text"
                name="productName"
                value={processingProduct.productName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="flex flex-wrap -mx-2">
              <div className="px-2 w-full sm:w-1/3 mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Precio (€)
                </label>
                <input
                  type="text"
                  name="price"
                  value={processingProduct.price}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div className="px-2 w-full sm:w-1/3 mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Cantidad
                </label>
                <input
                  type="text"
                  name="quantity"
                  value={processingProduct.quantity}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div className="px-2 w-full sm:w-1/3 mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Impuestos (%)
                </label>
                <input
                  type="text"
                  name="taxes_pctg"
                  value={processingProduct.taxes_pctg}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center mt-6">
              <div className="flex space-x-2 mb-4 md:mb-0">
                {!editing && (
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
                    disabled={isButtonDisabled}
                  >
                    Añadir
                  </button>
                )}
                {!editing && (
                  <button
                    onClick={onClose}
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors w-full md:w-auto"
                  >
                    Cerrar
                  </button>
                )}
                {editing && (
                  <button
                    onClick={() => {
                      onModify(processingProduct);
                    }}
                    type="button"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
                    disabled={isButtonDisabled}
                  >
                    Aceptar
                  </button>
                )}
              </div>
              {!editing && (
                <button
                  onClick={onFinishTransaction}
                  type="button"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
                  disabled={isCartEmpty}
                >
                  FINALIZAR COMPRA
                </button>
              )}
              {editing && (
                <button
                  onClick={onDelete}
                  type="button"
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors w-full md:w-auto"
                >
                  Eliminar
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductDetailModal;
