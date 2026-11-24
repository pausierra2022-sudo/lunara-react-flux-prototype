# Lunara React + Flux (prototipo académico)

Prototipo separado de la versión publicada de Lunara. La aplicación original no se modifica.

## Alcance implementado
- Inicio, catálogo y carrito.
- Consulta de productos mediante la API REST existente: `https://obtenerproductos-zyurdt3cka-uc.a.run.app`.
- Búsqueda por nombre y filtros por categoría, talla y precio máximo.
- Gestión centralizada del carrito mediante React Context + `useReducer`.
- Acciones: `ADD_TO_CART`, `UPDATE_QUANTITY`, `REMOVE_FROM_CART` y `CLEAR_CART`.
- Persistencia del carrito en `localStorage` con la clave `carrito`.

## Requisitos
- Node.js 18 o superior.
- npm.

## Ejecución local
1. Descomprimir el proyecto.
2. Abrir la carpeta `lunara-react` en Visual Studio Code.
3. Abrir una terminal en esa carpeta.
4. Ejecutar:

```bash
npm install
npm run dev
```

5. Abrir en el navegador la dirección local que indique Vite (normalmente `http://localhost:5173`).

## Estructura
```text
src/
  components/   # Navbar y tarjeta de producto
  context/      # Context global y persistencia
  reducers/     # Reglas de actualización del carrito
  services/     # Consumo de API REST
  views/        # Inicio, catálogo y carrito
  App.jsx
  main.jsx
  styles.css
```

## Consideraciones
- El prototipo no implementa autenticación real, pagos, registro de compras, logística ni administración de productos.
- La pantalla de carrito es una simulación funcional de selección; no realiza transacciones.
- Si la API no carga en el navegador, verificar disponibilidad del endpoint y configuración CORS. No se modifica el backend desde este proyecto.
- `dispatch` es la función proporcionada por `useReducer`; no se crea un Dispatcher independiente.
- `localStorage` persiste el carrito entre recargas; Context + `useReducer` administran el estado durante la ejecución.

## Pruebas manuales sugeridas
1. Abrir Catálogo y verificar la consulta de productos.
2. Buscar por nombre y aplicar filtros.
3. Agregar un producto; comprobar el contador del menú.
4. Agregarlo nuevamente; verificar que aumenta la cantidad.
5. Abrir Carrito; modificar cantidad y eliminar productos.
6. Recargar la página; verificar la persistencia.
7. Vaciar el carrito y comprobar que el contador vuelve a cero.
