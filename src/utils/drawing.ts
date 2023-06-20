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
