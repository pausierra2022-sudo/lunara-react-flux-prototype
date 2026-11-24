
import { Link } from 'react-router-dom';

// Componente encargado de presentar la página principal de Lunara.
export default function Home() {
  return (
    <main>

      {/* Sección principal o banner de bienvenida de la tienda. */}
      <section className="hero hero-banner">

        {/* Contenedor del texto y la acción principal del banner. */}
        <div className="hero-copy">

          {/* Identifica la colección que se presenta en la página. */}
          <p className="eyebrow">COLECCIÓN LUNARA 2026</p>

          {/* Mensaje principal de identidad de la marca. */}
          <h1>Diseños que reflejan tu esencia.</h1>

          <h2>Elegancia, estilo y autenticidad</h2>

          {/* Texto descriptivo de la propuesta de Lunara. */}
          <p>
            Moda femenina inspirada en la elegancia,
            autenticidad y confianza de la mujer moderna.
          </p>

          {/* Enlace que dirige al usuario hacia el catálogo de productos. */}
          <Link
            className="primary-button link-button"
            to="/catalogo"
          >
            Explorar colección
          </Link>
        </div>
      </section>

    </main>
  );
}
