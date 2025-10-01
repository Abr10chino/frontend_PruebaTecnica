import { useRoutes } from "react-router-dom";
import { productPage } from "./pages/productos/productPage.jsx";

const routes = useRoutes([
    {path: "/", element: <productPage />},
]);

export default routes;