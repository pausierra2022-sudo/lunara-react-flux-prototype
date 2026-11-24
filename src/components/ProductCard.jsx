
import { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';

// Convierte los valores numéricos a formato de moneda colombiana.
const money = (value) =>
  Number(value || 0).toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  });

// Componente encargado de presentar la información de cada producto.
export default function ProductCard({ product }) {

  // Obtiene dispatch para enviar acciones al estado global del carrito.
  const { dispatch } = useCart();

  // Estado local que controla la visualización del mensaje de confirmación.
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Agrega el producto al carrito y muestra la confirmación al usuario.
  const add = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        id: product.id,
        nombre: product.nombre,
        descripcion: product.descripcion,
        precio: Number(product.precio),
        imagen: product.imagen,
        talla: product.talla,
      },
    });

    setShowConfirmation(true);
  };

  return (
    <>
      {/* Tarjeta que contiene la información y las acciones del producto. */}
      <article className="product-card">
        <div className="product-image-wrap">

          {/* Imagen del producto con una alternativa si no se puede cargar. */}
          <img
            src={`${import.meta.env.BASE_URL}${product.imagen}`}
            alt={product.nombre}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src =
                'https://placehold.co/600x760/f0e9e6/6b5960?text=Lunara';
            }}
          />
        </div>

        <div className="product-info">

          {/* Presenta la categoría y los datos principales del producto. */}
          <p className="eyebrow">
            {product.categoria || 'Colección Lunara'}
          </p>

          <h3>{product.nombre}</h3>

          <p className="product-description">
            {product.descripcion}
          </p>

          {/* Muestra la talla y la disponibilidad registrada. */}
          <div className="product-meta">
            <span>Talla: {product.talla || 'Única'}</span>
            <span>Stock: {product.stock ?? 'Consultar'}</span>
          </div>

          {/* Presenta el precio en pesos colombianos. */}
          <strong className="price">
            {money(product.precio)}
          </strong>

          {/* Ejecuta la acción para agregar el producto al carrito. */}
          <button className="primary-button" onClick={add}>
            Agregar al carrito
          </button>
        </div>
      </article>

      {/* Ventana de confirmación que aparece después de agregar el producto. */}
      {showConfirmation && (
        <div
          className="confirmation-overlay"
          onClick={() => setShowConfirmation(false)}
        >
          <div
            className="confirmation-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirmation-title"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Icono visual de confirmación. */}
            <div className="confirmation-icon">
              <span>✓</span>
            </div>

            <h2 id="confirmation-title">
              ¡Producto agregado!
            </h2>

            <p>
              <strong>{product.nombre}</strong>
              <br />
              Se agregó correctamente a tu carrito.
            </p>

            {/* Cierra la ventana y permite continuar comprando. */}
            <button
              className="confirmation-button"
              onClick={() => setShowConfirmation(false)}
            >
              Continuar comprando
            </button>
          </div>
        </div>
      )}
    </>
  );
}
