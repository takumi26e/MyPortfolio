import { Hono } from 'hono';
import type { Note, Bindings } from '../types';

const notes = new Hono<{ Bindings: Bindings }>();

// 記事一覧取得
notes.get('/', async (c) => {
  const { results } = await c.env.DB.prepare(
    `SELECT * FROM notes ORDER BY published_at DESC`
  ).all<Note>();

  return c.json({ notes: results });
});

// 記事詳細取得
notes.get('/:id', async (c) => {
  const id = c.req.param('id');
  const result = await c.env.DB.prepare(
    `SELECT * FROM notes WHERE id = ?`
  ).bind(id).first<Note>();

  if (!result) {
    return c.json({ error: 'Note not found' }, 404);
  }

  return c.json({ note: result });
});

export default notes;
