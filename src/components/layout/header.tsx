import styles from '@styles/header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>LOL Simulation</h1>
      </div>
    </header>
  );
}
