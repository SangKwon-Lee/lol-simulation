import _ from 'lodash/findIndex';
import { champList } from '@src/json/champion';
export function getRandomChamp() {
  return champList[Math.floor(Math.random() * champList.length)];
}

export function findDupication(arr: Array<any>, name: string) {
  return _(arr, { name });
}
