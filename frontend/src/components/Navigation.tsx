'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navigation.module.css';

interface MenuItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const menuItems: MenuItem[] = [
  {
    label: 'Home',
    href: '/',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    label: 'Works',
    href: '/works',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    label: 'About Me',
    href: '/about',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    label: 'Notes',
    href: '/notes',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    label: 'Contact',
    href: '/#contact',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isContactVisible, setIsContactVisible] = useState(false);

  // Homeページにいる時、#contactセクションの可視状態を監視
  useEffect(() => {
    if (pathname !== '/') {
      setIsContactVisible(false);
      return;
    }

    const contactEl = document.getElementById('contact');
    if (!contactEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsContactVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    observer.observe(contactEl);
    return () => observer.disconnect();
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/#contact') {
      // Contactはhomeページでcontactセクションが見えている時だけアクティブ
      return pathname === '/' && isContactVisible;
    }
    if (href === '/') {
      // Homeはhomeページでcontactセクションが見えていない時にアクティブ
      return pathname === '/' && !isContactVisible;
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className={styles.nav} id="main-navigation">
      <Link href="/" className={styles.logo}>
        Sagara Takumi
      </Link>

      <ul className={styles.menuList}>
        {menuItems.map((item) => (
          <li key={item.href}>
              <Link
                href={item.href}
                className={`${styles.menuItem} ${isActive(item.href) ? styles.active : ''}`}
                id={`nav-${item.label.toLowerCase().replace(/\s/g, '-')}`}
                onClick={(e) => {
                  if (item.href === '/' && pathname === '/') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
              >
                <span className={styles.menuIcon}>{item.icon}</span>
                <span className={styles.menuLabel}>{item.label}</span>
              </Link>
          </li>
        ))}
      </ul>


    </nav>
  );
}
