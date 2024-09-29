import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'components': path.resolve(__dirname, 'src/components'),
      'pages': path.resolve(__dirname, 'src/pages'),
      'entities': path.resolve(__dirname, 'src/entities'),
      'hooks': path.resolve(__dirname, 'src/hooks'),
      'services': path.resolve(__dirname, 'src/services'),
      'catalog': path.resolve(__dirname, 'src/catalog'),
      '*': path.resolve(__dirname, 'src'),
    }
  }
});
