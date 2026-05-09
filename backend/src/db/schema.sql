-- 作品テーブル
CREATE TABLE IF NOT EXISTS works (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  project_url TEXT,
  tags TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  sort_order INTEGER DEFAULT 0
);

-- 記事テーブル
CREATE TABLE IF NOT EXISTS notes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  url TEXT,
  source TEXT NOT NULL DEFAULT 'internal',
  content TEXT,
  published_at TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

-- お問い合わせテーブル
CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  is_read INTEGER DEFAULT 0
);
