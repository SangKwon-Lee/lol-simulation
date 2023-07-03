import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '@styles/header.module.scss';

export default function Header() {
  const router = useRouter();
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
              fontWeight: router.pathname === '/' ? 700 : 400
            }}
          >
            상자깡
          </Link>
          <Link
            href={'/couple'}
            title="LoL Simulation 나의 연애 상대 찾기"
            style={{
              fontWeight: router.pathname === '/couple' ? 700 : 400
            }}
          >
            연애 상대 찾기
          </Link>
        </nav>
      </div>
    </header>
  );
}
