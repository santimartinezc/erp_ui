//ProductTable
import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "./ProductsContext";
import ProductDetailModal from "./ProductDetailModal"; // Importa tu componente modal

const ProductsTable = () => {
  const {
    products,
    fetchProducts,
    selectedProduct,
    handleProductClick,
    handleCloseModal,
    handleChangePage,
    handleDeleteProduct,
    page,
  } = useContext(ProductsContext);

  const [productsToShow, setProductsToShow] = useState([]);
  useEffect(() => {
    console.log("Entra");
    setProductsToShow(products);
  }, [products]);

  useEffect(() => {
    fetchProducts(); // Esto se llamará cada vez que page cambie
    setProductsToShow(products);
  }, [page]); // Agregar page a la lista de dependencias

  // Renderizar los productos
  console.log(productsToShow);
  if (!productsToShow) return <div>Cargando...</div>;

  return (
    <div>
      <div className="flex justify-center">
        <div className="max-w-4xl w-full overflow-x-auto mt-6">
          <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
            <thead className="bg-blue-800 text-white">
              <tr>
                <th className="px-6 py-3 text-left">ID</th>
                <th className="px-6 py-3 text-left">Nombre del Producto</th>
                <th className="px-6 py-3 text-left">Precio (€)</th>
                <th className="px-6 py-3 text-left">Cantidad</th>
                <th className="px-6 py-3 text-left">Impuestos (%)</th>
              </tr>
            </thead>
            <tbody>
              {productsToShow.map((product) => (
                <tr
                  key={product.productId}
                  className="border-b last:border-none hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleProductClick(product)}
                >
                  <td className="px-6 py-4 text-gray-700">
                    {product.productId}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {product.productName}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {parseFloat(product.price).toFixed(2)}€
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {product.quantity}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {product.taxes_pctg.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center mt-6 mb-3">
        <button
          onClick={() => handleChangePage(page - 1)}
          className="text-white bg-blue-500 hover:bg-blue-600 font-bold py-2 px-4 rounded-l-lg"
        >
          ◀
        </button>
        <p className="py-2 px-4 bg-white border-t border-b text-gray-700">
          {page}
        </p>
        <button
          onClick={() => handleChangePage(page + 1)}
          className="text-white bg-blue-500 hover:bg-blue-600 font-bold py-2 px-4 rounded-r-lg"
        >
          ▶
        </button>
      </div>
      {selectedProduct && (
        <ProductDetailModal
          operation={"update"}
          product={selectedProduct}
          onClose={handleCloseModal}
          onDelete={handleDeleteProduct}
        />
      )}
    </div>
  );
};

export default ProductsTable;
