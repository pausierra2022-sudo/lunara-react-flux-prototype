
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configura Vite e integra el complemento necesario para trabajar con React.
export default defineConfig({
  // Habilita el procesamiento de los componentes y funcionalidades de React.
  plugins: [react()]
});
