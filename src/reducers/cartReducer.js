
// Define el estado inicial del carrito, sin productos seleccionados.
export const initialCartState = {
  items: []
};

// Reducer encargado de procesar las acciones del carrito
// y generar el nuevo estado de acuerdo con cada operación.
export function cartReducer(state, action) {

  switch (action.type) {

    // Agrega un producto al carrito.
    // Si el producto ya existe, incrementa su cantidad.
    // Si es nuevo, lo incorpora con una cantidad inicial de uno.
    case 'ADD_TO_CART': {
      const product = action.payload;

      // Busca si el producto ya se encuentra en el carrito.
      const existing = state.items.find(
        (item) => String(item.id) === String(product.id)
      );

      // Actualiza la cantidad del producto existente
      // o incorpora el nuevo producto a la colección.
      const items = existing
        ? state.items.map((item) =>
            String(item.id) === String(product.id)
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          )
        : [...state.items, { ...product, cantidad: 1 }];

      // Retorna un nuevo estado con la colección actualizada.
      return { ...state, items };
    }

    // Actualiza la cantidad de un producto específico.
    case 'UPDATE_QUANTITY': {
      const { id, cantidad } = action.payload;

      // Evita establecer cantidades inferiores a uno.
      if (cantidad < 1) return state;

      // Genera una nueva colección con la cantidad modificada.
      return {
        ...state,
        items: state.items.map((item) =>
          String(item.id) === String(id)
            ? { ...item, cantidad }
            : item
        ),
      };
    }

    // Elimina del carrito el producto identificado por su ID.
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(
          (item) => String(item.id) !== String(action.payload)
        )
      };

    // Elimina todos los productos y deja vacío el carrito.
    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };

    // Conserva el estado actual cuando recibe una acción desconocida.
    default:
      return state;
  }
}
