import _ from 'lodash/findIndex';
import champions from '@src/json/champion.json';
const champList = Object.keys(champions.data);

export function getRandomChamp() {
  return champList[Math.floor(Math.random() * champList.length)];
}

export function findDupication(arr: Array<any>, name: string) {
  return _(arr, { name });
}
