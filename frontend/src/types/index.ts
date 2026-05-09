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

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ApiResponse<T> {
  works?: T[];
  work?: T;
  notes?: T[];
  success?: boolean;
  message?: string;
  error?: string;
}
