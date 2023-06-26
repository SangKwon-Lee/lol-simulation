// * css
import '@styles/theme.scss';
import '@styles/_reset.scss';
import '@styles/_variables.scss';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Roboto } from 'next/font/google';
import { ReactElement, ReactNode } from 'react';
import MainHead from '@components/layout/mainHead';
import { Analytics } from '@vercel/analytics/react';
import MainLayout from '@components/layout/mainLayout';
import { appWithTranslation } from 'next-i18next';
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
  'og:description': 'LOL Simulation',
  'og:url': 'https://lol-simulation.site/',
  'og:image:alt': '마법공학 상자',
  'og:type': 'website',
  'og:site_name': 'LOL Simulation',
  'og:image': '/images/hextech_chest.png',
  keywords:
    'LOL Simulation, lol, simultation,롤 시뮬레이션, 롤 상자깡 시뮬레이션, 롤 상자깡,시뮬레이션, 게임 시뮬레이션, 시뮬레이터, 롤 시뮬레이터, 상자깡, 상자, 마법공학 상자, 마법공학, 명품상자, 주머니, 토큰, 롤 상자깡, 라구, 롤, 리그오브레전드, 열쇠, 롤 스킨, 주황정수, 라구깡, 신스킨, 롤 신스킨, 먹그림자라구, 먹그림자라구깡, 롤 패스, kda, 프레스티지, 프레스티지 신스킨, 롤 스킨 목록'
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || ((page) => <MainLayout>{page}</MainLayout>);

  return (
    <>
      <MainHead metaObj={MetaTag}></MainHead>
      <div className={roboto.className}>{getLayout(<Component {...pageProps} />)}</div>
      <Analytics />
    </>
  );
};

// export default App;
export default appWithTranslation(App);
