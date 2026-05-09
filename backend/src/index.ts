import { Hono } from 'hono';
import { cors } from 'hono/cors';
import type { Bindings } from './types';
import worksRoute from './routes/works';
import notesRoute from './routes/notes';
import contactRoute from './routes/contact';

const app = new Hono<{ Bindings: Bindings }>();

// CORS設定
app.use(
  '/api/*',
  cors({
    origin: ['http://localhost:3000', 'https://umi.pages.dev'],
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type'],
  })
);

// ヘルスチェック
app.get('/', (c) => {
  return c.json({ message: 'Umi API is running' });
});

// ルーティング
app.route('/api/works', worksRoute);
app.route('/api/notes', notesRoute);
app.route('/api/contact', contactRoute);

export default app;
