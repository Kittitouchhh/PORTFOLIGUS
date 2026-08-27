import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/** URL ของ API ตอน dev — เปลี่ยนได้ผ่าน .env */
const API_TARGET = process.env.VITE_API_PROXY ?? 'http://localhost:4000'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@portfolio/shared': fileURLToPath(new URL('../shared/src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    // เรียก /api จาก frontend ได้ตรง ๆ ตอน dev ไม่ต้องยุ่งกับ CORS
    proxy: {
      '/api': { target: API_TARGET, changeOrigin: true },
    },
  },
})
