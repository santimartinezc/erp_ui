//ProductSearch
import React, { useContext, useState } from "react";
import { ProductsContext } from "./ProductsContext";

const ProductsSearch = () => {
  const { handleSearch } = useContext(ProductsContext);

  const [barCode, setBarCode] = useState("");
  //Añadir lógica si no se encuentra el producto. Ahora mismo no pasa nada porque "selectedProduct"
  //se queda nulo, por lo que no se abre el diálogo
  return (
    <div className="flex justify-center mt-4">
      <div className="flex w-full px-4 py-6 bg-white  max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
        {/* <div className="flex"> */}
        <input
          type="text"
          value={barCode}
          onChange={(e) => setBarCode(e.target.value)}
          placeholder="Introduce el código de barras"
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-l shadow appearance-none focus:outline-none focus:shadow-outline"
        />
        <button
          onClick={() => handleSearch(barCode)}
          className="px-4 py-2 text-white bg-blue-500 rounded-r hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        >
          Buscar
        </button>
        {/* </div> */}
      </div>
    </div>
  );
};

export default ProductsSearch;
