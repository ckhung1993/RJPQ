---
AIGC:
    Label: "1"
    ContentProducer: 001191440300708461136T1XGW3
    ProduceID: e03405257916288b150a97200dd89b57_b34f8a7b772611f19641525400d9a7a1
    ReservedCode1: UEy0/3WZ/wPpB/pIsZpH0+JEKm/V47cQR7Eb3xTOhfcODUctF3rUbFNdQE6GXjy/PGsgc4pU/bgxxm0cNhjqbAEZ6fw9yxodsas1iKUYSXjJQDZf/gJg9AjSQo4kqVDkhRgAKSv+tuOIPHO5ANdyIV9nbJsuQ/9zbmSHzvquzurTxUqa0ICCTUhSazI=
    ContentPropagator: 001191440300708461136T1XGW3
    PropagateID: e03405257916288b150a97200dd89b57_b34f8a7b772611f19641525400d9a7a1
    ReservedCode2: UEy0/3WZ/wPpB/pIsZpH0+JEKm/V47cQR7Eb3xTOhfcODUctF3rUbFNdQE6GXjy/PGsgc4pU/bgxxm0cNhjqbAEZ6fw9yxodsas1iKUYSXjJQDZf/gJg9AjSQo4kqVDkhRgAKSv+tuOIPHO5ANdyIV9nbJsuQ/9zbmSHzvquzurTxUqa0ICCTUhSazI=
---

# 茱羅跳台協作工具

MapleStory Romeo & Juliet PQ Tool — 專為楓之谷 Artale 羅密歐與茱麗葉組隊任務打造的多人即時同步跳台標記工具。

## 功能特色

- 10×4 跳台網格，四色標記（101-104）
- 多人即時同步（Supabase Realtime WebSocket）
- 路徑生成、錯誤標記、聊天窗口
- 角色登入、房間密碼保護
- 閒置 20 分鐘自動關閉房間

## 部署（Supabase + GitHub Pages，免卡、免費、24 小時）

### 1. 建立 Supabase 專案

前往 [supabase.com](https://supabase.com) 用 GitHub 登入，建立新專案（選擇 Singapore 區域）。

### 2. 執行資料庫遷移

在 Supabase Dashboard → SQL Editor 中貼上 `migration.sql` 並執行。

### 3. 開啟 Realtime

Dashboard → Database → Replication → 找到 `rooms` 表 → 打開開關。

### 4. 設定 API 金鑰

編輯 `artale_supabase.html`，把 `YOUR_SUPABASE_URL` 和 `YOUR_SUPABASE_ANON_KEY` 替換為你的 Supabase 專案憑證（在 Settings > API 頁面可以找到）。

### 5. 部署到 GitHub Pages

將 `artale_supabase.html` 改名為 `index.html`，推送到 GitHub 並開啟 Pages。

### 本地測試

直接用瀏覽器打開 `artale_supabase.html` 即可。

## 給隊友

隊友透過瀏覽器訪問你的 GitHub Pages 網址即可，無需安裝任何軟體。
*（内容由AI生成，仅供参考）*
