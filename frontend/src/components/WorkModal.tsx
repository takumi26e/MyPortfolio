'use client';

import { useEffect, useCallback } from 'react';
import type { Work } from '@/types';
import styles from './WorkModal.module.css';

interface WorkModalProps {
  work: Work;
  onClose: () => void;
}

export default function WorkModal({ work, onClose }: WorkModalProps) {
  const tagList = work.tags.split(',').map((t) => t.trim());

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      id="work-modal-overlay"
    >
      <div className={styles.modal} role="dialog" aria-modal="true" aria-label={work.title} id="work-modal">
        <button className={styles.closeButton} onClick={onClose} aria-label="閉じる">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className={styles.imageWrapper}>
          {work.thumbnail_url ? (
            <img src={work.thumbnail_url} alt={work.title} className={styles.image} />
          ) : (
            <div className={styles.placeholderImage}>{work.title.charAt(0)}</div>
          )}
        </div>

        <div className={styles.content}>
          <h2 className={styles.title}>{work.title}</h2>

          <div className={styles.tags}>
            {tagList.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>

          {work.description && (
            <p className={styles.description}>{work.description}</p>
          )}

          {work.project_url && (
            <a
              href={work.project_url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkButton}
            >
              プロジェクトを見る
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
