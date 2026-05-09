-- 作品データ
INSERT INTO works (title, description, thumbnail_url, project_url, tags, sort_order) VALUES

  -- 1件目
  ('ポートフォリオサイト', 'このサイト。', '/images/works/portfolio.png', NULL, 'web', 1);

-- 記事データ
INSERT INTO notes (title, description, thumbnail_url, url, source, content, published_at) VALUES

  -- 1件目
  ('ポートフォリオサイトを開設しました！', 'はじめまして。相良拓海です。この度、ポートフォリオサイトを開設しました。今後、制作物や学習の記録をこちらに残していきます。', '/images/notes/blog1.png', NULL, 'internal',
'はじめまして。相良拓海です。

この度、制作物や学習の記録をまとめるためのポートフォリオサイトを開設しました。

技術の学習記録や、趣味で制作しているイラスト・映像作品などを、こちらの「Notes」や「Works」に少しずつ追加していく予定です。

よろしくお願いします！', '2026-05-09');
