'use client';
import _ from 'lodash';
import axios from 'axios';
import Images from '@utils/images';
import { drawing } from '@utils/drawing';
import styles from '@styles/home.module.scss';
import champions from '@src/json/champion.json';
import { useEffect, useRef, useState } from 'react';
import { PrestigeProb, hextechProb } from '@utils/probability';
import { champSkin, champSquare, imageLoader } from '@utils/imgLoader';
import { useLocale, useTranslations } from 'next-intl';
import Script from 'next/script';
interface SkinType {
  url: string;
  count: number;
  name: string;
  type: string;
}
const champList = Object.keys(champions.data);
const version = process.env.NEXT_PUBLIC_VERSION;

export default function Hextect() {
  const locale = useLocale();
  const t = useTranslations('Index');
  const dataLocale = locale === 'ko' ? 'ko_KR' : 'en_US';
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
      name: t(`hextech`),
      count: 1,
      width: 70,
      height: 68
    },
    {
      url: `/images/prestige_box.png`,
      name: t(`prestigeBox`),
      count: 1,
      width: 70,
      height: 70
    }
  ]);
  // * 확률 오픈
  const [isModal, setIsModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // *마법공학 상자 확률
  const [probability, setProbability] = useState(hextechProb);

  // * 지금까지 연 상자 갯수
  const [openBoxCount, setOpenBoxCount] = useState(0);

  // * 뽑기에 따른 로직
  const handleDrawingLogic = async (drawingResult: string) => {
    setLoading(true);
    setOpenBoxCount(() => openBoxCount + 1);
    if (drawingResult === 'skin') {
      return handleGetRandomSkin();
    } else if (drawingResult === 'champ') {
      return handleGetRandomChamp();
    } else if (drawingResult === 'profileIcon') {
      return handleGetRandomProfile();
    } else if (drawingResult === 'ward') {
      return handleGetRandomWard();
    } else if (drawingResult === 'emotion') {
      return handleGetRandomEmotion();
    } else if (drawingResult === 'mythEssence') {
      return handleGetRandomMythEssence();
    } else if (drawingResult === 'orangeEssence') {
      return handleGetRandomOrangeEssence();
    } else {
    }
  };
  // * 열기 클릭할 때
  const handleDrawing = () => {
    const drawingResult = String(drawing(select.name));
    handleDrawingLogic(drawingResult);
  };

  // * 상자 고르기
  const handleSelectBox = (box: any) => {
    setSelect(box);
    if (box.name === t(`hextech`)) {
      setProbability(hextechProb);
    }
    if (box.name === t(`prestigeBox`)) {
      setProbability(PrestigeProb);
    }
  };

  // * 리셋 버튼
  const handleReset = () => {
    setSkins([]);
    setOtherList([]);
    setNowSkin([]);
    setOpenBoxCount(0);
  };

  // * 랜덤 스킨 뽑기
  const handleGetRandomSkin = async () => {
    try {
      // * 랜덤으로 챔프 하나 꺼내기
      const randomChamp = champList[Math.floor(Math.random() * champList.length)];
      // * 랜덤으로 꺼낸 챔프의 스킨 정보 가져오기
      const { data: champ } = await axios.get(
        `https://ddragon.leagueoflegends.com/cdn/${version}/data/${dataLocale}/champion/${randomChamp}.json`
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
      const duplication = _.findIndex(skins, { name: t(`risenFiddlesticks`) });
      if (duplication === -1) {
        // * 중복이 아니면 추가
        let newSkin = {
          url: 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Fiddlesticks_8.jpg',
          count: 1,
          name: t(`risenFiddlesticks`),
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
    } finally {
      setLoading(false);
    }
  };
  // * 랜덤 챔프 뽑기
  const handleGetRandomChamp = async () => {
    try {
      // * 랜덤으로 챔프 하나 꺼내기
      const randomChamp = champList[Math.floor(Math.random() * champList.length)];
      // * 랜덤으로 꺼낸 챔프의 스킨 정보 가져오기
      const { data } = await axios.get(
        `https://ddragon.leagueoflegends.com/cdn/${version}/data/${dataLocale}/champion/${randomChamp}.json`
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
  // * 와드 스킨 뽑기
  const handleGetRandomWard = async () => {
    // * 중복 검사
    const duplication = _.findIndex(otehrList, { name: t(`wardSkin`) });
    const findEssence = _.findIndex(otehrList, { name: t(`orangeEssence`) });
    // * 중복이 아니면 추가
    let nowSkin = [
      {
        count: 1,
        name: t(`wardSkin`),
        url: `/images/ward.png`,
        type: 'other'
      },
      {
        count: 150,
        name: t(`orangeEssence`),
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
        name: t(`orangeEssence`),
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
        name: t(`wardSkin`),
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
  // * 소환사 아이콘 뽑기
  const handleGetRandomProfile = async () => {
    // * 중복 검사
    const duplication = _.findIndex(otehrList, { name: t(`profileIcon`) });
    const findEssence = _.findIndex(otehrList, { name: t(`orangeEssence`) });
    let nowSkin = [
      {
        count: 1,
        name: t(`profileIcon`),
        url: `/images/profileIcon.webp`,
        type: 'other'
      },
      {
        count: 150,
        name: t(`orangeEssence`),
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
        name: t(`orangeEssence`),
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
        name: t(`profileIcon`),
        url: `/images/profileIcon.webp`,
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
  // * 감정표현 뽑기
  const handleGetRandomEmotion = async () => {
    // * 중복 검사
    const duplication = _.findIndex(otehrList, { name: t(`emotion`) });
    if (duplication === -1) {
      // * 중복이 아니면 추가
      let nowSkin = {
        count: 1,
        name: t(`emotion`),
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
  // * 신화정수 10개 뽑기
  const handleGetRandomMythEssence = async () => {
    // * 중복 검사
    const duplication = _.findIndex(otehrList, { name: t(`mythicEssence`) });
    if (duplication === -1) {
      // * 중복이 아니면 추가
      let nowSkin = {
        count: 10,
        name: t(`mythicEssence`),
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
  // * 주황정수 525개 뽑기
  const handleGetRandomOrangeEssence = async () => {
    // * 중복 검사
    const duplication = _.findIndex(otehrList, { name: t(`orangeEssence`) });
    if (duplication === -1) {
      // * 중복이 아니면 추가
      let nowSkin = {
        count: 525,
        name: t(`orangeEssence`),
        url: `/images/orange_essence.png`,
        type: 'other'
      };
      setNowSkin([nowSkin]);
      setOtherList([...otehrList, nowSkin]);
    } else {
      // * 중복이면 count + 1
      let others = [...otehrList];
      others[duplication] = {
        ...others[duplication],
        count: others[duplication].count + 525
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

  const onClick = () => {
    const { Kakao } = window;
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '롤 시뮬레이션',
        description: '롤 상자깡 시뮬레이션',
        imageUrl: 'https://ddragon.leagueoflegends.com/cdn/13.13.1/img/profileicon/4661.png',
        link: {
          mobileWebUrl: 'https://lol-simulation.site',
          webUrl: 'https://lol-simulation.site'
        }
      }
    });
  };

  return (
    <>
      <main className={styles.main}>
        <section className={styles[`category-wrapper`]}>
          <h2 className={styles[`category-title`]}>{t(`category`)}</h2>
          <div className={styles[`category-box-wrapper`]}>
            {selectBoxList.map((box) => (
              <div
                className={styles[`category-box`]}
                key={box.url}
                onClick={() => handleSelectBox(box)}
              >
                <Images src={box.url} width={box.width} height={box.height} />
                {box.count !== 1 && <div className={styles[`skin-count`]}>{box.count}</div>}
              </div>
            ))}
          </div>
        </section>

        {/* 선택된 상자 */}
        {select.name && (
          <section className={styles[`select-wrapper`]}>
            <h2 className={styles[`category-title`]}>{t(`box`)}</h2>
            <div className={styles[`select-box-wrapper`]}>
              <div className={styles[`category-title`]}>{select.name}</div>
              <div className={styles[`select-box`]}>
                <Images src={select.url} width={210} height={204} />
              </div>
              <div className={styles[`open-button-wrapper`]}>
                <button className={styles[`open-button`]} onClick={handleDrawing}>
                  {t(`open`)}
                </button>
                <button className={styles[`open-button`]} onClick={handleReset}>
                  {t(`reset`)}
                </button>
                <button className={styles[`open-button`]} onClick={() => setIsModal(true)}>
                  {t(`percentage`)}
                </button>
              </div>
              <div className={styles[`open-count`]}>
                {t(`countBox`)} : {openBoxCount}
              </div>
            </div>
          </section>
        )}

        {/* 스킨 결과 */}
        {select.name && (
          <section className={styles[`result-wrapper`]}>
            <h2 className={styles[`category-title`]}>{t(`result`)}</h2>
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
          </section>
        )}

        {/* 기타 목록 */}
        <section className={styles[`skin-list`]}>
          <h2 className={styles[`category-title`]}>{t(`etc`)}</h2>
          <ul className={styles[`other-wrapper`]}>
            {otehrList.map((data) => (
              <li className={styles.skin} key={data.url}>
                <Images src={data.url} width={88} height={88} loader={imageLoader} />
                {data.count !== 1 && <div className={styles[`skin-count`]}>{data.count}</div>}
              </li>
            ))}
          </ul>
        </section>

        {/* 스킨 목록 */}
        <section className={styles[`skin-list`]}>
          <h2 className={styles[`category-title`]}>{t(`skin`)}</h2>
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
        </section>
        {isModal && (
          <div ref={modalRef} className={styles.modal}>
            <div className={styles[`modal-title`]}>{t(`percentage`)}</div>
            <div className={styles[`modal-wrapper`]}>
              {Array.isArray(probability) &&
                probability.length > 0 &&
                probability.map((pro) => (
                  <div className={styles[`modal-text`]} key={pro.name}>
                    {t(pro.name)} : {pro.percent}
                  </div>
                ))}
            </div>
            <div className={styles[`modal-percent`]}>{t(`refer`)}</div>
            <div onClick={() => setIsModal(false)} className={styles[`modal-close`]}>
              X
            </div>
          </div>
        )}
        {locale === 'ko' && (
          <button className={styles.share} onClick={onClick}>
            카카오톡 공유하기
          </button>
        )}
      </main>
    </>
  );
}
