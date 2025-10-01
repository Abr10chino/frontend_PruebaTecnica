import {
    BrowserRouter as Router,
    Routes,
    Route,
    useRoutes
} from 'react-router-dom';

import { Toaster } from "react-hot-toast";

import { ProductPage } from './pages/productos';


// Funcion para manejar las rutas
function AppRoutes(){

    const routes = useRoutes([
        {path: '/', element: <ProductPage /> }
    ]);

    return routes;

}

// Componente App que envuelve las rutas y el toaster
function App(){
    return (
        <Router>
            <AppRoutes />
            <Toaster position="top-center" reverseOrder={false}/>
        </Router>
    )
}

export default App;