import Timeline from '@/components/Timeline';
import styles from './page.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Me — Sagara Takumi',
  description: 'Sagara Takumi の自己紹介と経歴。',
};

const timelineItems = [
  {
    year: '2026',
    title: 'ポートフォリオサイト開設',
    description: 'このサイトを開設。',
  },
];

export default function AboutPage() {
  return (
    <div className={styles.page}>
      {/* Profile Section */}
      <section className={styles.profileSection} id="profile">
        <div className={styles.avatarWrapper}>
          <img src="/images/avatar.jpg" alt="Sagara Takumi" className={styles.avatar} />
        </div>
        <div className={styles.profileInfo}>
          <h1 className={styles.name}>Sagara Takumi</h1>
          <p className={styles.role}>Creator / Developer</p>
          <div className={styles.bio}>
            <p>
              Web技術の学習や趣味のイラスト・映像制作の記録を残します。現在大学3年生。
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className={styles.timelineSection} id="career-timeline">
        <h2 className={`section-title ${styles.timelineTitle}`}>Log</h2>
        <Timeline items={timelineItems} />
      </section>
    </div>
  );
}
