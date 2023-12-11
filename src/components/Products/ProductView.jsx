import React, { useContext, useEffect, useState } from "react";
import { ProductsContextProvider } from "./ProductsContext";
import ProductDetailModal from "./ProductDetailModal"; // Importa tu componente modal
import ProductsTable from "./ProductTable";
import ProductsSearch from "./ProductsSearch";
import NewProduct from "./NewProduct";
import Menu from "./Menu";

const ProductView = () => {
  const [activeSection, setActiveSection] = useState("Inicio");

  const renderContent = () => {
    switch (activeSection) {
      case "products":
        return (
          <>
            <ProductsSearch />
            <ProductsTable />
          </>
        );
      case "new_product":
        return <NewProduct setActiveSection={setActiveSection} />;
      default:
        return (
          <>
            <ProductsSearch />
            <ProductsTable />
          </>
        );
    }
  };

  return (
    <ProductsContextProvider>
      <div className="flex">
        <Menu
          setActiveSection={setActiveSection}
          activeSection={activeSection}
        />
        <div className="w-4/5">{renderContent()}</div>
      </div>
    </ProductsContextProvider>
  );
};

export default ProductView;
