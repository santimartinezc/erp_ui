// ProductDetailModal.js
import React, { useContext, useEffect, useState } from "react";
import { TransactionContext } from "./TransactionContext";

const ProductDetailModal = ({
  product,
  onAdd,
  onClose,
  onModify,
  onDelete,
}) => {
  const { handleUpdateProductInCart, handleSearch, selectedProduct } =
    useContext(TransactionContext);

  const [barCode, setBarCode] = useState("");
  const [processingProduct, setprocessingProduct] = useState(product);
  const [productNotFound, setProductNotFound] = useState(false);
  const [editing, setEditing] = useState(false);

  let keep;
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
    if (selectedProduct) setprocessingProduct(selectedProduct);
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
    return processingProduct.productName && processingProduct.price;
  };
  const isButtonDisabled = !isFormValid();

  console.log(processingProduct);
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-5 shadow-lg w-1/2">
        {!editing && (
          <div className="flex w-full px-4 py-6 bg-white  max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
            {/* <div className="flex"> */}
            <input
              type="text"
              value={barCode}
              onChange={(e) => setBarCode(e.target.value)}
              placeholder="Introduce el código de barras"
              className="w-full px-3 py-2 leading-tight text-gray-700 border shadow appearance-none focus:outline-none focus:shadow-outline"
            />
            <button
              onClick={() => handleSearch(barCode)}
              className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-700"
            >
              Buscar
            </button>
          </div>
        )}
        {productNotFound && (
          <p className="text-red-600 font-bold">Producto no encontrado</p>
        )}
        <form onSubmit={handleSubmit}>
          {/* Campos del formulario */}
          <div className="mb-4">
            <label className="block">Nombre del Producto</label>
            <input
              type="text"
              name="productName"
              value={processingProduct.productName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block">Precio (€)</label>
            <input
              type="text"
              name="price"
              value={processingProduct.price}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block">Cantidad</label>
            <input
              type="text"
              name="quantity"
              value={processingProduct.quantity}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block">Impuestos (%)</label>
            <input
              type="text"
              name="quantity"
              value={processingProduct.taxes_pctg}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 mt-1"
            />
          </div>
          {/* Agrega más campos según sea necesario */}
          <div className="flex justify-between">
            <div>
              {!editing && (
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 ${isButtonDisabled ? 'opacity-50 cursor-not-allowed'"
                  disabled={isButtonDisabled}
                >
                  Añadir
                </button>
              )}
              {!editing && (
                <button
                  onClick={onClose}
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 ml-2"
                >
                  Cancelar
                </button>
              )}
              {editing && (
                <button
                  onClick={() => {
                    onModify(processingProduct);
                  }} // onClick={onClose}
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 ${isButtonDisabled ? 'opacity-50 cursor-not-allowed'"
                  disabled={isButtonDisabled}
                >
                  Aceptar
                </button>
              )}
            </div>

            {!editing && (
              <button
                onClick={() => {}}
                type="button"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 ml-2"
              >
                FINALIZAR COMPRA
              </button>
            )}
            {editing && (
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
