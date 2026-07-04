# iloveartale.com 网站完整分析报告

> 分析日期：2026-07-04 | 目标 URL：https://iloveartale.com（亦可 http 访问）

---

## 一、网站概览

| 属性 | 值 |
|------|-----|
| **网站名称** | 楓之谷 Artale 羅朱小工具 |
| **标语** | 羅密歐與茱麗葉 |
| **域名** | iloveartale.com |
| **版本** | v1.3.0 |
| **最后更新** | 2026-03-28 19:49 |
| **作者** | 暗夜殺手萌萌#HwNqQ |
| **页面语言** | 繁體中文 (zh-TW) |
| **页面类型** | 单页应用 (SPA) |

### SEO 元信息

| Meta 标签 | 内容 |
|-----------|------|
| `title` | 楓之谷 Artale 羅朱小工具 \| 羅密歐與茱麗葉組隊任務 |
| `description` | 專為楓之谷 Artale 羅密歐與茱麗葉（羅朱）組隊任務打造的小工具，支援多人即時同步標記樓層，就算手機鎖定螢幕也不斷線，讓你無痛通關！ |
| `keywords` | 楓之谷, Artale, 羅密歐與茱麗葉, 羅朱, 羅朱小工具, 組隊任務, 小工具, 遊戲工具, 即時同步 |
| `og:title` | 楓之谷 Artale 羅朱小工具 \| 羅密歐與茱麗葉組隊任務 |
| `og:description` | 專為楓之谷 Artale 羅朱組隊任務打造的多人即時同步樓層標記小工具。 |
| `og:image` | https://iloveartale.com/cover.jpg |

---

## 二、技术栈

| 层级 | 技术 | 详情 |
|------|------|------|
| **前端** | 原生 HTML/CSS/JS | SPA，无框架 |
| **图标库** | Phosphor Icons | `@phosphor-icons/web` (CDN: jsdelivr / unpkg) |
| **字体** | Google Fonts - Outfit | 字重：300 / 400 / 600 / 800 |
| **后端** | PHP | `sync.php` 处理房间创建/加入/状态同步 |
| **存储** | sessionStorage | 会话恢复（断线重连） |
| **实时通信** | 轮询 (Polling) | 1.5 秒间隔 fetch GET 同步状态 |
| **移动端** | Wake Lock API | `navigator.wakeLock.request('screen')` 防止锁屏断线 |
| **路由** | URL Hash | `#/房间号/密码` 格式 |

### 外部资源 URL

| 资源 | URL |
|------|-----|
| Google Fonts (preconnect) | `https://fonts.googleapis.com` |
| Google Fonts (preconnect) | `https://fonts.gstatic.com` |
| Google Fonts CSS | `https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap` |
| Phosphor Icons JS | `https://unpkg.com/@phosphor-icons/web` |
| Phosphor Icons CSS (CDN) | `https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src/*/style.css` |
| 网站 CSS | `style.css` (相对路径，带时间戳 cache-busting) |
| 网站 JS | `script.js` (相对路径，带时间戳 cache-busting) |
| 网站后端 | `sync.php` (相对路径) |
| 封面图 | `cover.jpg` (相对路径) |
| OG 图 | `https://iloveartale.com/cover.jpg` |
| Favicon | 内嵌 SVG (魔法棒图标，数据 URI) |

---

## 三、整体设计风格与配色方案

### 设计风格

- **玻璃拟态（Glassmorphism）**：核心卡片 `.glass-card` 采用半透明背景 + `backdrop-filter: blur()` 毛玻璃效果
- **深色渐变背景**：body 背景为深色调渐变，营造沉浸感
- **噪点纹理**：`#noise-overlay` 覆盖层增加质感
- **圆角卡片**：所有面板、按钮、输入框均使用圆角（border-radius）
- **阴影层次**：卡片使用柔和阴影制造悬浮感
- **简约图标风**：Phosphor Icons 线性/填充图标

### 配色方案

| 用途 | 颜色 | 色值 | CSS 变量名 |
|------|------|------|-----------|
| **主色调** | 靛紫 | `#6366f1` | `var(--primary)` |
| **橙色（101房）** | 活力橙 | `#ff9800` | `var(--color-orange)` |
| **蓝色（102房）** | 天蓝 | `#2196f3` | — |
| **粉色（103房）** | 品红 | `#e91e63` | — |
| **绿色（104房）** | 翠绿 | `#4caf50` | — |
| **危险/退出/警告** | 红色 | `#ef4444` | `var(--danger)` |
| **成功状态** | 绿色 | (系统色) | `var(--success)` |
| **主文字色** | 深色 | (CSS 变量) | `var(--text-primary)` |
| **辅助文字色** | 灰色 | (CSS 变量) | `var(--text-secondary)` |
| **卡片/面板背景** | 白色/半透明 | (CSS 变量) | `var(--surface)` |
| **主按钮** | 紫色渐变 | 基于 `--primary` | — |

### 字体

- **全局字体**：`Outfit` (Google Fonts)，无衬线字体
- **标题**：`font-weight: 800` (超粗)
- **正文**：`font-weight: 300/400`
- **按钮**：`font-weight: 600`

---

## 四、页面结构与布局

网站为**单页应用（SPA）**，包含以下视图：

### 4.1 首页 (Home Screen)

```
┌──────────────────────────────────┐
│       [噪点纹理层]                 │
│  ┌──────────────────────────┐    │
│  │    ✨ 魔法棒图标 (logo)     │    │
│  │   組隊任務小工具 (h1)      │    │
│  │   羅密歐與茱麗葉 (副标题)   │    │
│  │                          │    │
│  │  [進入房間] [建立房間]      │ ← 选项卡
│  │  ───────────────────────  │    │
│  │  [🔒 密码输入框]           │    │
│  │  [⊕ 建立 (Create)] 按钮    │    │
│  │                          │    │
│  │  ⓘ 小工具使用說明          │ ← 链接
│  └──────────────────────────┘    │
│  © 2026 暗夜殺手萌萌 | 幸運貓貓   │
│  版本：v1.3.0 | 更新：2026-03-28 │
└──────────────────────────────────┘
```

**DOM 结构**: `<div id="home-screen" class="view-screen active">`

**关键元素**:

| 元素 | 选择器/ID | 类型 | 说明 |
|------|----------|------|------|
| Logo 图标 | `.logo i.ph-fill.ph-magic-wand` | 图标 | 魔法棒图标 |
| 标题 | `.logo h1` | 标题 | "組隊任務小工具" |
| 副标题 | `.logo .subtitle` | 段落 | "羅密歐與茱麗葉" |
| 选项卡容器 | `.tabs` | 容器 | 两个 tab 按钮 |
| 进入房间按钮 | `.tab-btn[data-target="join-form"]` | 按钮 | "進入房間" |
| 建立房间按钮 | `.tab-btn[data-target="create-form"]` | 按钮 | "建立房間" (默认 active) |
| 房号输入框 | `#join-code` | 输入框 | placeholder: "房號 6 碼", 仅数字, 6位 |
| 密码输入框(加入) | `#join-password` | 密码框 | placeholder: "密碼 2-4 位數字", 2-4位 |
| 加入按钮 | `.join-btn` | 提交按钮 | "進入 (Join)"，图标 `ph-sign-in` |
| 密码输入框(创建) | `#create-password` | 密码框 | placeholder: "設定密碼 2-4 位數字", 2-4位 |
| 创建按钮 | `.create-btn` | 提交按钮 | "建立 (Create)"，图标 `ph-plus-circle` |
| 说明链接 | `#help-btn` | 链接 | "小工具使用說明"，图标 `ph-question` |
| 幸运猫链接 | `.cat-trigger` | 链接 | "要不要看幸運貓貓？" |
| 版权信息 | `.credit span` | 文字 | "© 2026 暗夜殺手萌萌#HwNqQ" |
| 版本信息 | `.credit div` | 文字 | "版本：v1.3.0 \| 最後更新：2026-03-28 19:49" |

### 4.2 房间页面 (Room Screen)

```
┌──────────────────────────────────────────┐
│  🔵 Room: 123456      [📋] [🚪]         │ ← 房间头部
│  👤 房主 Room Host                      │
├──────────────┬───────────────────────────┤
│ 控制面板      │     网格面板 (10×4)        │
│              │                           │
│ 選擇顏色/房號  │  行号  门1  门2  门3  门4  │
│              │  10  [  ] [  ] [  ] [  ] │
│ [101][102]   │   9  [  ] [  ] [  ] [  ] │
│ [103][104]   │  ...                      │
│              │   1  [  ] [  ] [  ] [  ] │
│ 路线: [____] │                           │
│ [📋 复制]    │                           │
│ [🔄 重新开始]│                           │
├──────────────┴───────────────────────────┤
│  Code: 123456 | Password: 1234 | Link... │
│  © 2026 暗夜殺手萌萌 | 幸運貓貓            │
└──────────────────────────────────────────┘
```

**DOM 结构**: `<div id="room-screen" class="view-screen hidden">`

**关键元素**:

| 元素 | ID/选择器 | 说明 |
|------|----------|------|
| 房间号显示 | `#display-room-code` | 显示6位房间号 |
| 连接状态灯 | `.pulse-dot` | 绿/橙/红色闪烁点 |
| 头像 | `#my-avatar` | emoji 👤 |
| 用户名 | `#my-name` | "Connecting..." / "房主" / "成员" |
| 复制按钮 | `#copy-btn` | 复制房间信息，图标 `ph-copy` |
| 退出按钮 | `#home-btn` | 退出房间，红色，图标 `ph-sign-out` |
| 颜色选择器 | `#color-picker` | 4个颜色选项 |
| 101选项 | `.color-option[data-color="orange"]` | 橙色 `#ff9800` |
| 102选项 | `.color-option[data-color="blue"]` | 蓝色 `#2196f3` |
| 103选项 | `.color-option[data-color="pink"]` | 粉色 `#e91e63` |
| 104选项 | `.color-option[data-color="green"]` | 绿色 `#4caf50` |
| 路径显示 | `#my-path-input` | 只读输入框，显示标记路线 |
| 复制路线 | `#copy-path-btn` | 复制路线到剪贴板 |
| 重新开始 | `#clear-all-btn` | 清除所有标记，图标 `ph-arrow-counter-clockwise` |
| 网格容器 | `#grid-container` | 10行×4列网格 |
| 底部信息 | `#footer-copy-text` | 显示 Code / Password / Link |

### 4.3 使用说明弹窗 (Help Modal)

```
┌──────────────────────────────┐
│           [✕]               │
│        使用說明               │
│                              │
│  1. 由一名玩家建立房間，       │
│     並將房號與密碼給隊友       │
│  2. 加入房間後，每人選擇好     │
│     自己負責的房門（101-104）  │
│  3. 找到對的平台時，直接點擊   │
│     對應的數字方塊作記號       │
│  4. 點擊後路徑將即時同步，     │
│     全隊可以無痛共享路線       │
│                              │
│  ⚠ 房間自動關閉機制           │
│  ┌──────────────────────┐   │
│  │ 超過 20 分鐘無人操作    │   │
│  │ 則自動刪除關閉         │   │
│  └──────────────────────┘   │
└──────────────────────────────┘
```

**DOM 结构**: `<div id="help-modal" class="loading-overlay hidden">`

### 4.4 幸运猫弹窗 (Cat Modal)

```
┌──────────────────────────────┐
│                     [✕]      │
│      ┌─────────────────┐    │
│      │                 │    │
│      │  🐱 猫咪照片     │    │
│      │  (cover.jpg)    │    │
│      │                 │    │
│      │ 幸運貓貓幫您加持  │    │
│      │  💖✨    ✨     │    │
│      └─────────────────┘    │
└──────────────────────────────┘
```

**DOM 结构**: `<div id="cat-modal" class="loading-overlay hidden">`
**图片**: `<img src="cover.jpg" alt="幸運貓貓">`

### 4.5 加载遮罩 (Loading Overlay)

```
┌────────────────┐
│   ⟳ (旋转动画)  │
│  建立房間中...   │
└────────────────┘
```

**DOM 结构**: `<div id="loading" class="loading-overlay hidden">`

### 4.6 Toast 通知

- 位置：页面顶部 (`#toast-container`)
- 动画：淡入 → 3秒后淡出
- 类型：`success`（绿色勾）/ `error`（红色警告）

---

## 五、主要交互逻辑

### 5.1 选项卡切换

- 两个 Tab：「進入房間」/「建立房間」
- 点击切换 `active` class，对应显示 `#join-form` 或 `#create-form`
- 默认选中「建立房間」

### 5.2 创建房间流程

```
输入密码 (2-4位数字) → 点击「建立」
  → 前端生成随机6位房间号
  → POST sync.php?action=create (code, password, state)
  → 成功 → 切换到房间页面 → 开始轮询同步
```

### 5.3 加入房间流程

```
输入房号 (6位数字) + 密码 (2-4位) → 点击「進入」
  → POST sync.php?action=join (code, password)
  → 成功 → 切换到房间页面 → 开始轮询同步
```

### 5.4 颜色选择

- 4种颜色对应4个房门（101-104）
- 每个颜色只能被一名玩家选定
- 选择后即绑定玩家身份
- 点击已选颜色可取消选择

### 5.5 网格标记

- 10行×4列网格（对应游戏的10个楼层，4个门）
- 点击格子标记/取消标记
- 同一行只能有一个格子被标记（同一颜色）
- 标记实时同步给所有房间成员
- 行号从10到1（上到下对应游戏楼层）

### 5.6 路径显示

- 根据已标记的格子自动生成路径字符串
- 格式：每4个字符一组用空格分隔
- 缺失楼层用 `-` 表示
- 可一键复制路径

### 5.7 实时同步

- 前端每 1.5 秒轮询 `sync.php?action=get_state`
- 比较新旧状态，有变化时才更新 UI
- 使用 `fetch` + 时间戳避免缓存
- Push mutations 时使用 `isPushing` 锁避免竞争

### 5.8 会话恢复

- 使用 `sessionStorage` 保存房间信息
- 页面刷新后自动恢复（重新连接房间）
- 支持 URL hash 路由：`#/房间号/密码`

### 5.9 移动端优化

- 使用 Screen Wake Lock API 防止手机锁屏断线
- `visibilitychange` 事件：切后台暂停轮询，回前台恢复
- `.hide-on-mobile` 类隐藏桌面端专属元素

### 5.10 离开房间

- 退出按钮 → `sendBeacon` 通知服务器 → 清除 session → 刷新页面
- 关闭标签页 → `unload` 事件发送离开通知
- 设置 `intentionallyLeft` 标志防止自动重连

---

## 六、后端 API 设计 (sync.php)

| Action | 方法 | 参数 | 说明 |
|--------|------|------|------|
| `create` | POST | `code`, `password`, `state` (JSON) | 创建房间，写入初始状态 |
| `join` | POST | `code`, `password` | 加入房间，返回当前状态 |
| `get_state` | GET | `code`, `t` (时间戳) | 获取房间当前状态 |
| `mutate` | POST | `code`, `password`, `mutation`, 其他参数 | 提交状态变更 |
| `leave` | POST | `code`, `password`, `myId` | 玩家离开房间 |

### 房间自动关闭机制

- 房间超过 20 分钟无任何格子标记变更 → 服务端视作闲置 → 自动删除

---

## 七、数据结构 (sharedState)

```javascript
{
  players: {},                              // 玩家列表 { playerId: true }
  colors: {                                 // 颜色分配
    orange: "playerId" | null,              // 101
    blue: "playerId" | null,                // 102
    pink: "playerId" | null,                // 103
    green: "playerId" | null                // 104
  },
  grid: [                                   // 10行×4列
    [null, null, null, null],               // 第10层
    [null, null, null, null],               // 第9层
    // ...
    [null, null, null, null]                // 第1层
  ]
}
```

### 常量

```javascript
GRID_ROWS = 10    // 网格行数
GRID_COLS = 4     // 网格列数
SYNC_URL = 'sync.php'
SYNC_INTERVAL = 1500  // 轮询间隔（毫秒）
ROOM_IDLE_TIMEOUT = 20 * 60 * 1000  // 房间空闲超时（毫秒）
```

---

## 八、CSS 关键样式推断

> 注意：style.css 文件因网络限制未能直接获取，以下基于 HTML 内联样式、class 命名和截图外观的推断。

### 背景

- body/html：深色渐变色（推测紫黑渐变），带 `#noise-overlay` 噪点纹理层
- 卡片（`.glass-card`）：白色/半透明白色背景 + `backdrop-filter: blur()` + 圆角 + 阴影

### 布局

- `.app-container`：flex 居中布局，min-height: 100vh
- 响应式设计：媒体查询适配移动端

### 按钮

| 按钮类型 | class | 样式 |
|---------|-------|------|
| 主按钮 | `.primary-btn` | 紫色背景 `--primary`，白色文字，圆角，padding |
| Tab 按钮 | `.tab-btn` | 透明背景，激活态底部边框 + 主色文字 |
| 图标按钮 | `.icon-btn` | 圆形/方形，透明背景，hover 效果 |
| 操作按钮 | `.action-btn` | 次要样式 |
| 危险按钮 | `.danger-btn` | 红色调 |

### 输入框

- `.input-field`：带图标前缀的输入框容器
- input：圆角边框，padding，focus 时高亮边框

### 网格

- `.grid-row`：flex 行，包含行号标签 + 4个门按钮
- `.door-btn`：方形按钮，圆角，hover 高亮
- `.door-btn.marked`：标记后显示对应颜色填充
- `.door-btn.other-player-cell`：其他玩家的标记（半透明）

### 动画/过渡

- Tab 切换：class 切换，可能带 transition
- Toast：淡入淡出 (opacity 过渡)
- Loading：旋转动画 (`.spinner`)
- 颜色标记：即时更新无动画

### 状态指示

- `.pulse-dot`：闪烁动画（CSS animation）表示连接状态
- 已连接：绿色
- 连接中：橙色
- 断开：红色

---

## 九、图标系统

使用 **Phosphor Icons**，通过 class 使用：

| 前缀 | 风格 | 用途 |
|------|------|------|
| `.ph` | Regular（线性） | 通用图标 |
| `.ph-fill` | Fill（填充） | Logo、强调图标 |
| `.ph-bold` | Bold（加粗） | Toast 通知图标 |

**使用的图标**：

| 图标名 | 出现位置 |
|--------|---------|
| `ph-magic-wand` | Logo（填充版） |
| `ph-door` | 加入表单 - 房号输入框前缀 |
| `ph-lock-key` | 密码输入框前缀 |
| `ph-sign-in` | 加入按钮 |
| `ph-plus-circle` | 创建按钮 |
| `ph-question` | 帮助链接 |
| `ph-copy` | 复制按钮 |
| `ph-sign-out` | 退出房间 |
| `ph-arrow-counter-clockwise` | 重新开始按钮 |
| `ph-x` | 关闭弹窗按钮 |
| `ph-warning-circle` | 警告提示（填充版） |
| `ph-check` | Toast 成功提示（加粗版） |

---

## 十、JavaScript 关键逻辑摘要

### 文件：`script.js`

**核心流程**：

1. **初始化**：检查 sessionStorage 恢复会话 → 检查 URL hash 路由
2. **创建房间** (`startHost`)：生成6位随机码 → POST 创建 → 进入房间 UI → 启动轮询
3. **加入房间** (`startGuest`)：POST 加入 → 获取状态 → 进入房间 UI → 启动轮询
4. **同步轮询** (`connectSync`)：每1.5秒 GET 状态 → diff 比较 → 更新 UI
5. **状态推送** (`pushMutationToServer`)：POST 变更（update_color / update_door / clear_all_grid）
6. **UI 渲染** (`renderState`)：颜色分配 → 网格渲染 → 路径更新
7. **离开** (`leaveRoom`)：sendBeacon 通知 → 清 session → 刷新页面

**事件监听**：

| 事件 | 处理 |
|------|------|
| `load` | 会话恢复 / hash 路由 |
| `visibilitychange` | 前台恢复轮询 / 后台暂停 |
| `unload` | 发送离开通知 |

---

## 十一、图片资源

| 文件名 | URL | 用途 |
|--------|-----|------|
| `cover.jpg` | `https://iloveartale.com/cover.jpg` | 幸运猫弹窗图片 / OG 图 |
| Favicon | 内嵌 SVG data URI | 网站图标（魔法棒） |

---

## 十二、完整文字内容

### 首页

- 标题：**組隊任務小工具**
- 副标题：**羅密歐與茱麗葉**
- Tab1：**進入房間**
- Tab2：**建立房間**
- 加入表单 placeholder：**房號 6 碼** / **密碼 2-4 位數字**
- 创建表单 placeholder：**設定密碼 2-4 位數字**
- 加入按钮：**進入 (Join)**
- 创建按钮：**建立 (Create)**
- 帮助链接：**小工具使用說明**
- 幸运猫链接：**要不要看幸運貓貓？**
- 版权：**© 2026 暗夜殺手萌萌#HwNqQ All rights reserved.**
- 版本：**版本：v1.3.0 | 最後更新：2026-03-28 19:49**

### 房间页面

- 房间标签：**Room: [房号]**
- 状态文字：**連線中 Connecting...** / **房主 Room Host** / **成員 Member** / **嘗試重新連線 Reconnecting...**
- 面板标题：**選擇顏色 / 房號**
- 面板副标题：**請選定一個代表你的房間與顏色 (只有你選擇後，才能編輯階梯)**
- 颜色标签：**101** / **102** / **103** / **104**
- 路径 placeholder：**尚未標記任何階梯...**
- 按钮：**重新開始**
- 底部信息：**Code: [房号] | Password: [密码] | Share exactly how it feels.**

### 使用说明弹窗

1. 由一名玩家建立房間，並將房號與密碼給隊友
2. 加入房間後，每人選擇好自己負責的房門（101-104）
3. 找到對的平台時，直接點擊對應的數字方塊作記號
4. 點擊後路徑將即時同步，全隊可以無痛共享路線
- 警告标题：**房間自動關閉機制**
- 警告内容：只要房間 **超過 20 分鐘** 沒有人點亮/取消任何格子（沒有資料更新），系統便會將房間視為閒置並自動刪除關閉。

### 加载状态

- 加载文字：**建立房間中...**（动态变化）
- 重连时：**重新連線中...**
- 加入时：**連接房間中...**

### Toast 提示消息

| 场景 | 消息 |
|------|------|
| 密码格式错误 | 密碼必須是 2-4 位數字！ |
| 房号格式错误 | 房號必須是 6 位數字！ |
| 颜色被占用 | 這個顏色已經被其他人選走了，請選擇其他顏色！ |
| 未选颜色 | 請先選擇代表顏色/房號！ (Select a color first) |
| 路径为空 | 尚無路線可複製！ |
| 路径已复制 | 路線已複製到剪貼簿！ |
| 复制失败 | 複製失敗！請手動複製 |
| 重置成功 | 已重新開始 |
| 房间创建成功 | 房間建立成功！ |
| 加入成功 | 成功加入房間！ |
| 重连成功 | 重連成功！ |
| 网络错误(创建) | 網路錯誤，建立失敗 |
| 网络错误(连接) | 無法連接到伺服器 |
| 颜色被清除 | 你的顏色被其他人清除或取代了 |
| 重连时颜色被占 | 您的顏色已被其他人選走 |
| 房间信息已复制 | 已複製房間資訊 (Copied) |

---

## 十三、响应式设计要点

- `.hide-on-mobile`：在移动端隐藏（如"選擇顏色 / 房號"标题和副标题）
- `.flex-column-desktop`：桌面端使用 flex 列布局
- `.mobile-row`：移动端使用行布局
- 网格面板自适应宽度
- 输入框使用 `inputmode="numeric"` 在移动端弹出数字键盘
- Wake Lock API 防止手机休眠

---

## 十四、复刻建议

### 必须保留的核心功能

1. 房间创建/加入机制（含密码验证）
2. 10×4 网格标记系统
3. 4色颜色选择器（101-104）
4. 实时状态同步（轮询或升级为 WebSocket）
5. 路径自动生成与复制
6. 会话持久化与断线重连
7. Toast 通知系统
8. 帮助说明弹窗
9. 房间 20 分钟自动关闭逻辑

### 可选的增强功能

1. 将轮询升级为 WebSocket 实时通信
2. 添加音效反馈
3. 支持更多房间颜色/门号配置
4. 添加房间历史记录
5. 支持中英双语切换

### 需要注意的设计细节

1. 玻璃拟态效果需要 `backdrop-filter` 兼容性处理
2. 移动端 Wake Lock API 兼容性（Safari 不完全支持）
3. 噪点纹理层使用 CSS 或 SVG 实现
4. Phosphor Icons 可按需引入减小体积
5. 字体 Outfit 需考虑中文字符回退方案
