// * 상자에 따른 확률 표기

export const handleGetProb = (boxName: string) => {
  if (boxName === `hextech`) {
    return hextechProb;
  } else if (boxName === `prestigeBox`) {
    return PrestigeProb;
  } else if (boxName === `eventBox`) {
    return EventProb;
  } else if (boxName === `bag`) {
    return BagProb;
  } else {
    return hextechProb;
  }
};

export const hextechProb = [
  {
    name: 'skin',
    percent: '50%'
  },
  {
    name: 'champ',
    percent: '25%'
  },
  {
    name: 'wardSkin',
    percent: '10%'
  },
  {
    name: 'emotion',
    percent: '9%'
  },
  {
    name: 'profileIcon',
    percent: '3%'
  },
  {
    name: 'mythicEssence',
    percent: '3%'
  }
];

export const PrestigeProb = [
  {
    name: 'skin',
    percent: '70%'
  },
  {
    name: 'orangeEssence',
    percent: '10%'
  },
  {
    name: 'wardSkin',
    percent: '10%'
  },
  {
    name: 'emotion',
    percent: '6.5%'
  },
  {
    name: 'mythicEssence',
    percent: '3.5%'
  }
];

export const EventProb = [
  {
    name: 'skin',
    percent: '96.5%'
  },
  {
    name: 'mythicEssence',
    percent: '3.5%'
  }
];

export const BagProb = [
  {
    name: 'skin',
    percent: '100%'
  }
];
