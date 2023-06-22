import styles from '@styles/home.module.scss';
import Images from '@utils/images';
import { champSkin, champSquare, imageLoader } from '@utils/imgLoader';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import champions from '../src/json/champion.json';
import _, { now } from 'lodash';
import { drawing } from '@utils/drawing';

interface SkinType {
  url: string;
  count: number;
  name: string;
  type: string;
}
const champList = Object.keys(champions.data);
export default function Home() {
  // * 로딩
  const [loading, setLoading] = useState(false);
  // * 뽑힌 스킨 목록
  const [skins, setSkins] = useState<SkinType[]>([]);
  // * 스킨 이외 뽑힌 목록
  const [otehrList, setOtherList] = useState<SkinType[]>([]);
  // * 현재 뽑은 결과
  const [nowSkin, setNowSkin] = useState<SkinType[]>([]);
  // * 선택한 상자
  const [select, setSelect] = useState({ url: '', name: '' });
  // * 상자 리스트
  const [selectBoxList, setSelectBoxList] = useState([
    {
      url: `/images/hextech_chest.png`,
      name: '마법공학 상자',
      count: 1
    }
  ]);
  // * 확률 오픈
  const [isModal, setIsModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  // *마법공학 상자 확률
  const [probability, setProbability] = useState([
    {
      name: '스킨',
      percent: '50%'
    },
    {
      name: '챔피언',
      percent: '25%'
    },
    {
      name: '와드 스킨',
      percent: '11.5%'
    },
    {
      name: '감정 표현',
      percent: '10%'
    },
    {
      name: '소환사 아이콘',
      percent: '3.5%'
    },
    {
      name: '신화 정수(추가)',
      percent: '2.68%'
    }
  ]);
  // * 지금까지 연 상자 갯수
  const [openBoxCount, setOpenBoxCount] = useState(0);
  // * 뽑기에 따른 로직
  const handleDrawingLogic = async (drawingResult: string) => {
    setLoading(true);
    setOpenBoxCount(() => openBoxCount + 1);
    if (drawingResult === 'skin') {
      return handleGetRandowSkin();
    } else if (drawingResult === 'champ') {
      return handleGetRandowChamp();
    } else if (drawingResult === 'profileIcon') {
      return handleGetRandowProfile();
    } else if (drawingResult === 'ward') {
      return handleGetRandowWard();
    } else if (drawingResult === 'emotion') {
      return handleGetRandowEmotion();
    } else if (drawingResult === 'mythEssence') {
      return handleGetRandowMythEssence();
    } else {
      console.log('잘못된 경로입니다.');
    }
  };
  // * 열기 클릭할 때
  const handleDrawing = () => {
    if (select.name === '마법공학 상자') {
      const drawingResult = String(drawing(select.name));
      handleDrawingLogic(drawingResult);
    }
  };

  // * 상자 고르기
  const handleSelectBox = (box: any) => {
    setSelect(box);
  };

  // * 리셋 버튼
  const handleReset = () => {
    setSkins([]);
    setOtherList([]);
    setNowSkin([]);
    setOpenBoxCount(0);
  };

  const handleGetRandowSkin = async () => {
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
      const duplication = _.findIndex(skins, { name: randomSkin.name });
      if (duplication === -1) {
        // * 중복이 아니면 추가
        let newSkin = {
          url: champSkin(randomChamp, randomSkin.num),
          count: 1,
          name: randomSkin.name,
          type: 'skin'
        };
        setNowSkin([newSkin]);
        setSkins([...skins, newSkin]);
      } else {
        // * 중복이면 count + 1
        let newSkin = [...skins];
        newSkin[duplication] = {
          ...newSkin[duplication],
          count: newSkin[duplication].count + 1
        };
        setNowSkin([newSkin[duplication]]);
        setSkins(newSkin);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  const handleGetRandowChamp = async () => {
    try {
      // * 랜덤으로 챔프 하나 꺼내기
      const randomChamp = champList[Math.floor(Math.random() * champList.length)];
      // * 랜덤으로 꺼낸 챔프의 스킨 정보 가져오기
      const { data } = await axios.get(
        `https://ddragon.leagueoflegends.com/cdn/13.12.1/data/ko_KR/champion/${randomChamp}.json`
      );
      // * 중복 챔프 검사
      const duplication = _.findIndex(otehrList, { name: data.data[randomChamp].name });
      if (duplication === -1) {
        // * 중복이 아니면 추가
        let nowSkin = {
          count: 1,
          name: data.data[randomChamp].name,
          url: champSquare(randomChamp),
          type: 'other'
        };
        setNowSkin([nowSkin]);
        setOtherList([...otehrList, nowSkin]);
      } else {
        // * 중복이면 count + 1
        let others = [...otehrList];
        others[duplication] = {
          ...others[duplication],
          count: others[duplication].count + 1
        };
        setNowSkin([others[duplication]]);
        setOtherList(others);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  const handleGetRandowWard = async () => {
    // * 중복 검사
    const duplication = _.findIndex(otehrList, { name: '와드 스킨' });
    const findEssence = _.findIndex(otehrList, { name: '주황 정수' });
    // * 중복이 아니면 추가
    let nowSkin = [
      {
        count: 1,
        name: '와드 스킨',
        url: `/images/ward.png`,
        type: 'other'
      },
      {
        count: 150,
        name: '주황 정수',
        url: `/images/orange_essence.png`,
        type: 'other'
      }
    ];
    setNowSkin(nowSkin);

    if (findEssence === -1 && duplication === -1) {
      setOtherList([...otehrList, ...nowSkin]);
    }
    if (findEssence === -1 && duplication !== -1) {
      let others = [...otehrList];
      others[duplication] = {
        ...others[duplication],
        count: others[duplication].count + 1
      };
      others.push({
        count: 150,
        name: '주황 정수',
        url: `/images/orange_essence.png`,
        type: 'other'
      });
      setOtherList(others);
    }

    if (findEssence !== -1 && duplication === -1) {
      let others = [...otehrList];
      others[findEssence] = {
        ...others[findEssence],
        count: others[findEssence].count + 150
      };
      others.push({
        count: 1,
        name: '와드 스킨',
        url: `/images/ward.png`,
        type: 'other'
      });
      setOtherList(others);
    }

    if (findEssence !== -1 && duplication !== -1) {
      let others = [...otehrList];
      others[findEssence] = {
        ...others[findEssence],
        count: others[findEssence].count + 150
      };
      others[duplication] = {
        ...others[duplication],
        count: others[duplication].count + 1
      };
      setOtherList(others);
    }

    setLoading(false);
  };
  const handleGetRandowProfile = async () => {
    // * 중복 검사
    const duplication = _.findIndex(otehrList, { name: '소환사 아이콘' });
    const findEssence = _.findIndex(otehrList, { name: '주황 정수' });
    let nowSkin = [
      {
        count: 1,
        name: '소환사 아이콘',
        url: `/images/profileIcon.png`,
        type: 'other'
      },
      {
        count: 150,
        name: '주황 정수',
        url: `/images/orange_essence.png`,
        type: 'other'
      }
    ];
    setNowSkin(nowSkin);

    if (findEssence === -1 && duplication === -1) {
      setOtherList([...otehrList, ...nowSkin]);
    }
    if (findEssence === -1 && duplication !== -1) {
      let others = [...otehrList];
      others[duplication] = {
        ...others[duplication],
        count: others[duplication].count + 1
      };
      others.push({
        count: 150,
        name: '주황 정수',
        url: `/images/orange_essence.png`,
        type: 'other'
      });
      setOtherList(others);
    }

    if (findEssence !== -1 && duplication === -1) {
      let others = [...otehrList];
      others[findEssence] = {
        ...others[findEssence],
        count: others[findEssence].count + 150
      };
      others.push({
        count: 1,
        name: '소환사 아이콘',
        url: `/images/profileIcon.png`,
        type: 'other'
      });
      setOtherList(others);
    }

    if (findEssence !== -1 && duplication !== -1) {
      let others = [...otehrList];
      others[findEssence] = {
        ...others[findEssence],
        count: others[findEssence].count + 150
      };
      others[duplication] = {
        ...others[duplication],
        count: others[duplication].count + 1
      };
      setOtherList(others);
    }

    setLoading(false);
  };
  const handleGetRandowEmotion = async () => {
    // * 중복 검사
    const duplication = _.findIndex(otehrList, { name: '감정 표현' });
    if (duplication === -1) {
      // * 중복이 아니면 추가
      let nowSkin = {
        count: 1,
        name: '감정 표현',
        url: `/images/emotion.png`,
        type: 'other'
      };
      setNowSkin([nowSkin]);
      setOtherList([...otehrList, nowSkin]);
    } else {
      // * 중복이면 count + 1
      let others = [...otehrList];
      others[duplication] = {
        ...others[duplication],
        count: others[duplication].count + 1
      };
      setNowSkin([others[duplication]]);
      setOtherList(others);
    }
    setLoading(false);
  };
  const handleGetRandowMythEssence = async () => {
    // * 중복 검사
    const duplication = _.findIndex(otehrList, { name: '신화 정수' });
    if (duplication === -1) {
      // * 중복이 아니면 추가
      let nowSkin = {
        count: 10,
        name: '신화 정수',
        url: `/images/mythic_essence.png`,
        type: 'other'
      };
      setNowSkin([nowSkin]);
      setOtherList([...otehrList, nowSkin]);
    } else {
      // * 중복이면 count + 1
      let others = [...otehrList];
      others[duplication] = {
        ...others[duplication],
        count: others[duplication].count + 10
      };
      setNowSkin([others[duplication]]);
      setOtherList(others);
    }
    setLoading(false);
  };

  //* 아무데나 클릭해도 카테고리 닫히기
  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = () => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      // @ts-ignore
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModal(false);
      }
    };

    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler); // 모바일 대응

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler); // 모바일 대응
    };
  });

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

        {/* 선택된 상자 */}
        {select.name && (
          <aside className={styles[`select-wrapper`]}>
            <h2 className={styles[`category-title`]}>상자</h2>
            <div className={styles[`select-box-wrapper`]}>
              <div className={styles[`category-title`]}>{select.name}</div>
              <div className={styles[`select-box`]}>
                <Images src={select.url} width={210} height={204} />
              </div>
              <div className={styles[`open-button-wrapper`]}>
                <button className={styles[`open-button`]} onClick={handleDrawing}>
                  열기
                </button>
                <button className={styles[`open-button`]} onClick={handleReset}>
                  리셋
                </button>
                <button className={styles[`open-button`]} onClick={() => setIsModal(true)}>
                  확률 보기
                </button>
              </div>
              <div className={styles[`open-count`]}>사용한 상자 수 : {openBoxCount}</div>
            </div>
          </aside>
        )}

        {/* 스킨 결과 */}
        {select.name && (
          <aside className={styles[`result-wrapper`]}>
            <h2 className={styles[`category-title`]}>결과</h2>
            <div className={styles[`result-list`]}>
              {loading && <div style={{ width: '180px', height: '300px' }}></div>}
              {Array.isArray(nowSkin) &&
                nowSkin.length > 0 &&
                !loading &&
                nowSkin.map((now, index) => (
                  <div className={styles[`skin-result`]} key={index}>
                    {now.type === 'skin' ? (
                      <Images src={now.url} width={180} height={300} loader={imageLoader} />
                    ) : (
                      <Images src={now.url} width={140} height={140} loader={imageLoader} />
                    )}
                    <div className={styles[`skin-result-title`]}>{now.name}</div>
                  </div>
                ))}
            </div>
          </aside>
        )}

        {/* 기타 목록 */}
        <aside className={styles[`skin-list`]}>
          <h2 className={styles[`category-title`]}>기타</h2>
          <ul className={styles[`other-wrapper`]}>
            {otehrList.map((data) => (
              <li className={styles.skin} key={data.url}>
                <Images src={data.url} width={88} height={88} loader={imageLoader} />
                {data.count !== 1 && <div className={styles[`skin-count`]}>{data.count}</div>}
              </li>
            ))}
          </ul>
        </aside>

        {/* 스킨 목록 */}
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
        {isModal && (
          <div ref={modalRef} className={styles.modal}>
            <div className={styles[`modal-title`]}>확률</div>
            <div className={styles[`modal-wrapper`]}>
              {Array.isArray(probability) &&
                probability.length > 0 &&
                probability.map((pro) => (
                  <div className={styles[`modal-text`]} key={pro.name}>
                    {pro.name} : {pro.percent}
                  </div>
                ))}
            </div>
            <div onClick={() => setIsModal(false)} className={styles[`modal-close`]}>
              X
            </div>
          </div>
        )}
      </main>
    </>
  );
}
