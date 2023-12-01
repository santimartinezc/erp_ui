import React, { useContext, useEffect, useState } from "react";
import { ProductsContextProvider } from "./ProductsContext";
import ProductDetailModal from "./ProductDetailModal"; // Importa tu componente modal
import ProductsTable from "./ProductTable";
import ProductsSearch from "./ProductsSearch";

const ProductView = () => {
  return (
    <ProductsContextProvider>
      <ProductsSearch />
      <ProductsTable />
    </ProductsContextProvider>
  );
};

export default ProductView;
