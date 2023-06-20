import styles from '@styles/header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.title}>LOL Simulation</div>
      </div>
    </header>
  );
}
