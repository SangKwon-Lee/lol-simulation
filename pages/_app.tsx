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
import { ReactElement, ReactNode, useEffect, useState } from 'react';

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

declare global {
  interface Window {
    Kakao: any;
  }
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || ((page) => <MainLayout>{page}</MainLayout>);
  const [hydrated, setHydrated] = useState(false);
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

  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    return null;
  }

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
      <div className={roboto.className}>{getLayout(<Component {...pageProps} />)}</div>
      <Analytics />
    </>
  );
};

export default appWithTranslation(App);
