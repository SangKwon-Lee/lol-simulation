import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function NotFound() {
  const { t } = useTranslation('common');
  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingTop: '36px'
      }}
    >
      <div style={{ fontSize: '32px' }}>{t(`welcome`)}</div>
      <div style={{ fontSize: '32px' }}>404 Not Found</div>
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
