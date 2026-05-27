import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/recipe-fusion2/", // 🔥 修正白畫面的核心關鍵！路徑必須對應你的 GitHub 儲存庫名稱
})