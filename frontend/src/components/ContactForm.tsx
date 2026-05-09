'use client';

import { useState, type FormEvent } from 'react';
import { submitContact } from '@/lib/api';
import styles from './ContactForm.module.css';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'お名前を入力してください';
    if (!formData.email.trim()) {
      newErrors.email = 'メールアドレスを入力してください';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '有効なメールアドレスを入力してください';
    }
    if (!formData.message.trim()) newErrors.message = 'メッセージを入力してください';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('sending');
    try {
      await submitContact(formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : '送信に失敗しました');
    }
  };

  if (status === 'success') {
    return (
      <div className={styles.successMessage} id="contact-success">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        お問い合わせを送信しました。ありがとうございます！
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} id="contact-form" noValidate>
      <div className={styles.fieldGroup}>
        <label htmlFor="contact-name" className={styles.label}>お名前</label>
        <input
          type="text"
          id="contact-name"
          className={`${styles.input} ${errors.name ? styles.error : ''}`}
          placeholder="山田 太郎"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        {errors.name && <span className={styles.errorText}>{errors.name}</span>}
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="contact-email" className={styles.label}>メールアドレス</label>
        <input
          type="email"
          id="contact-email"
          className={`${styles.input} ${errors.email ? styles.error : ''}`}
          placeholder="example@email.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {errors.email && <span className={styles.errorText}>{errors.email}</span>}
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="contact-message" className={styles.label}>メッセージ</label>
        <textarea
          id="contact-message"
          className={`${styles.textarea} ${errors.message ? styles.error : ''}`}
          placeholder="お気軽にお問い合わせください"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
        {errors.message && <span className={styles.errorText}>{errors.message}</span>}
      </div>

      {status === 'error' && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}

      <button
        type="submit"
        className={styles.submitButton}
        disabled={status === 'sending'}
        id="contact-submit"
      >
        {status === 'sending' ? '送信中...' : '送信する'}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </button>
    </form>
  );
}
