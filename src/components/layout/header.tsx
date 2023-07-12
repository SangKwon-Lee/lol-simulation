'use client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import styles from '@styles/header.module.scss';

export default function Header() {
  const t = useTranslations('Index');
  const pathname = usePathname();
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <Link href={'/'}>
          <h1 className={styles.title}>LOL Simulation</h1>
        </Link>
        <nav className={styles[`nav-wrapper`]}>
          <Link
            href={'/'}
            title="LoL Simulation 상자깡"
            style={{
              fontWeight: pathname === '/' ? 700 : 400
            }}
          >
            {t(`navBox`)}
          </Link>
          <Link
            href={'/couple'}
            title="LoL Simulation 나의 연애 상대 찾기"
            style={{
              fontWeight: pathname === '/couple' ? 700 : 400
            }}
          >
            {t(`navCouple`)}
          </Link>
        </nav>
      </div>
    </header>
  );
}
