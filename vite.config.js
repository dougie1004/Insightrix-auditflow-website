import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        app: resolve(__dirname, 'app.html'),
        accountingflow: resolve(__dirname, 'accountingflow.html'),
        auditflow: resolve(__dirname, 'auditflow.html'),
        company: resolve(__dirname, 'company.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
})
