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
              {productsToShow.map((product) => (
                <tr
                  key={product.productId}
                  className="border-b cursor-pointer"
                  onClick={() => handleProductClick(product)}
                >
                  <td className="px-4 py-2 border">{product.productId}</td>
                  <td className="px-4 py-2 border">{product.productName}</td>
                  <td className="px-4 py-2 border">
                    {parseFloat(product.price).toFixed(2)}€
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
      <div className="flex justify-center mt-4">
        <button onClick={() => handleChangePage(page - 1)}>◀-  </button>
        <p>{page}</p>
        <button onClick={() => handleChangePage(page + 1)}> -▶</button>
      </div>
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={handleCloseModal}
          onDelete={handleDeleteProduct}
        />
      )}
    </div>
  );
};

export default ProductsTable;
