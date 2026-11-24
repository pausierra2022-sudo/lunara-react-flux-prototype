
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

// Convierte los valores numéricos a formato de moneda colombiana.
const money = (value) =>
  Number(value || 0).toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  });

// Componente encargado de presentar y gestionar el carrito de compras.
export default function Cart() {

  // Obtiene el estado global, dispatch y los totales del carrito.
  const { state, dispatch, totals } = useCart();

  return (
    <main className="page-shell cart-page">

      {/* Encabezado de la vista del carrito. */}
      <div className="page-heading">
        <p className="eyebrow">TU SELECCIÓN</p>
        <h1>Mi carrito</h1>
        <p>Revisa los productos que has seleccionado.</p>
      </div>

      {/* Verifica si existen productos seleccionados en el carrito. */}
      {state.items.length === 0 ? (

        // Si el carrito está vacío, muestra un mensaje y acceso al catálogo.
        <div className="empty-cart">
          <div className="empty-icon">♡</div>
          <h2>Tu carrito está vacío</h2>
          <p>Explora el catálogo y agrega tus productos favoritos.</p>
          <Link
            className="primary-button link-button"
            to="/catalogo"
          >
            Ir al catálogo
          </Link>
        </div>

      ) : (
        <>
          {/* Recorre los productos del estado global y presenta cada elemento. */}
          <div className="cart-list">
            {state.items.map((item) => (
              <article className="cart-item" key={item.id}>

                {/* Imagen del producto con una alternativa si no carga. */}
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://placehold.co/180x220/f0e9e6/6b5960?text=Lunara';
                  }}
                />

                <div className="cart-item-info">
                  <p className="eyebrow">PRODUCTO</p>
                  <h3>{item.nombre}</h3>
                  <p>Talla: {item.talla || 'No especificada'}</p>
                  <p>{money(item.precio)} unidad</p>

                  {/* Controles para modificar la cantidad del producto. */}
                  <div className="quantity-control">

                    {/* Disminuye la cantidad mediante una acción al Reducer. */}
                    <button
                      aria-label="Disminuir cantidad"
                      onClick={() =>
                        dispatch({
                          type: 'UPDATE_QUANTITY',
                          payload: {
                            id: item.id,
                            cantidad: item.cantidad - 1
                          }
                        })
                      }
                      disabled={item.cantidad <= 1}
                    >
                      −
                    </button>

                    <span>{item.cantidad}</span>

                    {/* Aumenta la cantidad mediante una acción al Reducer. */}
                    <button
                      aria-label="Aumentar cantidad"
                      onClick={() =>
                        dispatch({
                          type: 'UPDATE_QUANTITY',
                          payload: {
                            id: item.id,
                            cantidad: item.cantidad + 1
                          }
                        })
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="cart-item-end">

                  {/* Calcula y presenta el subtotal del producto. */}
                  <strong>
                    {money(Number(item.precio) * Number(item.cantidad))}
                  </strong>

                  {/* Envía la acción para eliminar el producto del carrito. */}
                  <button
                    className="remove-button"
                    onClick={() =>
                      dispatch({
                        type: 'REMOVE_FROM_CART',
                        payload: item.id
                      })
                    }
                  >
                    Eliminar
                  </button>
                </div>

              </article>
            ))}
          </div>

          {/* Resumen general de unidades y valor total del carrito. */}
          <aside className="cart-summary">

            <div>
              <span>{totals.units} unidades</span>
              <strong>Total: {money(totals.amount)}</strong>
            </div>

            {/* Aclara el alcance actual del prototipo. */}
            <p>
              Este prototipo permite consultar la selección.
              No procesa pagos ni registra compras.
            </p>

            <div className="cart-actions">

              {/* Permite regresar al catálogo para seguir seleccionando productos. */}
              <Link
                className="continue-button"
                to="/catalogo"
              >
                Seguir comprando
              </Link>

              {/* El pago está deshabilitado porque no existe una pasarela implementada. */}
              <button
                className="checkout-button"
                type="button"
                disabled
                title="La pasarela de pago no está implementada"
              >
                Finalizar compra
              </button>

              {/* Envía la acción para eliminar todos los productos del carrito. */}
              <button
                className="clear-button"
                type="button"
                onClick={() =>
                  dispatch({ type: 'CLEAR_CART' })
                }
              >
                Vaciar carrito
              </button>

            </div>

          </aside>
        </>
      )}

    </main>
  );
}
