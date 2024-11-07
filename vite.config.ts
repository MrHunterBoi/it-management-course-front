import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { projectConfig } from './config';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: projectConfig.baseRoute,
  preview: {
    port: 3000,
  },
});
