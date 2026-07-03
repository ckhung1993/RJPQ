# 茱羅跳台協作工具

MapleStory Romeo & Juliet PQ Tool — 專為楓之谷 Artale 羅密歐與茱麗葉組隊任務打造的多人即時同步跳台標記工具。

## 功能特色

- 10×4 跳台網格，四色標記（101-104）
- 多人即時同步（HTTP 輪詢，零依賴）
- 路徑生成、錯誤標記、聊天窗口
- 角色登入、房間密碼保護
- 閒置 20 分鐘自動關閉房間

## 本地啟動

```bash
node server.js
```

## 部署到 Render（免費）

1. Fork 或 Push 這個 repo 到 GitHub
2. [Render](https://render.com) → New Web Service → 連接 GitHub repo
3. Build Command：留空
4. Start Command：`node server.js`
5. Instance Type：Free

## 給隊友

隊友透過瀏覽器訪問你的網址即可，無需安裝任何軟體。
