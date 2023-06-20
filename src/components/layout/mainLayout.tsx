import Footer from './footer';
import Header from './header';
import styles from '@styles/layout.module.scss';

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <>
      <Header />
      <div className={styles.main}>{children}</div>
      <Footer />
    </>
  );
}
