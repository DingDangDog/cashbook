import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    // 本服务暴露的端口
    host: '127.0.0.1',
    port: 8080,
    // 跨域配置
    proxy: {
      // /api相关接口跨域配置
      '/api': {
        //实际请求地址
        target: 'http://127.0.0.1:3000/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      },
    }
  }
})


