
import React from 'react';
import { createRoot } from 'react-dom/client';
import { CartProvider } from './context/CartContext.jsx';
import App from './App.jsx';
import './styles.css';

// Obtiene el elemento HTML donde se montará la aplicación React.
createRoot(document.getElementById('root')).render(

  // Activa el modo estricto de React para identificar posibles problemas
  // durante el desarrollo de la aplicación.
  <React.StrictMode>

    {/* Envuelve la aplicación con el proveedor global del carrito.
        Esto permite compartir el estado y las acciones entre los componentes. */}
    <CartProvider>

      {/* Renderiza el componente principal con las rutas y vistas de Lunara. */}
      <App />

    </CartProvider>
  </React.StrictMode>
);
