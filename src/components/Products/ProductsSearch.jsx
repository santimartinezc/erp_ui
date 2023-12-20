//ProductSearch
import React, { useContext, useState } from "react";
import { ProductsContext } from "./ProductsContext";

const ProductsSearch = () => {
  const { handleSearch, productNotFound } = useContext(ProductsContext);

  const [barCode, setBarCode] = useState("");
  //Añadir lógica si no se encuentra el producto. Ahora mismo no pasa nada porque "selectedProduct"
  //se queda nulo, por lo que no se abre el diálogo
  return (
    <div>
      <div className="flex justify-center mt-6">
        <div className="flex w-full px-4 py-4 bg-white shadow-lg max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg">
          <input
            type="text"
            value={barCode}
            onChange={(e) => setBarCode(e.target.value)}
            placeholder="Introduce el código de barras"
            className="flex-grow px-4 py-3 leading-tight text-gray-700 border border-r-0 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => handleSearch(barCode)}
            className="px-6 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Buscar
          </button>
        </div>
      </div>
      {productNotFound && (
        <div className="flex justify-center mt-4">
          <p className="text-red-600 text-sm md:text-base">
            Producto no encontrado.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductsSearch;
