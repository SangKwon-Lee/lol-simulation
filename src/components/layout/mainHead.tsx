// Head Component
import Head from 'next/head';
import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import metaParser, { MetaObjType } from '@utils/metaUtil';

type Props = {
  title?: string;
  children?: ReactElement;
  metaObj?: MetaObjType;
};

export default function MainHead({ title = 'LOL Simulation', children, metaObj }: Props) {
  const router = useRouter();
  const p = router.asPath.slice(1);
  const canonicalURL = `https://lol-simulation.vercel.app/${p}`.split('?')[0];
  return (
    <Head>
      <>
        <link rel="icon" href="/images/hextech_chest.png" />
        <link rel="canonical" href={canonicalURL} />
        <title>{title}</title>
        {children}
        {metaObj && metaParser(metaObj)}
      </>
    </Head>
  );
}
