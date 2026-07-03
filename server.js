// MapleStory Artale - 茱羅跳台協作工具 零依賴 HTTP 同步伺服器
// 啟動方式：node server.js（無需 npm install）

const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = 3456;
const ROOMS = new Map();

// ── Helpers ──
function gridKey(state) {
  return state && state.grid ? JSON.stringify(state.grid) : '';
}

// ── HTTP server ──
const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  const url = new URL(req.url, `http://localhost:${PORT}`);

  // Serve HTML
  if (req.method === 'GET' && (url.pathname === '/' || url.pathname === '/artale.html')) {
    const fp = path.join(__dirname, 'artale.html');
    fs.readFile(fp, (err, data) => {
      if (err) { res.writeHead(404); res.end('Not Found'); return; }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    });
    return;
  }

  // Get room state
  if (req.method === 'GET' && url.pathname === '/state') {
    const roomCode = url.searchParams.get('room');
    if (!roomCode || !ROOMS.has(roomCode)) {
      res.writeHead(404); res.end(JSON.stringify({ error: 'Room not found' })); return;
    }
    const room = ROOMS.get(roomCode);
    const ts = parseInt(url.searchParams.get('ts') || '0');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ state: room.state, ts: room.ts }));
    return;
  }

  // Create room
  if (req.method === 'POST' && url.pathname === '/create') {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => {
      try {
        const { roomCode, password, state } = JSON.parse(body);
        const now = Date.now();
        ROOMS.set(roomCode, { password, state, ts: now, gridActivity: now, players: {} });
        res.writeHead(200); res.end(JSON.stringify({ ok: true }));
      } catch (e) { res.writeHead(400); res.end(JSON.stringify({ error: e.message })); }
    });
    return;
  }

  // Join room
  if (req.method === 'POST' && url.pathname === '/join') {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => {
      try {
        const { roomCode, password, playerId } = JSON.parse(body);
        if (!ROOMS.has(roomCode)) {
          res.writeHead(404); res.end(JSON.stringify({ error: '房間不存在' })); return;
        }
        const room = ROOMS.get(roomCode);
        if (room.password !== password) {
          res.writeHead(403); res.end(JSON.stringify({ error: '密碼錯誤' })); return;
        }
        room.players[playerId] = Date.now();
        res.writeHead(200); res.end(JSON.stringify({ state: room.state, ts: room.ts }));
      } catch (e) { res.writeHead(400); res.end(JSON.stringify({ error: e.message })); }
    });
    return;
  }

  // Sync state
  if (req.method === 'POST' && url.pathname === '/sync') {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => {
      try {
        const { roomCode, state, playerId } = JSON.parse(body);
        if (!ROOMS.has(roomCode)) {
          res.writeHead(404); res.end(JSON.stringify({ error: 'Room not found' })); return;
        }
        const room = ROOMS.get(roomCode);
        // Detect actual grid change (not just heartbeat sync)
        const oldGridKey = gridKey(room.state);
        const newGridKey = gridKey(state);
        room.state = state;
        room.ts = Date.now();
        if (oldGridKey !== newGridKey) {
          room.gridActivity = Date.now();
        }
        if (playerId) room.players[playerId] = Date.now();
        res.writeHead(200); res.end(JSON.stringify({ ok: true, ts: room.ts }));
      } catch (e) { res.writeHead(400); res.end(JSON.stringify({ error: e.message })); }
    });
    return;
  }

  // Leave room
  if (req.method === 'POST' && url.pathname === '/leave') {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => {
      try {
        const { roomCode, playerId } = JSON.parse(body);
        if (ROOMS.has(roomCode)) {
          const room = ROOMS.get(roomCode);
          delete room.players[playerId];
          if (room.state && room.state.colors) {
            for (const c of ['orange', 'blue', 'pink', 'green']) {
              if (room.state.colors[c] === playerId) room.state.colors[c] = null;
            }
          }
        }
        res.writeHead(200); res.end(JSON.stringify({ ok: true }));
      } catch (e) { res.writeHead(400); res.end(JSON.stringify({ error: e.message })); }
    });
    return;
  }

  res.writeHead(404); res.end('Not Found');
});

// Clean idle rooms every 2 minutes
// Room is deleted if no grid changes for 20 minutes (regardless of connected players)
const IDLE_TIMEOUT = 20 * 60 * 1000; // 20 minutes
setInterval(() => {
  const now = Date.now();
  for (const [code, room] of ROOMS) {
    if (now - room.gridActivity > IDLE_TIMEOUT) {
      console.log(`[清理] 房間 ${code} 超過 20 分鐘無格子異動，已自動關閉`);
      ROOMS.delete(code);
    }
  }
}, 120000);

server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n✨ 伺服器已啟動（零依賴）！`);
  console.log(`   本機訪問：http://localhost:${PORT}`);
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        console.log(`   隊友訪問：http://${net.address}:${PORT}`);
      }
    }
  }
  console.log(`\n   按 Ctrl+C 停止\n`);
});
