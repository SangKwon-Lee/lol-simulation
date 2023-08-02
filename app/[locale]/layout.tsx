//*
import Script from 'next/script';
import { Roboto } from 'next/font/google';
import { notFound } from 'next/navigation';
import { Analytics } from '@vercel/analytics/react';
import { NextIntlClientProvider, useLocale } from 'next-intl';

// * css
import Providers from '@styles/index';
import StyledComponentsRegistry from '@src/lib/registry';

// * components
import * as gtag from '@src/lib/gtag';
import Kakao from '@components/page/kakao';
import Header from '@components/layout/header';
import Footer from '@components/layout/footer';

declare global {
  interface Window {
    Kakao: any;
  }
}

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
});

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: any;
}) {
  const locale = useLocale();
  if (params.locale !== locale) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <StyledComponentsRegistry>
      <Providers>
        <html lang={locale}>
          <Kakao />
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
          />
          <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1080731564650029"
            crossOrigin="anonymous"
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
          <body className={roboto.className}>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <Header />
              <div className="main">{children}</div>
              <Footer />
            </NextIntlClientProvider>
          </body>
          <Analytics />
        </html>
      </Providers>
    </StyledComponentsRegistry>
  );
}
