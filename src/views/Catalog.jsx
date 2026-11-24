
import { useEffect, useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import { getProducts } from '../services/productService.js';

// Componente encargado de consultar y presentar el catálogo de productos.
export default function Catalog() {

  // Estados locales para almacenar los productos y controlar los filtros.
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [size, setSize] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Estados para controlar la carga de información y los posibles errores.
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Consulta los productos al API REST cuando se carga el componente.
  useEffect(() => {
    let active = true;

    getProducts()
      .then((data) => {
        // Almacena los productos recibidos si el componente sigue activo.
        if (active) setProducts(data);
      })
      .catch((err) => {
        // Registra el mensaje cuando ocurre un error en la consulta.
        if (active) setError(err.message || 'No fue posible cargar el catálogo.');
      })
      .finally(() => {
        // Finaliza el estado de carga de la información.
        if (active) setLoading(false);
      });

    // Evita actualizar el estado si el componente deja de estar activo.
    return () => {
      active = false;
    };
  }, []);

  // Obtiene las categorías disponibles a partir de los productos consultados.
  const categories = useMemo(
    () => [
      ...new Set(products.map((p) => p.categoria).filter(Boolean))
    ].sort(),
    [products]
  );

  // Filtra los productos según los criterios seleccionados por el usuario.
  const filtered = useMemo(
    () => products.filter((p) => {

      // Compara el texto ingresado con el nombre del producto.
      const matchesName = String(p.nombre || '')
        .toLowerCase()
        .includes(search.toLowerCase().trim());

      // Verifica la categoría seleccionada.
      const matchesCategory = !category || p.categoria === category;

      // Verifica la talla seleccionada.
      const matchesSize = !size || p.talla === size;

      // Comprueba que el precio no supere el límite establecido.
      const matchesPrice =
        maxPrice === '' || Number(p.precio) <= Number(maxPrice);

      // El producto debe cumplir todos los criterios seleccionados.
      return matchesName && matchesCategory && matchesSize && matchesPrice;
    }),
    [products, search, category, size, maxPrice]
  );

  return (
    <main className="page-shell">

      {/* Encabezado principal del catálogo. */}
      <div className="page-heading">
        <p className="eyebrow">DESCUBRE LUNARA</p>
        <h1>Catálogo de productos</h1>
        <p>Encuentra las prendas que mejor reflejan tu estilo.</p>
      </div>

      {/* Controles para buscar y filtrar los productos. */}
      <section className="filters" aria-label="Filtros del catálogo">

        <label>
          Buscar por nombre
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Ej. vestido"
          />
        </label>

        <label>
          Categoría
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Todas</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>

        <label>
          Talla
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            <option value="">Todas</option>
            {['S', 'M', 'L', 'XL', 'Única'].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>

        <label>
          Precio máximo
          <input
            type="number"
            min="0"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Sin límite"
          />
        </label>

        {/* Restablece los criterios de búsqueda y filtrado. */}
        <button
          className="secondary-button"
          onClick={() => {
            setSearch('');
            setCategory('');
            setSize('');
            setMaxPrice('');
          }}
        >
          Limpiar
        </button>
      </section>

      {/* Mensaje que se presenta mientras se consulta el catálogo. */}
      {loading && (
        <p className="status-message">Cargando productos…</p>
      )}

      {/* Presenta información cuando ocurre un error en la consulta. */}
      {error && (
        <div className="error-message">
          <strong>No fue posible cargar el catálogo.</strong>
          <p>{error}</p>
          <small>
            Verifica la conexión con la API REST y sus permisos CORS.
          </small>
        </div>
      )}

      {/* Presenta los productos cuando la consulta finaliza correctamente. */}
      {!loading && !error && (
        <>
          <p className="results-count">
            {filtered.length} productos encontrados
          </p>

          {/* Genera una tarjeta para cada producto que cumple los filtros. */}
          <section className="product-grid">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </section>

          {/* Informa cuando no existen productos para los criterios elegidos. */}
          {filtered.length === 0 && (
            <p className="status-message">
              No se encontraron productos con esos criterios.
            </p>
          )}
        </>
      )}

    </main>
  );
}
