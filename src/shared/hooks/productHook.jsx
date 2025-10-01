/*
    En este archivo se define el hook personalizado useProducts que maneja 
    toda la lógica relacionada con los productos: obtener, agregar y eliminar. 
    También gestiona los estados de carga, mensajes y notificaciones.
*/

import { useState } from "react";
import toast from "react-hot-toast";
import { 
    getProducts as getProductsRequest, 
    deleteProduct as deleteProductRequest, 
    addProduct as addProductRequest 
} from '../../services/api'

export const useProducts = () => {

    // Estado para almacenar los productos
    const [products, setProducts] = useState([]);
    // Estado para manejar el estado de carga
    const [loading, setLoading] = useState(false);
    // Estado para mostrar mensajes que manda el backend
    const [msg, setMsg] = useState('');

    // Función para obtener productos desde el backend
    const getProducts = async () => {
        setLoading(true);
        try {
            const productData = await getProductsRequest();
            if (productData.error) {
                toast.error(productData.e?.response?.data || 'Ocurrió un error al obtener los productos');
                return;
            }
            // Actualiza el estado con los productos obtenidos
            setProducts(productData.data.products || []);
            setMsg(productData.data.msg || '');
            return toast.success('Productos cargados exitosamente');
        } catch (err) {
            toast.error('Ocurrió un error inesperado');
        } finally {
            setLoading(false);
        }
    };

    // Función para agregar un nuevo producto
    const addProduct = async (addingProduct) => {
        setLoading(true);
        try {
            const productDatas = await addProductRequest(addingProduct);
            if (productDatas.error) {
                return toast.error(
                    productDatas.e?.response?.data || 'Ocurrió un error al agregar el producto'
                );
            }
            setProducts(productDatas);
            await getProducts();
            return toast.success(productDatas.data.msg || 'Producto agregado exitosamente');
        } catch (err) {
            toast.error('Ocurrió un error inesperado');
        } finally {
            setLoading(false);
        }
    };

    // Función para eliminar un producto con su ID
    const deleteProduct = async (productId) => {
        setLoading(true);
        try {
            const deleteData = await deleteProductRequest(productId);
            if (deleteData.error) {
                return toast.error(
                    deleteData.e?.response?.data || 'Ocurrió un error al eliminar el producto'
                );
            }
            // Se actualiza solo elimina un producto del estado
            setProducts(prev => prev.filter(product => product._id !== productId));
            await getProducts();
            return toast.success(deleteData.data.msg || 'Producto eliminado exitosamente');
        } catch (err) {
            toast.error('Ocurrió un error inesperado');
        } finally {
            setLoading(false);
        }
    };

    return {
        products,
        msg,
        getProducts,
        addProduct,
        deleteProduct,
        loading
    };
};