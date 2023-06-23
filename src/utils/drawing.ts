// *전체 뽑기 관리
export const drawing = (type: string) => {
  console.log(type);
  if (type === '먹그림자라구') {
    return inkshadow();
  } else if (type === '마법공학 상자') {
    return hextech();
  } else if (type === '명품 상자') {
    return prestige();
  } else {
    hextech();
  }
};

// * 먹그림자라구
export const inkshadow = () => {
  const ranNum = Math.floor(Math.random() * 99 + 1);
  const gift = ['bag', 'skin'];
  //확률 생성
  const pbt = [5, 95];
  //리턴 경품 값
  let res = '';
  for (let i = 0; i < gift.length; i++) {
    if (pbt[i] >= ranNum) {
      res = gift[i];
      return res;
    } else if (pbt[pbt.length - 1] < ranNum) {
      res = gift[gift.length - 1];
      return res;
    }
  }
  return res;
};

// *롤 상자 확률
export const hextech = () => {
  const spec = {
    skin: 0.5,
    champ: 0.25,
    ward: 0.1,
    emotion: 0.09,
    profileIcon: 0.03,
    mythEssence: 0.03
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
    mythEssence: 0.035
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
