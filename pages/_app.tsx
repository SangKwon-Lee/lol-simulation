// * css
import '@styles/theme.scss';
import '@styles/_reset.scss';
import '@styles/_variables.scss';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Roboto } from 'next/font/google';
import { ReactElement, ReactNode } from 'react';
import MainLayout from '@components/layout/mainLayout';
import MainHead from '@components/layout/mainHead';
import { Analytics } from '@vercel/analytics/react';
// * 폰트 설정
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
});

// * NextJs Layout 설정
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

// * 메타 태그 설정
const MetaTag = {
  description: 'LOL Simulation',
  'og:title': 'LOL Simulation',
  'og:description': 'LOL Simulation ',
  keywords:
    'LOL Simulation, lol, simultation, 상자깡, 상자, 마법공학 상자, 마법공학, 명품상자, 주머니, 토큰'
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => <MainLayout>{page}</MainLayout>);

  return (
    <>
      <MainHead metaObj={MetaTag}></MainHead>
      <div className={roboto.className}>{getLayout(<Component {...pageProps} />)}</div>
      <Analytics />
    </>
  );
}
