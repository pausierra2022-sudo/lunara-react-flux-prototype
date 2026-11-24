
/* Endpoint del API REST que permite consultar los productos
   registrados en la infraestructura actual de Lunara. */
const API_URL = 'https://obtenerproductos-zyurdt3cka-uc.a.run.app';

// Función asíncrona encargada de consultar los productos del catálogo.
export async function getProducts() {

  // Realiza una solicitud HTTP GET al endpoint del API REST.
  const response = await fetch(API_URL);

  // Verifica que la respuesta del servidor sea exitosa.
  if (!response.ok) {
    throw new Error(`La API respondió con estado ${response.status}`);
  }

  // Convierte la respuesta recibida en formato JSON.
  const data = await response.json();

  // Comprueba que los datos recibidos tengan la estructura de un arreglo.
  if (!Array.isArray(data)) {
    throw new Error('La respuesta de productos no tiene el formato esperado.');
  }

  // Retorna la información para que el componente Catalog la utilice.
  return data;
}
