'use client';
import { useRouter } from 'next/navigation';
import styles from '@styles/404.module.scss';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const router = useRouter();
  const t = useTranslations('Index');

  return (
    <main className={styles[`main`]}>
      <div className={styles[`text`]}>{t(`welcome`)}</div>
      <div className={styles[`text`]}>404 Not Found</div>
      <div className={styles[`button-wrapper`]}>
        <button className={styles[`button`]} onClick={() => router.push(`/`)}>
          {t(`url1`)}
        </button>
        <button className={styles[`button`]} onClick={() => router.push(`/couple`)}>
          {t(`url2`)}
        </button>
      </div>
    </main>
  );
}
