/*
    En este archivo se define el componente ProductPage que representa la página principal
    de productos. Aquí mostramos la lista de productos, podemos filtrarlos por categoría,
    eliminarlos y también agregar un nuevo producto con un modal.
*/

import { Navbar } from '../../components/Navbar.jsx';
import { Footer } from '../../components/Footer.jsx';
import { useProducts } from '../../shared/hooks';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { validateField, validateFieldMessage, validateNumbers, validateNumbersMessage } from '../../shared/validators';

export const ProductPage = () => {
    const { products, getProducts, addProduct, deleteProduct, loading } = useProducts();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filterCategory, setFilterCategory] = useState('');
    const [formData, setFormData] = useState({ name: '', description: '', price: '', stock: '', category: '' });
    const [errors, setErrors] = useState({ name: '', description: '', price: '', stock: '' });

    // Cargar los productos cuando se monta el componente
    useEffect(() => { getProducts(); }, []);

    // Guardar los cambios de cada input en el estado formData
    const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };

    // Manejar el formulario cuando se presiona "Agregar"
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validaciones de cada campo
        const newErrors = {
            name: validateField(formData.name) ? '' : validateFieldMessage,
            description: validateField(formData.description) ? '' : validateFieldMessage,
            stock: validateField(formData.stock) ? '' : validateFieldMessage,
            price: validateNumbers(formData.price) ? '' : validateNumbersMessage
        };

        setErrors(newErrors);

        // Si hay errores no se guarda
        if (Object.values(newErrors).some(err => err)) return;

        // Si todo está bien se agrega el producto
        await addProduct(formData);

        // Cerramos el modal y limpiamos el formulario
        setIsModalOpen(false);
        setFormData({ name: '', description: '', price: '', stock: '', category: '' });
    };

    // Eliminar un producto
    const handleDelete = async (id) => { await deleteProduct(id); };

    // Filtrar por categoría
    const handleFilterChange = (e) => { setFilterCategory(e.target.value); };

    // Productos filtrados o todos
    const filteredProducts = filterCategory ? products.filter(prod => prod.category === filterCategory) : products;

    // Validar si todos los campos son correctos antes de habilitar el botón Agregar
    const isFormatValid = 
        validateField(formData.name) &&
        validateField(formData.description) &&
        validateField(formData.stock) &&
        validateNumbers(formData.price) &&
        formData.category !== '';

    return (
        <div className="flex flex-col min-h-screen bg-gray-300 dark:bg-gray-300">
            <Navbar />
            <main className="flex-grow p-6">
                {/* Título de la página */}
                <div className="relative mb-6 p-2 flex justify-center items-center">
                    <h1 className="text-5xl font-bold text-gray-200 dark:text-gray-700 flex items-center space-x-2">
                        📦 <span>Lista de Productos</span>
                    </h1>
                </div>
                {/* Filtros y botón de actualizar */}
                <div className="mb-4 flex justify-end items-center space-x-2">
                    <button 
                        className="bg-transparent text-white px-4 py-2 rounded flex items-center hover:bg-gray-200/20" 
                        onClick={getProducts} 
                        title="Actualizar tabla"
                    >
                        🔄
                    </button>
                    <label className="text-gray-700 dark:text-gray-200 font-semibold">🔍</label>
                    <select 
                        value={filterCategory} 
                        onChange={handleFilterChange} 
                        className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100 dark:bg-gray-300" 
                        title='Filtrar por categoría'
                    >
                        <option value="">Todas</option>
                        <option value="Juguetes">Juguetes</option>
                        <option value="Comida">Comida</option>
                        <option value="Electrónica">Electrónica</option>
                        <option value="Ropa">Ropa</option>
                    </select>
                </div>
                {/* Tabla de productos */}
                <div className="overflow-x-auto shadow-lg rounded-lg">
                    <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg">
                        <thead className="bg-blue-600 dark:bg-blue-900 border-b border-gray-300 dark:border-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-gray-100 font-semibold">ID</th>
                                <th className="px-6 py-3 text-left text-gray-100 font-semibold">Nombre</th>
                                <th className="px-6 py-3 text-left text-gray-100 font-semibold">Descripción</th>
                                <th className="px-6 py-3 text-left text-gray-100 font-semibold">Precio Unitario</th>
                                <th className="px-6 py-3 text-left text-gray-100 font-semibold">Stock</th>
                                <th className="px-6 py-3 text-left text-gray-100 font-semibold">Ganancia total</th>
                                <th className="px-6 py-3 text-left text-gray-100 font-semibold">Categoría</th>
                                <th className="px-6 py-3 text-center text-gray-100 font-semibold">Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.length > 0 ? filteredProducts.map((prod, idx) => (
                                <tr 
                                    key={prod._id} 
                                    className={`${idx % 2 === 0 ? 'bg-white dark:bg-gray-300' : 'bg-gray-50 dark:bg-gray-200'} hover:bg-blue-200 dark:hover:bg-gray-400 transition-colors`}
                                >
                                    <td className="px-6 py-3 text-gray-700 dark:text-gray-600">{prod.id}</td>
                                    <td className="px-6 py-3 text-gray-700 dark:text-gray-600">{prod.name}</td>
                                    <td className="px-6 py-3 text-gray-700 dark:text-gray-600">{prod.description}</td>
                                    <td className="px-6 py-3 text-gray-700 dark:text-gray-600">Q. {Number(prod.price).toFixed(2)}</td>
                                    <td className="px-6 py-3 text-gray-700 dark:text-gray-600">{prod.stock}</td>
                                    <td className="px-6 py-3 text-gray-700 dark:text-gray-600">Q. {Number(prod.price * prod.stock).toFixed(2)}</td>
                                    <td className="px-6 py-3 text-gray-700 dark:text-gray-600">{prod.category}</td>
                                    <td className="px-6 py-3 text-center">
                                        <button 
                                            className="text-red-500 font-bold hover:text-red-600 transition-colors" 
                                            onClick={() => handleDelete(prod.id)}
                                        >
                                            X
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="8" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                                        {loading ? 'Cargando productos...' : 'No hay productos'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Botón para abrir modal */}
                <div className="flex space-x-2 justify-end mt-8">
                    <button 
                        className="bg-blue-500 dark:bg-blue-900 hover:bg-blue-600 text-white px-4 py-2 rounded shadow" 
                        onClick={() => setIsModalOpen(true)}
                    >
                        Agregar Producto
                    </button>
                </div>
                {/* Modal para agregar producto */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-transparent bg-opacity-20 backdrop-blur-sm flex items-start justify-center z-50 pt-20">
                        <div className="bg-white dark:bg-gray-700 rounded-xl shadow-2xl w-full max-w-md p-6 relative transform transition-transform duration-300 scale-100">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100 text-center">
                                Agregar Producto
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Input Nombre */}
                                <input 
                                    type="text" 
                                    name="name" 
                                    placeholder="Nombre" 
                                    value={formData.name} 
                                    onChange={handleChange} 
                                    onBlur={() => setErrors({...errors, name: validateField(formData.name)?'':validateFieldMessage})} 
                                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-200 dark:bg-gray-400"
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                                {/* Input Descripción */}
                                <input 
                                    type="text" 
                                    name="description" 
                                    placeholder="Descripción" 
                                    value={formData.description} 
                                    onChange={handleChange} 
                                    onBlur={() => setErrors({...errors, description: validateField(formData.description)?'':validateFieldMessage})} 
                                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-200 dark:bg-gray-400"
                                />
                                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                                {/* Input Precio */}
                                <input 
                                    type="number" 
                                    step="0.01" 
                                    name="price" 
                                    placeholder="Precio" 
                                    value={formData.price} 
                                    onChange={handleChange} 
                                    onBlur={() => setErrors({...errors, price: validateNumbers(formData.price)?'':validateNumbersMessage})} 
                                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-200 dark:bg-gray-400"
                                />
                                {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
                                {/* Input Stock */}
                                <input 
                                    type="number" 
                                    name="stock" 
                                    placeholder="Stock" 
                                    value={formData.stock} 
                                    onChange={handleChange} 
                                    onBlur={() => setErrors({...errors, stock: validateField(formData.stock)?'':validateFieldMessage})} 
                                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-200 dark:bg-gray-400"
                                />
                                {errors.stock && <p className="text-red-500 text-sm">{errors.stock}</p>}

                                {/* Select Categoría */}
                                <select 
                                    name="category" 
                                    value={formData.category} 
                                    onChange={handleChange} 
                                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-200 dark:bg-gray-400" 
                                    required
                                >
                                    <option value="">Selecciona una categoría</option>
                                    <option value="Juguetes">Juguetes</option>
                                    <option value="Comida">Comida</option>
                                    <option value="Electrónica">Electrónica</option>
                                    <option value="Ropa">Ropa</option>
                                </select>
                                {/* Botón dentro del modal */}
                                <div className="flex justify-center space-x-2">
                                    <button 
                                        type="submit" 
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed" 
                                        disabled={!isFormatValid}
                                    >
                                        Agregar
                                    </button>
                                </div>
                            </form>
                            {/* Botón de cerrar modal */}
                            <button 
                                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 text-xl font-bold" 
                                onClick={() => setIsModalOpen(false)}
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};
