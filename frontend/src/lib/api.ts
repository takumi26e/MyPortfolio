import type { Work, Note, ContactFormData } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || 'Request failed');
  }

  return res.json();
}

export async function getWorks(tag?: string): Promise<Work[]> {
  const query = tag ? `?tag=${encodeURIComponent(tag)}` : '';
  const data = await fetchApi<{ works: Work[] }>(`/api/works${query}`);
  return data.works;
}

export async function getWork(id: number): Promise<Work> {
  const data = await fetchApi<{ work: Work }>(`/api/works/${id}`);
  return data.work;
}

export async function getNotes(): Promise<Note[]> {
  const data = await fetchApi<{ notes: Note[] }>('/api/notes');
  return data.notes;
}

export async function submitContact(formData: ContactFormData): Promise<{ success: boolean; message: string }> {
  return fetchApi('/api/contact', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
}
