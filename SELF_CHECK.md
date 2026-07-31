# 自檢紀錄

## 已完成的靜態檢查

- package.json 的直接依賴版本均為精確版本，未使用 latest、星號或浮動版本範圍。
- packageManager 固定為 pnpm@11.18.0。
- engines 支援 Node.js 22.12.0 以上，`.node-version` 建議使用 24.18.0。
- pnpm-workspace.yaml 僅允許 esbuild、sharp、workerd 執行安裝腳本。
- 站點 URL 由 astro.config.ts 的 site 設定派生；未提供 PUBLIC_SITE_URL 時 sitemap 不啟用。
- Google 地圖 iframe 已改為 zh-TW / tw。
- 專案原始碼與 public 資產未檢出 常見占位或非法內容。

## 環境限制

本工具容器的 Node/Corepack 在執行 pnpm 安裝時無法解析 registry.npmjs.org，因此無法在此環境完成依賴安裝、astro check 與 astro build 的實際執行。pnpm-lock.yaml 已按鎖定版本提供，需在可正常連接 npm registry 的乾淨環境中執行 README 的檢查命令。
