import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
  console.log(command, mode);
  return {
    server: {
      open: true,
      port: 5173,
    },
    base: mode === 'production' ? '/code-quiz-jsx/' : './',
    plugins: [react()],
  };
});
