'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import type { Note } from '@/types';
import styles from './page.module.css';

export default function NoteDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787'}/api/notes/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error('Not found');
        return r.json();
      })
      .then((data) => {
        setNote(data.note);
      })
      .catch(() => {
        router.push('/notes');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, router]);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!note) return null;

  const formattedDate = note.published_at
    ? new Date(note.published_at).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  const renderContent = (content: string) => {
    return content.split('\n\n').map((block, i) => {
      if (block.startsWith('## ')) {
        return <h2 key={i} className={styles.heading2}>{block.replace('## ', '')}</h2>;
      }
      if (block.startsWith('# ')) {
        return <h1 key={i} className={styles.heading1}>{block.replace('# ', '')}</h1>;
      }
      return (
        <p key={i} className={styles.paragraph}>
          {block.split('\n').map((line, j) => (
            <span key={j}>
              {line}
              {j < block.split('\n').length - 1 && <br />}
            </span>
          ))}
        </p>
      );
    });
  };

  return (
    <div className={styles.page}>
      <Link href="/notes" className={styles.backLink}>
        &larr; Back to Notes
      </Link>
      
      <article className={styles.article}>
        <header className={styles.header}>
          <div className={styles.meta}>
            <span className={styles.badge}>Blog</span>
            {formattedDate && <span className={styles.date}>{formattedDate}</span>}
          </div>
          <h1 className={styles.title}>{note.title}</h1>
        </header>
        
        <div className={styles.content}>
          {note.content ? renderContent(note.content) : <p>{note.description}</p>}
        </div>
      </article>
    </div>
  );
}
