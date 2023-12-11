//ProductTable
import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "./ProductsContext";
import ProductDetailModal from "./ProductDetailModal"; // Importa tu componente modal

// const Menu = ({ setActiveSection, activeSection }) => {

const NewProduct = ({ setActiveSection }) => {
  const { handleCloseModal } = useContext(ProductsContext);

  const handleCloseModal2 = () => {
    handleCloseModal();
    setActiveSection("products");
  };
  return (
    <ProductDetailModal
      operation={"create"}
      product={{
        productName: "",
        barCode: "",
        price: "",
        quantity: "",
        taxes_pctg: "",
      }}
      onClose={handleCloseModal2}
      onDelete={() => {}}
    />
  );
};

export default NewProduct;
