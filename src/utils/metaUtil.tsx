// MetaUtils.tsx
type NameAttributeKeys = 'keywords' | 'description' | 'author' | 'generator' | 'robots';
type PropertyAttributeKeys =
  | 'og:type'
  | 'og:title'
  | 'og:description'
  | 'og:image'
  | 'og:image:alt'
  | 'og:url'
  | 'og:site_name';

type Keys = NameAttributeKeys | PropertyAttributeKeys | 'refresh';

export type MetaObjType = {
  [key in Keys]?: string;
};

const hasNameAttributeList: Keys[] = ['keywords', 'description', 'author', 'generator', 'robots'];

const hasPropertyAttributeList: Keys[] = [
  'og:type',
  'og:title',
  'og:description',
  'og:image',
  'og:image:alt',
  'og:url',
  'og:site_name'
];

const twitterAttributeList: Keys[] = [
  'og:url',
  'og:title',
  'og:description',
  'og:image',
  'og:image:alt'
];

const metaRenderer = (key: Keys, value: string | undefined) => {
  if (hasNameAttributeList.includes(key)) {
    return <meta name={key} content={value} key={key} />;
  }
  if (hasPropertyAttributeList.includes(key)) {
    return <meta property={key} content={value} key={key} />;
  }
  return <meta httpEquiv={key} content="" key={key} />;
};

const twitterMetaRender = (key: Keys, value: string | undefined) => {
  if (hasPropertyAttributeList.includes(key) && twitterAttributeList.includes(key)) {
    return (
      <meta property={`${key.replace('og:', 'twitter:')}`} content={value} key={`${key}-twitter`} />
    );
  }
  return null;
};

const metaParser = (metaObj: MetaObjType) => {
  let metaList;

  if (metaObj) {
    const MetaKeyList: Keys[] = Object.keys(metaObj) as Keys[];
    metaList = MetaKeyList.map((key: Keys) => metaRenderer(key, metaObj[key]));
    const twitterMetaList = MetaKeyList.map((key: Keys) => twitterMetaRender(key, metaObj[key]));
    metaList = [...metaList, ...twitterMetaList];
    console.log(metaList);
  }
  return metaList;
};

export default metaParser;
