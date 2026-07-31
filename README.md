# 頭前溪豆腐岩景點網站

以 Astro、Tailwind CSS、TypeScript 與 Cloudflare Workers Static Assets 建立的繁體中文景點網站。內容聚焦新竹縣竹北市頭前溪豆腐岩，包含交通、停車、門票費用、周邊美食、周邊景點、照片牆、行程清單與本機 Canvas 景點紀念卡。

## 技術棧

- Astro 7.1.3
- Tailwind CSS 4.3.3
- TypeScript 5.9.3
- pnpm 11.18.0
- Node.js 22.12.0 以上（`.node-version` 建議使用 24.18.0）
- Cloudflare Workers Static Assets

## 網域設定

站點正式網址只從 `astro.config.ts` 的 `site` 設定派生。建置時可用 `PUBLIC_SITE_URL` 提供正式網址；未提供時，專案仍可正常建置，canonical 與 Open Graph URL 會以相對路徑或省略方式降級，sitemap 也不會啟用。

```bash
PUBLIC_SITE_URL="$正式網域" pnpm build
```

## 開發與檢查

```bash
corepack enable
CI=1 corepack pnpm install --frozen-lockfile
pnpm check
pnpm build
```

## 部署

Cloudflare Workers 部署設定位於 `wrangler.jsonc`，建置產物為 `dist/`。

```bash
pnpm deploy
```

## 隱私與本機功能

- 行程清單只使用瀏覽器 localStorage，資料不會上傳。
- 景點紀念卡使用瀏覽器 Canvas，本機合成與下載，照片與成品不會經過伺服器。
- 本站沒有資料庫、會員登入或 CMS。

## 圖片來源

本專案使用 Wikimedia Commons 的公開照片並轉為 WebP 放在 `public/images/`，頁面照片牆保留來源與授權提示。未把遠端圖片熱鏈作為頁面顯示圖。
