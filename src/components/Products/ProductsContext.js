//ProductContext
import { createContext, useState, useEffect, useContext } from "react";
import {
  createProductAPI,
  deleteProductAPI,
  getAllProductsAPI,
  getProductByBarCodeAPI,
  getProductByIdAPI,
} from "../../api"; // Asume que las funciones están en services/productService.js
export const ProductsContext = createContext();

export function ProductsContextProvider(props) {
  const [page, setPage] = useState(0);
  const [products, setProducts] = useState([]);
  const [productNotFound, setProductNotFound] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  console.log("aa");
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleChangePage = async (newPage) => {
    console.log("page:", newPage);
    if (newPage >= 0) {
      // Asegúrate de que la nueva página no sea negativa
      setPage(newPage);
      await fetchProducts(); // Espera a que fetchProducts se complete
    }
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleCreateProduct = async () => {
    await createProductAPI(selectedProduct);
    setSelectedProduct(null);
    await fetchProducts();
  };

  const handleDeleteProduct = async () => {
    const confirmDelete = window.confirm(
      "Quieres borrar el producto? Esta operación no se puede deshacer"
    );
    if (confirmDelete) {
      await deleteProductAPI(selectedProduct.productId);
      setSelectedProduct(null);
      await fetchProducts();
    }
  };

  const fetchProducts = async () => {
    const fetchedProducts = await getAllProductsAPI(page);
    setProducts(fetchedProducts);
  };

  const handleSearch = async (barCode) => {
    const fetchedProduct = await getProductByBarCodeAPI(barCode);
    if (!fetchedProduct) {
      setProductNotFound(true);
      console.log("No se encontró el producto con código de barras", barCode);
    } else {
      setProductNotFound(false);
      setSelectedProduct(fetchedProduct);
      console.log(fetchedProduct);
    }
  };

  const updateProductInList = (updatedProduct) => {
    setProducts(
      products.map((product) => {
        if (product.productId === updatedProduct.productId) {
          return updatedProduct;
        }
        return product;
      })
    );
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        fetchProducts,
        setSelectedProduct,
        selectedProduct,
        handleProductClick,
        handleCloseModal,
        handleCreateProduct,
        handleDeleteProduct,
        updateProductInList,
        page,
        handleChangePage,
        handleSearch,
        productNotFound,
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
}
