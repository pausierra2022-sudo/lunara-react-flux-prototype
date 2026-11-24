
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import Home from './views/Home.jsx';
import Catalog from './views/Catalog.jsx';
import Cart from './views/Cart.jsx';

// Componente principal que organiza la estructura y navegación de la aplicación.
export default function App() {
  return (

    // Configura el sistema de navegación mediante React Router.
    <BrowserRouter
  basename={import.meta.env.BASE_URL}
  future={{
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }}
>

      {/* Presenta la barra de navegación en las diferentes vistas. */}
      <Navbar />

      {/* Define las rutas y el componente que se muestra en cada dirección. */}
      <Routes>

        {/* Ruta correspondiente a la página principal. */}
        <Route path="/" element={<Home />} />

        {/* Ruta correspondiente al catálogo de productos. */}
        <Route path="/catalogo" element={<Catalog />} />

        {/* Ruta correspondiente al carrito de compras. */}
        <Route path="/carrito" element={<Cart />} />

        {/* Redirige las rutas no reconocidas hacia la página de inicio. */}
        <Route path="*" element={<Home />} />

      </Routes>

      {/* Pie de página compartido por las diferentes vistas. */}
      <footer className="site-footer">
        <strong>☾ LUNARA</strong>
        <span>Diseños que reflejan tu esencia</span>
        <small>Prototipo académico React + Flux</small>
      </footer>

    </BrowserRouter>
  );
}
