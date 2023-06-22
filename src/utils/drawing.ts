// *전체 뽑기 관리
export const drawing = (type: string) => {
  if (type === '먹그림자라구') {
    return inkshadow();
  } else if (type === '마법공학 상자') {
    return hextech();
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
  const ranNum = Math.floor(Math.random() * 102.68 + 1);
  const gift = ['mythEssence', 'profileIcon', 'emotion', 'ward', 'champ', 'skin'];
  //확률 생성
  const pbt = [2.68, 3.5, 10, 11.5, 25, 50];
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
