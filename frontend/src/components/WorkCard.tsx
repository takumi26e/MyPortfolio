'use client';

import type { Work } from '@/types';
import styles from './WorkCard.module.css';

interface WorkCardProps {
  work: Work;
  onClick: (work: Work) => void;
}

export default function WorkCard({ work, onClick }: WorkCardProps) {
  const tagList = work.tags.split(',').map((t) => t.trim());

  return (
    <article
      className={styles.card}
      onClick={() => onClick(work)}
      id={`work-card-${work.id}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(work);
        }
      }}
    >
      <div className={styles.thumbnailWrapper}>
        {work.thumbnail_url ? (
          <img
            src={work.thumbnail_url}
            alt={work.title}
            className={styles.thumbnail}
            loading="lazy"
          />
        ) : (
          <div className={styles.placeholderThumb}>
            {work.title.charAt(0)}
          </div>
        )}
        <div className={styles.overlay}>
          <span className={styles.overlayIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 3 21 3 21 9" />
              <path d="M10 14L21 3" />
              <path d="M21 3L10 14" />
            </svg>
          </span>
        </div>
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{work.title}</h3>
        <div className={styles.tags}>
          {tagList.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
