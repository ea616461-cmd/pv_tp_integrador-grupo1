# 🚀 Panel de Control de Clientes en Tiempo Real

Este proyecto consiste en el desarrollo progresivo de una aplicación web funcional para la gestión y control de clientes en tiempo real. La aplicación está construida sobre React y Vite, y se conecta de forma asrincrónica a la API pública FakeStore API para el consumo y persistencia de datos.

## 👥 Integrantes del Grupo

*   **Avilés Rios, Walter** - [@em616461-cmd]
*   **Leaño, Gabriel** - [@gabriel11118080]
*   **Diaz Quispia, Agustín** - [@DiazQuispiaAgustín]
*   **Cholele, Facundo** - [@143Facu]

## 🛠️ Tecnologías Utilizadas

*   **React** & **Vite** (Entorno de desarrollo rápido)
*   **React Router DOM** (Enrutamiento modular y navegación entre vistas)
*   **Context API** & **LocalStorage** (Gestión del estado global y persistencia de sesión)
*   [MUI / React Bootstrap] (Framework de interfaz de usuario implementado)
*   **Fetch API / Axios** (Peticiones HTTP asincrónicas con async/await)

## 📁 Estructura del Proyecto

El código fuente está organizado bajo una arquitectura limpia y modular de carpetas:

*   `src/components/layout/`: Componentes de estructura fijos (Header, Nav, Footer).
*   `src/components/common/`: Componentes reutilizables pequeños (Formularios, botones, etc.).
*   `src/context/`: Estado global de autenticación del Administrador (`AdminContext.jsx`).
*   `src/views/`: Pantallas principales de la aplicación (Login, Dashboard, ListaClientes, DetalleCliente).
