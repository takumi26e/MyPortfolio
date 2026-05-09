export interface Work {
  id: number;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  project_url: string | null;
  tags: string;
  created_at: string;
  sort_order: number;
}

export interface Note {
  id: number;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  url: string | null;
  source: string;
  content?: string | null;
  published_at: string | null;
  created_at: string;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
  is_read: number;
}

export type Bindings = {
  DB: D1Database;
};
