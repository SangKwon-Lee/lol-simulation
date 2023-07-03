import { useRouter } from 'next/router';
import styles from '@styles/404.module.scss';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function NotFound() {
  const router = useRouter();
  const { t } = useTranslation('common');
  return (
    <main className={styles[`main`]}>
      <div className={styles[`text`]}>{t(`welcome`)}</div>
      <div className={styles[`text`]}>404 Not Found</div>
      <div className={styles[`button-wrapper`]}>
        <button className={styles[`button`]} onClick={() => router.push(`/`)}>
          상자깡
        </button>
        <button className={styles[`button`]} onClick={() => router.push(`/couple`)}>
          롤 연애 상대 찾기
        </button>
      </div>
    </main>
  );
}

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
    }
  };
};
