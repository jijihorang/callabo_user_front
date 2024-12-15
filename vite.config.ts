import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api2": {
        target: "https://www.ozcoding.store", // 백엔드 서버 주소
        changeOrigin: true, // 요청의 origin 헤더를 백엔드 주소로 변경
      },
    },
  },
})
