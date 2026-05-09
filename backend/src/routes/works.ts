import { Hono } from 'hono';
import type { Work, Bindings } from '../types';

const works = new Hono<{ Bindings: Bindings }>();

// 作品一覧取得
works.get('/', async (c) => {
  const tag = c.req.query('tag');

  let results;
  if (tag) {
    // タグで絞り込み（tags カラムにカンマ区切りで格納）
    const { results: rows } = await c.env.DB.prepare(
      `SELECT * FROM works WHERE (',' || tags || ',') LIKE ? ORDER BY sort_order ASC`
    )
      .bind(`%,${tag},%`)
      .all<Work>();
    results = rows;
  } else {
    const { results: rows } = await c.env.DB.prepare(
      `SELECT * FROM works ORDER BY sort_order ASC`
    ).all<Work>();
    results = rows;
  }

  return c.json({ works: results });
});

// 作品詳細取得
works.get('/:id', async (c) => {
  const id = c.req.param('id');
  const result = await c.env.DB.prepare(
    `SELECT * FROM works WHERE id = ?`
  )
    .bind(id)
    .first<Work>();

  if (!result) {
    return c.json({ error: 'Work not found' }, 404);
  }

  return c.json({ work: result });
});

export default works;
