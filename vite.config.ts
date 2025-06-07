import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import linaria from '@linaria/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    linaria()
  ],
})
