import React, { useContext, useEffect, useState } from "react";
import { TransactionContextProvider } from "./TransactionContext";
import Cart from "./Cart";
import ProcessProductModal from "./ProcessProductModal";

const ProductView = () => {
  return (
    <TransactionContextProvider>
      <Cart />
      {/* <ProcessProductModal /> */}
    </TransactionContextProvider>
  );
};

export default ProductView;
