// *전체 뽑기 관리
export const drawing = (type: string) => {
  if (type.includes('라구') || type === 'Soul Fighter') {
    return evnet();
  } else if (type === '마법공학 상자' || type === 'Hextech Chest') {
    return hextech();
  } else if (type === '명품 상자' || type === 'Prestige Chest') {
    return prestige();
  } else if (type === '꾸러미' || type === 'Bag') {
    bag();
  } else {
    hextech();
  }
};

//* 꾸러미
export const bag = () => {
  const spec = {
    skin: 1
  };
  var i,
    sum = 0,
    r = Math.random();
  for (i in spec) {
    // @ts-ignore
    sum += spec[i];
    if (r <= sum) return i;
  }
};

// * 라구
export const evnet = () => {
  const spec = {
    skin: 0.93,
    bag: 0.035,
    mythicEssence: 0.035
  };
  var i,
    sum = 0,
    r = Math.random();
  for (i in spec) {
    // @ts-ignore
    sum += spec[i];
    if (r <= sum) return i;
  }
};

// *롤 상자 확률
export const hextech = () => {
  const spec = {
    skin: 0.5,
    champ: 0.25,
    ward: 0.1,
    emotion: 0.09,
    profileIcon: 0.03,
    mythicEssence: 0.03
  };
  var i,
    sum = 0,
    r = Math.random();
  for (i in spec) {
    // @ts-ignore
    sum += spec[i];
    if (r <= sum) return i;
  }
};
export const prestige = () => {
  const spec = {
    skin: 0.7,
    ward: 0.1,
    orangeEssence: 0.1,
    emotion: 0.065,
    mythicEssence: 0.035
  };
  var i,
    sum = 0,
    r = Math.random();
  for (i in spec) {
    // @ts-ignore
    sum += spec[i];
    if (r <= sum) return i;
  }
};
