//ProductContext
import { createContext, useState, useEffect, useContext } from "react";
import {
  createLinesAPI,
  createTransactionAPI,
  getAllTransactionsAPI,
  getProductByBarCodeAPI,
} from "../../api"; // Asume que las funciones están en services/Transactionervice.js
export const TransactionContext = createContext();

export function TransactionContextProvider(props) {
  const [modalOpened, setModalOpened] = useState(true);
  const [endOfTransactionModalOpened, setEndOfTransactionModalOpened] =
    useState(false);
  const [productsInCart, setProductsInCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({
    productName: "",
    barCode: "",
    price: "",
    quantity: "",
    taxes_pctg: "",
  });
  const totalAmount = productsInCart.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setModalOpened(true);
  };

  const handleAddProductToCart = (product) => {
    setProductsInCart([...productsInCart, product]);
    setSelectedProduct({
      productName: "",
      barCode: "",
      price: "",
      quantity: "",
      taxes_pctg: "",
    });
  };

  const handleCloseModal = () => {
    setSelectedProduct({
      productName: "",
      barCode: "",
      price: "",
      quantity: "",
      taxes_pctg: "",
    });
    setModalOpened(false);
  };

  const handleOpenModal = () => {
    setSelectedProduct({
      productName: "",
      barCode: "",
      price: "",
      quantity: "",
      taxes_pctg: "",
    });
    setModalOpened(true);
  };

  const handleOpenEndOfTransactionModal = () => {
    setEndOfTransactionModalOpened(true);
  };

  const handleDeleteProduct = async () => {
    console.log("sacar producto del carrito:", selectedProduct);
    setSelectedProduct({
      productName: "",
      barCode: "",
      price: "",
      quantity: "",
      taxes_pctg: "",
    });
    setModalOpened(false);
  };

  const sendTransaction = async () => {
    console.log("Enviar transacción a back");
  };

  const handleSearch = async (barCode) => {
    const fetchedProduct = await getProductByBarCodeAPI(barCode);
    setSelectedProduct(fetchedProduct);
    console.log(fetchedProduct);
  };

  const handleUpdateProductInCart = (updatedProduct) => {
    console.log("entra");
    setProductsInCart(
      productsInCart.map((product) => {
        if (product.productId === updatedProduct.productId) {
          return updatedProduct;
        }
        return product;
      })
    );
    setModalOpened(false);
  };

  const handleCancelEndOfTransaction = () => {
    setEndOfTransactionModalOpened(false);
  };
  const handleFinishTransaction = async () => {
    const transaction = {
      vendorId: 1,
      totalAmount: totalAmount,
    };
    const transactionId = await createTransactionAPI(transaction);
    if (transactionId) {
      const lines = productsInCart.map(({ barCode, ...item }) => ({
        ...item,
        transactionId: transactionId,
      }));
      createLinesAPI(lines, transactionId);
    }

    setModalOpened(true);
    setEndOfTransactionModalOpened(false);
    setProductsInCart([]);
    setSelectedProduct({
      productName: "",
      barCode: "",
      price: "",
      quantity: "",
      taxes_pctg: "",
    });
    setEndOfTransactionModalOpened(false);
    getAllTransactionsAPI(1)
  };

  return (
    <TransactionContext.Provider
      value={{
        productsInCart,
        modalOpened,
        sendTransaction,
        selectedProduct,
        handleProductClick,
        handleOpenModal,
        handleCloseModal,
        handleDeleteProduct,
        handleUpdateProductInCart,
        handleSearch,
        handleAddProductToCart,
        handleOpenEndOfTransactionModal,
        endOfTransactionModalOpened,
        totalAmount,
        handleFinishTransaction,
        handleCancelEndOfTransaction,
      }}
    >
      {props.children}
    </TransactionContext.Provider>
  );
}
