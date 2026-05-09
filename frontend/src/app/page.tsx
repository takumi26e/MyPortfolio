'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import type { Work, Note } from '@/types';
import WorkCard from '@/components/WorkCard';
import WorkModal from '@/components/WorkModal';
import NoteCard from '@/components/NoteCard';
import ContactForm from '@/components/ContactForm';
import styles from './page.module.css';

// サンプルデータ（API未接続時のフォールバック）
const sampleWorks: Work[] = [
  { id: 1, title: 'ポートフォリオサイト', description: '個人のポートフォリオサイト。Next.js と Cloudflare Pages で構築。', thumbnail_url: null, project_url: null, tags: 'web', created_at: '2026-05-09', sort_order: 1 },
];

const sampleNotes: Note[] = [
  { id: 1, title: 'ポートフォリオサイトを開設しました！', description: 'はじめまして。Sagara Takumiです。この度、ポートフォリオサイトを開設しました。今後、制作物や学習の記録をこちらに残していきます。', thumbnail_url: null, url: null, source: 'internal', published_at: '2026-05-09', created_at: '2026-05-09' },
];

export default function HomePage() {
  const [works, setWorks] = useState<Work[]>(sampleWorks);
  const [notes, setNotes] = useState<Note[]>(sampleNotes);
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // Scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Try to fetch from API
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787'}/api/works`)
      .then((r) => r.json())
      .then((data) => { if (data.works?.length) setWorks(data.works); })
      .catch(() => { });

    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787'}/api/notes`)
      .then((r) => r.json())
      .then((data) => { if (data.notes?.length) setNotes(data.notes); })
      .catch(() => { });
  }, []);

  return (
    <div className={styles.page}>
      {/* ===== Hero Section ===== */}
      <section className={styles.hero} id="hero">
        <div className={styles.heroContent}>
          <p className={styles.heroGreeting}>Hello, I&apos;m</p>
          <h1 className={styles.heroName}>Sagara Takumi</h1>
          <p className={styles.heroTagline}>
            Web技術の学習や趣味のイラスト・映像制作の記録を残します。<br />
            現在大学3年生。
          </p>
          <div className={styles.heroCta}>
            <Link href="/works" className={styles.heroButton}>
              作品を見る
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <a href="#contact" className={styles.heroButtonOutline}>
              お問い合わせ
            </a>
          </div>
        </div>
        <div className={styles.heroDecoration}>
          <div className={styles.heroCircle1} />
          <div className={styles.heroCircle2} />
          <div className={styles.heroCircle3} />
        </div>
      </section>

      {/* ===== Works Preview ===== */}
      <section
        className={`${styles.section} fade-in-up`}
        ref={(el) => { sectionRefs.current[0] = el; }}
        id="works-preview"
      >
        <div className={styles.sectionHeader}>
          <h2 className="section-title">Works</h2>
          <Link href="/works" className={styles.seeMoreLink}>
            すべて見る →
          </Link>
        </div>
        <div className={styles.worksGrid}>
          {works.slice(0, 4).map((work) => (
            <WorkCard key={work.id} work={work} onClick={setSelectedWork} />
          ))}
        </div>
      </section>

      {/* ===== About Preview ===== */}
      <section
        className={`${styles.section} fade-in-up`}
        ref={(el) => { sectionRefs.current[1] = el; }}
        id="about-preview"
      >
        <div className={styles.sectionHeader}>
          <h2 className="section-title">About Me</h2>
          <Link href="/about" className={styles.seeMoreLink}>
            もっと見る →
          </Link>
        </div>
        <div className={styles.aboutCard}>
          <img src="/images/avatar.jpg" alt="Sagara Takumi" className={styles.aboutAvatar} />
          <div className={styles.aboutText}>
            <h3 className={styles.aboutName}>Sagara Takumi</h3>
            <p className={styles.aboutDescription}>
              Web技術の学習や趣味のイラスト・映像制作の記録を残します。現在大学3年生。
            </p>
          </div>
        </div>
      </section>

      {/* ===== Notes Preview ===== */}
      <section
        className={`${styles.section} fade-in-up`}
        ref={(el) => { sectionRefs.current[2] = el; }}
        id="notes-preview"
      >
        <div className={styles.sectionHeader}>
          <h2 className="section-title">Notes</h2>
          <Link href="/notes" className={styles.seeMoreLink}>
            すべて見る →
          </Link>
        </div>
        <div className={styles.notesGrid}>
          {notes.slice(0, 3).map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      </section>

      {/* ===== Contact Section ===== */}
      <section
        className={`${styles.section} ${styles.contactSection} fade-in-up`}
        ref={(el) => { sectionRefs.current[3] = el; }}
        id="contact"
      >
        <h2 className="section-title">Contact</h2>
        <p className={styles.contactDescription}>
          お問い合わせはこちら。
        </p>
        <div className={styles.contactContent}>
          <ContactForm />
        </div>
      </section>

      {/* Modal */}
      {selectedWork && (
        <WorkModal work={selectedWork} onClose={() => setSelectedWork(null)} />
      )}
    </div>
  );
}
