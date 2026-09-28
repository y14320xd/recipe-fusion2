import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // 設定為相對路徑，徹底解決 Vercel / GitHub Pages 資源抓不到變白畫面的問題
})