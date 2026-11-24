
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer
} from 'react';

import {
  cartReducer,
  initialCartState
} from '../reducers/cartReducer.js';

// Crea el contexto global para compartir el estado del carrito
// entre los diferentes componentes de la aplicación.
const CartContext = createContext(null);

// Define la clave utilizada para almacenar el carrito en localStorage.
const STORAGE_KEY = 'carrito';

// Recupera los productos guardados en localStorage
// para inicializar el estado del carrito.
function readInitialCart() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

    // Verifica que la información recuperada sea un arreglo.
    return { items: Array.isArray(stored) ? stored : [] };
  } catch {
    // Si ocurre un error al leer los datos, utiliza el estado inicial.
    return initialCartState;
  }
}

// Proveedor global que administra y comparte el estado del carrito.
export function CartProvider({ children }) {

  // useReducer conecta el estado global con las reglas del Reducer.
  // dispatch permite enviar las acciones que modifican el carrito.
  const [state, dispatch] = useReducer(
    cartReducer,
    undefined,
    readInitialCart
  );

  // Guarda automáticamente los productos del carrito en localStorage
  // cada vez que cambia la colección de elementos.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  // Calcula el número total de unidades y el valor acumulado
  // de los productos seleccionados.
  const totals = useMemo(() => ({
    units: state.items.reduce(
      (sum, item) => sum + Number(item.cantidad || 0),
      0
    ),
    amount: state.items.reduce(
      (sum, item) =>
        sum + Number(item.precio || 0) * Number(item.cantidad || 0),
      0
    ),
  }), [state.items]);

  // Comparte el estado, dispatch y los totales con los componentes
  // que se encuentran dentro de CartProvider.
  return (
    <CartContext.Provider value={{ state, dispatch, totals }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook personalizado para facilitar el acceso al contexto del carrito.
export function useCart() {
  const context = useContext(CartContext);

  // Evita utilizar el contexto fuera del proveedor global.
  if (!context) {
    throw new Error('useCart debe utilizarse dentro de CartProvider');
  }

  return context;
}
