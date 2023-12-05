import axios from "axios";

const URL_PRODUCTS = "http://localhost:8080/api/products"; // Asegúrate de que la URL coincida con la de tu servidor
const URL_TRANSACTIONS = "http://localhost:8080/api/transactions"; // Asegúrate de que la URL coincida con la de tu servidor
const URL_LINES = "http://localhost:8080/api/lines"; // Asegúrate de que la URL coincida con la de tu servidor

// Obtener todos los productos
export const getAllProductsAPI = async (page) => {
  try {
    // const response = await axios.get(URL_PRODUCTS);
    const response = await axios.get(
      `http://localhost:8080/api/products?page=${page}&size=20`
    );
    return response.data.content;
  } catch (error) {
    console.error("Error al obtener los productos", error);
  }
};

// Obtener un producto por ID
export const getProductByIdAPI = async (id) => {
  try {
    const response = await axios.get(`${URL_PRODUCTS}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el producto", error);
  }
};

// Obtener un producto por ID
export const getProductByBarCodeAPI = async (id) => {
  try {
    const response = await axios.get(`${URL_PRODUCTS}/barCode/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el producto", error);
  }
};

// Crear un nuevo producto
export const createProductAPI = async (productData) => {
  try {
    const response = await axios.post(URL_PRODUCTS, productData);
    return response.data;
  } catch (error) {
    console.error("Error al crear el producto", error);
  }
};

// Actualizar un producto
export const updateProductAPI = async (id, productData) => {
  try {
    const response = await axios.put(`${URL_PRODUCTS}/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el producto", error);
  }
};

// Eliminar un producto
export const deleteProductAPI = async (id) => {
  try {
    await axios.delete(`${URL_PRODUCTS}/${id}`);
  } catch (error) {
    console.error("Error al eliminar el producto", error);
  }
};

export const createTransactionAPI = async (transactionData) => {
  try {
    const response = await axios.post(URL_TRANSACTIONS, transactionData);
    return response.data.transactionId;
  } catch (error) {
    console.error("Error al crear la transacción", error);
  }
};

export const getAllTransactionsAPI = async (page) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/transactions?page=${page}&size=20`
      );
    return response.data;
  } catch (error) {
    console.error("Error al obtener las transacciones", error);
  }
};

export const fetchTransactionsBetweenDates = async (startDate, endDate) => {
  try {
      const response = await axios.get('http://localhost:8080/api/transactions/filter', {
          params: {
              createdAtStart: startDate,
              createdAtEnd: endDate
          }
      });
      return response.data;
  } catch (error) {
      console.error("Error fetching transactions", error);
  }
};

export const deleteTransactionAPI = async (transactionId) => {
  try {
    await axios.delete(`${URL_TRANSACTIONS}/${transactionId}`);
  } catch (error) {
    console.error("Error al eliminar la transacción", error);
  }
};

export const createLinesAPI = async (lines, transactionId) => {
  try {
    const response = await axios.post(URL_LINES + "/multiple", lines);
    return response.data;
  } catch (error) {
    deleteTransactionAPI(transactionId);
    console.error("Error al crear la transacción", error);
  }
};


export const getLinesByTransactionIdAPI = async (id) => {
  try {
    const response = await axios.get(`${URL_LINES}/transaction/${id}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error al obtener las líneas de la transacción", error);
  }
};