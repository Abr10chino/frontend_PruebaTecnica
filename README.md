# 📦 Bold Product Manager

**Ultima Modificación: 01/10/2025 00:03:43**

Este proyecto es un **gestor de productos** hecho con **React + Vite + Tailwind CSS**.  
Se conecta a un **backend con NodeJS** (usando Axios) para manejar las siguientes operaciones:  
- Ver productos
- Agregar productos  
- Eliminar productos  

---

## 🚀 Características principales

- Lista todos los productos disponibles desde el backend  
- Filtrado por categoría (ejemplo: Comida, Ropa, Electrónica, etc.)  
- Modal para agregar un producto con validaciones en tiempo real  
- Eliminación rápida de productos  
- Mensajes de éxito y error con `react-hot-toast`  
- Interfaz estética con Tailwind y soporte para modo oscuro  

---

## 🛠️ Tecnologías utilizadas

- **Frontend**: React + Vite  
- **Estilos**: Tailwind CSS  
- **Notificaciones**: react-hot-toast  
- **HTTP Cliente**: Axios  
- **Backend**: NodeJS (Render Hosting)  

---

## 📂 Estructura del proyecto (Actual)

```bash
src/
├── components/       # Navbar, Footer, etc.
├── pages/productos   # Pagina de Producto (ProductPage)
├── services/         # api.js (conexión con API backend)
├── shared/           # hooks y validadores
│   ├── hooks/        # useProducts
│   └── validators/   # validaciones de formularios
├── App.jsx           # Llamado a todas las rutas
├── index.css         # Estilos para mi index
├── main.jsx          # Pagina Principal
├── routes.jsx        # Pagina donde almacenamos rutas

