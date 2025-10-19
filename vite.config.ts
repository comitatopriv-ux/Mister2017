import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // FIX: Removed dependency on process.cwd() and node types to resolve build errors.
  // Vite's loadEnv defaults to the project root for envDir, so '' is sufficient.
  const env = loadEnv(mode, '', '');
  return {
    plugins: [react()],
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    define: {
      // FIX: Use API_KEY in the application code as per the guidelines, by mapping it from GEMINI_API_KEY.
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    }
  };
});
