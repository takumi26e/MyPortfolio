'use client';

import { useEffect, useRef } from 'react';
import styles from './Timeline.module.css';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.timeline} id="timeline">
      {items.map((item, index) => (
        <div
          key={index}
          className={styles.item}
          ref={(el) => { itemRefs.current[index] = el; }}
        >
          <div className={styles.dot} />
          <span className={styles.year}>{item.year}</span>
          <h3 className={styles.itemTitle}>{item.title}</h3>
          <p className={styles.itemDescription}>{item.description}</p>
        </div>
      ))}
    </div>
  );
}
