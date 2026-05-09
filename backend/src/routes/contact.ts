import { Hono } from 'hono';
import type { Bindings } from '../types';

const contact = new Hono<{ Bindings: Bindings }>();

// お問い合わせ送信
contact.post('/', async (c) => {
  try {
    const body = await c.req.json<{
      name: string;
      email: string;
      message: string;
    }>();

    // バリデーション
    if (!body.name || !body.email || !body.message) {
      return c.json({ error: '全ての項目を入力してください' }, 400);
    }

    // メールアドレスの簡易バリデーション
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return c.json({ error: '有効なメールアドレスを入力してください' }, 400);
    }

    // D1に保存
    await c.env.DB.prepare(
      `INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)`
    )
      .bind(body.name, body.email, body.message)
      .run();

    return c.json({ success: true, message: 'お問い合わせを送信しました' });
  } catch (error) {
    return c.json({ error: '送信に失敗しました。もう一度お試しください' }, 500);
  }
});

export default contact;
