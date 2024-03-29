// *전체 뽑기 관리
export const drawing = (type: string) => {
  if (type === 'eventBox') {
    return evnet();
  } else if (type === 'hextech') {
    return hextech();
  } else if (type === 'prestigeBox') {
    return prestige();
  } else if (type === 'bag') {
    bag();
  } else {
    hextech();
  }
};

//* 꾸러미
const bag = () => {
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
const evnet = () => {
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
const hextech = () => {
  const spec = {
    skin: 0.5,
    champ: 0.25,
    wardSkin: 0.1,
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
const prestige = () => {
  const spec = {
    skin: 0.7,
    wardSkin: 0.1,
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
