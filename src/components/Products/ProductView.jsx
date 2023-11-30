import React, { useContext, useEffect, useState } from "react";
import { ProductsContextProvider } from "./ProductsContext";
import ProductDetailModal from "./ProductDetailModal"; // Importa tu componente modal
import ProductsTable from "./ProductTable";

const ProductView = () => {
  return (
    <ProductsContextProvider>
      <ProductsTable />
    </ProductsContextProvider>
  );
};

export default ProductView;
