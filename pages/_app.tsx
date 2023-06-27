// * css
import '@styles/theme.scss';
import '@styles/_reset.scss';
import '@styles/_variables.scss';

// * next
import { NextPage } from 'next';
import Script from 'next/script';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Roboto } from 'next/font/google';
import { appWithTranslation } from 'next-i18next';
import { Analytics } from '@vercel/analytics/react';
import { ReactElement, ReactNode, useEffect } from 'react';

// * components
import * as gtag from '@src/lib/gtag';
import MainHead from '@components/layout/mainHead';
import MainLayout from '@components/layout/mainLayout';

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
  'og:url': 'https://lol-simulation.site',
  'og:image:alt': '마법공학 상자',
  'og:type': 'website',
  'og:site_name': 'LOL Simulation',
  'og:image': '/images/hextech_chest.png',
  keywords:
    'LOL Simulation, lol, simultation,롤 시뮬레이션, 롤 상자깡 시뮬레이션, 롤 상자깡,시뮬레이션, 게임 시뮬레이션, 시뮬레이터, 롤 시뮬레이터, 상자깡, 상자, 마법공학 상자, 마법공학, 명품상자, 주머니, 토큰, 롤 상자깡, 라구, 롤, 리그오브레전드, 열쇠, 롤 스킨, 주황정수, 라구깡, 신스킨, 롤 신스킨, 먹그림자라구, 먹그림자라구깡, 롤 패스, kda, 프레스티지, 프레스티지 신스킨, 롤 스킨 목록,prestige, prestige box, prestige chest, hextech, hextech chest, lol skin, lol skin list, new lol skin, lol ward skin, lol profile icon, lol, 리그오브레전드, leagueoflegends, 롤 패치, 롤 신챔, Naafiri, 나피리, 페이커, faker'
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || ((page) => <MainLayout>{page}</MainLayout>);

  // GA 설정
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: any) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      {/* GA 설정 시작 */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
            page_path: window.location.pathname,
            });`
        }}
      />
      {/* GTM */}
      <Script
        id="gtm"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-T4RPP26');`
        }}
      />
      <MainHead metaObj={MetaTag}></MainHead>
      <div className={roboto.className}>{getLayout(<Component {...pageProps} />)}</div>
      <Analytics />
    </>
  );
};

export default appWithTranslation(App);
