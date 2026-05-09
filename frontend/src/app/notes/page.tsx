'use client';

import { useState, useEffect } from 'react';
import type { Note } from '@/types';
import NoteCard from '@/components/NoteCard';
import styles from './page.module.css';

const sampleNotes: Note[] = [
  { id: 1, title: 'ポートフォリオサイトを開設しました！', description: 'はじめまして。Sagara Takumiです。この度、ポートフォリオサイトを開設しました。今後、制作物や学習の記録をこちらに残していきます。よろしくお願いします！', thumbnail_url: null, url: null, source: 'internal', published_at: '2026-05-09', created_at: '2026-05-09' },
];

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>(sampleNotes);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787'}/api/notes`)
      .then((r) => r.json())
      .then((data) => { if (data.notes?.length) setNotes(data.notes); })
      .catch(() => { });
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Notes</h1>
        <p className={styles.subtitle}>
          書いた記事の一覧。
        </p>
      </div>

      <div className={styles.grid} id="notes-grid">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}
