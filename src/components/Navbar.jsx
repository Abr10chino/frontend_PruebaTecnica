/*
    En este archivo se define el componente Navbar que representa la barra de navegación
    principal que vamos a usar en toda la aplicación.
*/

export const Navbar = () => {

    return (
        // Navbar con fondo azul oscuro y borde inferior gris que es responsivo
        <nav className="bg-blue-700 dark:bg-blue-900 border-b border-gray-300 dark:border-gray-600">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-6">
                {/* Aquí puedes poner el logo a la izquierda y enlaces o botones a la derecha */}
            </div>
        </nav>
    )
}