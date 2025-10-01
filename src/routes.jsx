import { useRoutes } from "react-router-dom";
import { productPage } from "./pages/productos/productPage.jsx";

// Definición de las rutas de la aplicación
const routes = useRoutes([
    {path: "/", element: <productPage />},
]);

export default routes;