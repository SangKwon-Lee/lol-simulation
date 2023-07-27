const version = process.env.NEXT_PUBLIC_VERSION;
export const imageLoader = ({ src }: { src: string }) => {
  return `${src}`;
};

export const champSkin = (randomChamp: any, randomSkin: any) => {
  return `${'https://ddragon.leagueoflegends.com'}/cdn/img/champion/loading/${randomChamp}_${randomSkin}.jpg`;
};

export const champSquare = (randomChamp: any) => {
  return `${'https://ddragon.leagueoflegends.com'}/cdn/${version}/img/champion/${randomChamp}.png`;
};
