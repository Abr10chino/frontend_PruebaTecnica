import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://backend-pruebatecnica-i31b.onrender.com/BoldProductManager/v1/',
    timeout: 5000,
})

export const getProducts = async () => {
    try{
        return await apiClient.get('products/getProducts')
    } catch(e){
        return{
            error: true,
            e
        }
    }
}

export const deleteProduct = async (productId) => {

    try{
        return await apiClient.delete(`products/deleteProduct/${productId}`)
    } catch(e){
        return{
            error: true,
            e
        }
    }

}

export const addProduct = async (addingProduct) => {

    try{
        return await apiClient.post('products/addProduct', addingProduct)
    }catch(e){
        return{
            error: true,
            e
        };
    };
};