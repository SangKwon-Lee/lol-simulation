import styles from '@styles/home.module.scss';
import Images from '@utils/images';
import { cndUrl, imageLoader } from '@utils/imgLoader';
import axios from 'axios';
import { useState } from 'react';
import champions from '../src/json/champion.json';
import _ from 'lodash';
import { inkshadow } from '@utils/drawing';

interface SkinType {
  url: string;
  count: number;
  name: string;
}
const champList = Object.keys(champions.data);
export default function Home() {
  const [skins, setSkins] = useState<SkinType[]>([]);
  const [nowSkin, setNowSkin] = useState<SkinType>();
  const [select, setSelect] = useState({ url: '', name: '' });
  const [loading, setLoading] = useState(false);
  const [selectBoxList, setSelectBoxList] = useState([
    {
      url: `/images/hextech_chest.png`,
      name: '마법공학 상자',
      count: 1
    },
    {
      url: `/images/inkshadow-orb.png`,
      name: '먹그림자라구',
      count: 1
    }
  ]);

  const handleGetRandomSkin = async () => {
    let result = 'skin';
    if (select.name === '먹그림자라구') {
      result = inkshadow();
    }
    if (result === 'skin') {
      try {
        setLoading(true);
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
      } finally {
        setLoading(false);
      }
    } else {
      const duplication = _.findIndex(selectBoxList, { name: '먹그림자 꾸러미' });
      if (duplication === -1) {
        let newSelectBox = {
          url: `/images/inkshadow-grab-bag.png`,
          name: '먹그림자 꾸러미',
          count: 1
        };
        setNowSkin(newSelectBox);
        setSelectBoxList([...selectBoxList, newSelectBox]);
      } else {
        let newSelectBox = [...selectBoxList];
        newSelectBox[duplication] = {
          ...newSelectBox[duplication],
          count: newSelectBox[duplication].count + 1
        };
        setNowSkin(newSelectBox[duplication]);
        setSelectBoxList(newSelectBox);
      }
    }
  };

  const handleSelectBox = (box: any) => {
    setSelect(box);
  };

  return (
    <>
      <main className={styles.main}>
        <aside className={styles[`category-wrapper`]}>
          <h2 className={styles[`category-title`]}>카테고리</h2>
          <div className={styles[`category-box-wrapper`]}>
            {selectBoxList.map((box) => (
              <div className={styles[`category-box`]} key={box.url}>
                <Images src={box.url} width={70} height={68} onClick={() => handleSelectBox(box)} />
                {box.count !== 1 && <div className={styles[`skin-count`]}>{box.count}</div>}
              </div>
            ))}
          </div>
        </aside>
        {select.name && (
          <aside className={styles[`select-wrapper`]}>
            <h2 className={styles[`category-title`]}>상자</h2>
            <div className={styles[`select-box-wrapper`]}>
              <div className={styles[`category-title`]}>{select.name}</div>
              <div className={styles[`select-box`]}>
                <Images src={select.url} width={250} height={250} />
              </div>
              <div className={styles[`open-button-wrapper`]}>
                <button className={styles[`open-button`]} onClick={handleGetRandomSkin}>
                  열기
                </button>
                <button className={styles[`open-button`]} onClick={() => setSkins([])}>
                  리셋
                </button>
              </div>
            </div>
          </aside>
        )}

        {select.name && (
          <aside className={styles[`result-wrapper`]}>
            <h2 className={styles[`category-title`]}>결과</h2>
            <div className={styles[`select-box-wrapper`]}>
              {loading && <div style={{ width: '180px', height: '500px' }}></div>}
              {nowSkin?.url && !loading && (
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
