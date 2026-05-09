'use client';

import type { Note } from '@/types';
import styles from './NoteCard.module.css';

interface NoteCardProps {
  note: Note;
}

export default function NoteCard({ note }: NoteCardProps) {
  const isExternal = note.source !== 'internal' && note.url;
  const href = isExternal ? note.url! : `/notes/${note.id}`;

  const formattedDate = note.published_at
    ? new Date(note.published_at).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  const getSourceBadgeClass = () => {
    if (note.source === 'note') return `${styles.sourceBadge} ${styles.note}`;
    if (note.source === 'internal') return `${styles.sourceBadge} ${styles.internal}`;
    return `${styles.sourceBadge} ${styles.external}`;
  };

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={styles.card}
      id={`note-card-${note.id}`}
    >
      <div className={styles.thumbnailWrapper}>
        {note.thumbnail_url ? (
          <img
            src={note.thumbnail_url}
            alt={note.title}
            className={styles.thumbnail}
            loading="lazy"
          />
        ) : (
          <div className={styles.placeholderThumb}>
            {note.title.charAt(0)}
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={getSourceBadgeClass()}>
            {note.source === 'internal' ? 'Blog' : note.source}
          </span>
          {formattedDate && <span className={styles.date}>{formattedDate}</span>}
        </div>
        <h3 className={styles.title}>
          {note.title}
          {isExternal && (
            <span className={styles.externalIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </span>
          )}
        </h3>
        {note.description && (
          <p className={styles.description}>{note.description}</p>
        )}
      </div>
    </a>
  );
}
