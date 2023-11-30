import axios from 'axios';

const API_URL = 'http://localhost:8080/api/products'; // Asegúrate de que la URL coincida con la de tu servidor

// Obtener todos los productos
export const getAllProductsAPI = async (page) => {
  try {
    // const response = await axios.get(API_URL);
    const response = await axios.get(`http://localhost:8080/api/products?page=${page}&size=20`);
    return response.data.content;
  } catch (error) {
    console.error("Error al obtener los productos", error);
  }
};

// Obtener un producto por ID
export const getProductByIdAPI = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el producto", error);
  }
};

// Crear un nuevo producto
export const createProductAPI = async (productData) => {
  try {
    const response = await axios.post(API_URL, productData);
    return response.data;
  } catch (error) {
    console.error("Error al crear el producto", error);
  }
};

// Actualizar un producto
export const updateProductAPI = async (id, productData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el producto", error);
  }
};

// Eliminar un producto
export const deleteProductAPI = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error al eliminar el producto", error);
  }
};
