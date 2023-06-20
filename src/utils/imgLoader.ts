export const imageLoader = ({ src }: { src: string }) => {
  return `${src}`;
};

export const cndUrl = (randomChamp: any, randomSkin: any) => {
  return `${'https://ddragon.leagueoflegends.com'}/cdn/img/champion/loading/${randomChamp}_${randomSkin}.jpg`;
};
