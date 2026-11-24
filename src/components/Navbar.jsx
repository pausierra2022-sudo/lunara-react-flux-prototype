
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

// Componente encargado de mostrar la navegación principal de Lunara.
export default function Navbar() {

  // Obtiene del contexto global el total de unidades del carrito.
  const { totals } = useCart();

  return (
    // Encabezado principal de la aplicación.
    <header className="site-header">
      <div className="nav-wrap">

        {/* Enlace con la identidad de la marca que dirige al inicio. */}
        <Link className="brand" to="/">☾ LUNARA</Link>

        {/* Menú de navegación entre las vistas principales. */}
        <nav>

          {/* Enlace a la página de inicio. */}
          <NavLink to="/" end>Inicio</NavLink>

          {/* Enlace al catálogo de productos. */}
          <NavLink to="/catalogo">Catálogo</NavLink>

          {/* Enlace al carrito con indicador de unidades seleccionadas. */}
          <NavLink to="/carrito">
            Carrito
            <span className="cart-count">{totals.units}</span>
          </NavLink>

        </nav>
      </div>
    </header>
  );
}
