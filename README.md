# 鮮活食材搭配助手

以 React 與 Vite 製作的食材推薦網站。選擇海鮮與手邊食材後，可瀏覽推薦料理並逐步查看料理做法與影片。

## 本機開發

```bash
npm ci
npm run dev
```

## 驗證

```bash
npm test
npm run build
```

GitHub Actions 會在推送至 `main` 或建立針對 `main` 的 Pull Request 時執行測試與正式建置。

## 部署到 Vercel

1. 登入 [Vercel](https://vercel.com/) 並選擇 **Add New Project**。
2. 連結 GitHub，匯入 `y14320xd/recipe-fusion2`。
3. Framework Preset 選擇 **Vite**，Production Branch 設為 `main`。
4. 確認 Build Command 為 `npm run build`、Output Directory 為 `dist`，然後部署。

`vercel.json` 已設定 SPA 路由與建置參數。匯入一次後，推送至 `main` 會自動建立正式部署；Pull Request 與其他分支會建立預覽部署。網站靜態檔案由 Vercel 全球 CDN 提供。

目前執行時不需要環境變數或 API 金鑰。
