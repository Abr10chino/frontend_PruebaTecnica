/*
    En este archivo se definen las funciones para hacer las peticiones a la API 
    relacionadas con los productos (obtener, eliminar y agregar). 
    Se usa axios para la comunicación con el backend.
*/

import axios from 'axios';

// Cliente de axios configurado con la URL base y el tiempo máximo de espera
const apiClient = axios.create({
    baseURL: 'https://backend-pruebatecnica-i31b.onrender.com/BoldProductManager/v1/',
    timeout: 5000,
})

// Función para obtener todos los productos
export const getProducts = async () => {
    try {
        return await apiClient.get('products/getProducts')
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

// Función para eliminar un producto con su id
export const deleteProduct = async (productId) => {
    try {
        return await apiClient.delete(`products/deleteProduct/${productId}`)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

// Función para agregar un nuevo producto
export const addProduct = async (addingProduct) => {
    try {
        return await apiClient.post('products/addProduct', addingProduct)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}