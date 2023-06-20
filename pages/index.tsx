import styles from '@styles/home.module.scss';
import Images from '@utils/images';
import { cndUrl, imageLoader } from '@utils/imgLoader';
import axios from 'axios';
import { useState } from 'react';
import champions from '../src/json/champion.json';
import _ from 'lodash';

interface SkinType {
  url: string;
  count: number;
  name: string;
}
const champList = Object.keys(champions.data);
const selectBoxList = [
  {
    url: `/images/hextech_chest.png`,
    name: '마법공학상자'
  }
];
export default function Home() {
  const handleGetRandomSkin = async () => {
    try {
      // * 랜덤으로 챔프 하나 꺼내기
      const randomChamp = champList[Math.floor(Math.random() * champList.length)];
      // * 랜덤으로 꺼낸 챔프의 스킨 정보 가져오기
      const { data: champ } = await axios.get(
        `https://ddragon.leagueoflegends.com/cdn/13.12.1/data/ko_KR/champion/${randomChamp}.json`
      );
      // * 챔프 스킨 목록
      const skinArr = champ.data[randomChamp].skins;
      // * 랜덤 스킨 뽑기
      const randomSkin = skinArr[Math.floor(Math.random() * (skinArr.length - 1)) + 1];
      // * 중복 스킨 검사
      console.log(randomSkin);
      const duplication = _.findIndex(skins, { name: randomSkin.name });
      if (duplication === -1) {
        // * 중복이 아니면 추가
        let newSkin = {
          url: cndUrl(randomChamp, randomSkin.num),
          count: 1,
          name: randomSkin.name
        };
        setNowSkin(newSkin);
        setSkins([...skins, newSkin]);
      } else {
        // * 중복이면 count + 1
        let newSkin = [...skins];
        newSkin[duplication] = {
          ...newSkin[duplication],
          count: newSkin[duplication].count + 1
        };
        setNowSkin(newSkin[duplication]);
        setSkins(newSkin);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSelectBox = (box: any) => {
    setSelect(box);
  };

  const [skins, setSkins] = useState<SkinType[]>([]);
  const [nowSkin, setNowSkin] = useState<SkinType>();
  const [select, setSelect] = useState({ url: '', name: '' });
  return (
    <>
      <main className={styles.main}>
        <aside className={styles[`category-wrapper`]}>
          <h2 className={styles[`category-title`]}>카테고리</h2>
          <div className={styles[`category-box-wrapper`]}>
            {selectBoxList.map((box) => (
              <div className={styles[`category-box`]} key={box.url}>
                <Images src={box.url} width={70} height={64} onClick={() => handleSelectBox(box)} />
              </div>
            ))}
          </div>
        </aside>
        {select.name && (
          <aside className={styles[`select-wrapper`]}>
            <h2 className={styles[`category-title`]}>상자</h2>
            <div className={styles[`select-box-wrapper`]}>
              <div className={styles[`select-box`]}>
                <Images src={`/images/hextech_chest.png`} width={250} height={250} />
              </div>
              <div className={styles[`open-button-wrapper`]}>
                <button className={styles[`open-button`]} onClick={handleGetRandomSkin}>
                  열기
                </button>
                {/* <button className={styles[`open-button`]} onClick={handleGetRandomSkin}>
                  10개 열기
                </button> */}
              </div>
            </div>
          </aside>
        )}

        {select.name && (
          <aside className={styles[`select-wrapper`]}>
            <h2 className={styles[`category-title`]}>결과</h2>
            <div className={styles[`select-box-wrapper`]}>
              {nowSkin?.url && (
                <div className={styles[`skin-result`]}>
                  <Images src={nowSkin.url} width={180} height={300} loader={imageLoader} />
                  <div className={styles[`skin-result-title`]}>{nowSkin.name}</div>
                </div>
              )}
            </div>
          </aside>
        )}

        <aside className={styles[`skin-list`]}>
          <h2 className={styles[`category-title`]}>스킨</h2>
          <ul className={styles[`list-wrapper`]}>
            {skins.map((data) => (
              <li className={styles.skin} key={data.url}>
                <Images
                  src={data.url}
                  width={157}
                  height={240}
                  loader={imageLoader}
                  style={{ display: 'inline', maxWidth: '157px', height: '100%', width: '100%' }}
                />
                {data.count !== 1 && <div className={styles[`skin-count`]}>{data.count}</div>}
              </li>
            ))}
          </ul>
        </aside>
      </main>
    </>
  );
}

// 유진선임님;
