-- 茱羅跳台協作工具 - Supabase 資料庫遷移腳本
-- 請在 Supabase SQL Editor 中執行此腳本

-- 1. 建立 rooms 資料表
CREATE TABLE IF NOT EXISTS rooms (
  room_code     TEXT PRIMARY KEY,
  password      TEXT NOT NULL,
  state         JSONB NOT NULL DEFAULT '{}'::jsonb,
  grid_activity TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. 啟用 Realtime（必須手動到 Supabase Dashboard > Database > Replication 開啟 rooms 表的 Realtime）
--    步驟：Dashboard → Database → Replication → 找到 rooms 表 → 打開開關

-- 3. 建立自動清理閒置房間的函數（超過 20 分鐘無 grid 更新）
CREATE OR REPLACE FUNCTION cleanup_idle_rooms()
RETURNS void AS $$
BEGIN
  DELETE FROM rooms
  WHERE grid_activity < NOW() - INTERVAL '20 minutes';
END;
$$ LANGUAGE plpgsql;

-- 4. 設定定時任務（每 2 分鐘檢查一次閒置房間）
--    注意：pg_cron 僅在 Supabase Pro 以上可用，免費方案無法使用
--    免費方案替代：前端會在每次操作時讀取 grid_activity 判斷是否過期
--    如需自動清理，可升級到 Pro 方案後執行以下：
-- SELECT cron.schedule('cleanup-rooms', '*/2 * * * *', 'SELECT cleanup_idle_rooms();');

-- 5. 建立索引以加速查詢
CREATE INDEX IF NOT EXISTS idx_rooms_updated_at ON rooms (updated_at);

-- 6. 設定 RLS（Row Level Security）規則 - 允許匿名讀寫
--    注意：本工具使用 anon key，必須允許匿名存取
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;

-- 允許任何人讀取房間
CREATE POLICY "Anyone can read rooms"
  ON rooms FOR SELECT
  USING (true);

-- 允許任何人建立房間
CREATE POLICY "Anyone can create rooms"
  ON rooms FOR INSERT
  WITH CHECK (true);

-- 允許任何人更新房間
CREATE POLICY "Anyone can update rooms"
  ON rooms FOR UPDATE
  USING (true);

-- 允許任何人刪除房間（由自動清理函數使用）
CREATE POLICY "Anyone can delete rooms"
  ON rooms FOR DELETE
  USING (true);
