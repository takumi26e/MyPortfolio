'use client';

import { useState, useEffect } from 'react';
import type { Work } from '@/types';
import WorkCard from '@/components/WorkCard';
import WorkModal from '@/components/WorkModal';
import styles from './page.module.css';

const sampleWorks: Work[] = [
  { id: 1, title: 'ポートフォリオサイト', description: '個人のポートフォリオサイト。Next.js と Cloudflare Pages で構築。', thumbnail_url: null, project_url: null, tags: 'web', created_at: '2026-05-09', sort_order: 1 },
];

const tagOptions = ['Web', 'Illust', 'Movie'];

export default function WorksPage() {
  const [works, setWorks] = useState<Work[]>(sampleWorks);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787'}/api/works`)
      .then((r) => r.json())
      .then((data) => { if (data.works?.length) setWorks(data.works); })
      .catch(() => { });
  }, []);

  const filteredWorks = activeTag
    ? works.filter((w) => w.tags.toLowerCase().includes(activeTag.toLowerCase()))
    : works;

  const handleTagChange = (tag: string | null) => {
    setAnimating(true);
    setTimeout(() => {
      setActiveTag(tag);
      setAnimating(false);
    }, 150);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Works</h1>
        <p className={styles.subtitle}>制作したもの一覧。</p>
      </div>

      {/* Tag Filter */}
      <div className={styles.filterBar} id="works-filter">
        <button
          className={`${styles.filterButton} ${activeTag === null ? styles.filterActive : ''}`}
          onClick={() => handleTagChange(null)}
          id="filter-all"
        >
          All
        </button>
        {tagOptions.map((tag) => (
          <button
            key={tag}
            className={`${styles.filterButton} ${activeTag === tag.toLowerCase() ? styles.filterActive : ''}`}
            onClick={() => handleTagChange(tag.toLowerCase())}
            id={`filter-${tag.toLowerCase()}`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Works Grid */}
      <div className={`${styles.grid} ${animating ? styles.gridAnimating : ''}`} id="works-grid">
        {filteredWorks.map((work) => (
          <WorkCard key={work.id} work={work} onClick={setSelectedWork} />
        ))}
        {filteredWorks.length === 0 && (
          <p className={styles.emptyMessage}>該当する作品がありません。</p>
        )}
      </div>

      {/* Modal */}
      {selectedWork && (
        <WorkModal work={selectedWork} onClose={() => setSelectedWork(null)} />
      )}
    </div>
  );
}
