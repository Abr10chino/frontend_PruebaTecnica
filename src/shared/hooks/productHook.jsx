import { use, useState } from "react";
import toast from "react-hot-toast";
import {getProducts as getProductsRequest, deleteProduct as deleteProductRequest, addProduct as addProductRequest} from '../../services/api'

export const useProducts = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');

    const getProducts = async () => {

        setLoading(true);

        try {

        const productData = await getProductsRequest();

        if (productData.error) {
            toast.error(productData.e?.response?.data || 'Ocurrió un error al obtener los productos');
            return;
        }

        setProducts(productData.data.products || []);
        setMsg(productData.data.msg || '');
       return  toast.success('Productos cargados exitosamente');


        } catch (err) {
        toast.error('Ocurrió un error inesperado');
        } finally {
        setLoading(false);
        }
    };

    const addProduct = async(addingProduct)=>{
        setLoading(true);
        try {
            const productDatas = await addProductRequest(addingProduct);
            if(productDatas.error){
                return toast.error(
                    productDatas.e?.response?.data || 'Ocurrio un error al agregar el producto'
                )
            }
            setProducts(productDatas);
            await getProducts();
            return toast.success(productDatas.data.msg || 'Producto agregado exitosamente');

        } catch (err) {
            toast.error('Ocurrió un error inesperado');
        }finally {
            setLoading(false);
        }
    }

    const deleteProduct = async (productId) => {

        setLoading(true);

        try {

            const deleteData = await deleteProductRequest(productId);

            if(deleteData.error){

                return toast.error(
                    deleteData.e?.response?.data || 'Ocurrió un error al eliminar el producto'
                )

            }

            setProducts(prev => prev.filter(product => product._id !== productId));
            await getProducts();
            return toast.success(deleteData.data.msg || 'Producto eliminado exitosamente');

        } catch (err) {
            toast.error('Ocurrió un error inesperado');
        }finally {
            setLoading(false);
        }

    }

    return {
        products,
        msg,
        getProducts,
        addProduct,
        deleteProduct,
        loading
    };
};