import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Configuración de la ruta base para GitHub Pages.
  base: '/lunara-react-flux-prototype/',

  plugins: [react()]
});