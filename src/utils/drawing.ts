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
  const ranNum = Math.floor(Math.random() * 100 + 1);
  // const gift = ['mythEssence', 'profileIcon', 'emotion', 'ward', 'champ', 'skin'];
  const gift = ['skin', 'champ', 'emotion', 'champ', 'emotion', 'profileIcon', 'mythEssence'];
  //확률 생성
  // const pbt = [3, 3, 9, 10, 25, 50];
  const pbt = [50, 75, 85, 94, 97, 100];
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

// *롤 명품 상자 확률
export const prestige = () => {
  const ranNum = Math.floor(Math.random() * 100 + 1);
  // const gift = ['mythEssence', 'emotion', 'orangeEssence', 'ward', 'skin'];
  const gift = ['skin', 'ward', 'orangeEssence', 'emotion', 'mythEssence'];
  //확률 생성\
  console.log(ranNum);
  // const pbt = [3.5, 6.5, 10, 10, 70];
  const pbt = [70, 80, 90, 96.5, 100];
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
