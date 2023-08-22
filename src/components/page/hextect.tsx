'use client';
import _ from 'lodash';
import axios from 'axios';
import Images from '@utils/images';
import { drawing } from '@utils/drawing';
import * as S from '@styles/hextectStyles';
import champions from '@src/json/champion.json';
import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { handleGetProb, hextechProb } from '@utils/probability';
import { champSkin, champSquare, imageLoader } from '@utils/imgLoader';
import { useNowSkin } from '@utils/nowSkin';
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
  const [select, setSelect] = useState({
    url: `/images/hextech_chest.png`,
    name: `hextech`,
    count: 1,
    width: 70,
    height: 68
  });
  // * 상자 리스트
  const [selectBoxList, setSelectBoxList] = useState([
    {
      url: `/images/hextech_chest.png`,
      name: `hextech`,
      count: 1,
      width: 70,
      height: 68
    },
    {
      url: `/images/prestige_box.png`,
      name: `prestigeBox`,
      count: 1,
      width: 70,
      height: 70
    },
    {
      url: `/images/soul.png`,
      name: `eventBox`,
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

  // * 열기 클릭할 때
  const handleDrawingLogic = async () => {
    // * 이미지 받아오는 시간이 있어서 로딩 추가
    setLoading(true);
    // * 얼마나 상자를 열었는지 카운트
    setOpenBoxCount(() => openBoxCount + 1);

    // * 아래 drawing에서 확률 계산 후 결과를 담음
    const drawingResult = String(drawing(select.name));

    // * 나온 결과에 따라 실행하는 함수 결정
    if (drawingResult === 'skin') {
      handleGetRandomSkin();
    } else if (drawingResult === 'champ') {
      handleGetRandomChamp();
    } else if (drawingResult === 'profileIcon' || drawingResult === 'wardSkin') {
      handleGetWardProfile(drawingResult);
    } else {
      handleGetOthers(drawingResult);
    }
  };

  // * 상자 고르기
  const handleSelectBox = (box: any) => {
    setSelect(box);
    // * 상자에 따른 확률 표기
    const BoxProbability = handleGetProb(box.name);
    setProbability(BoxProbability);
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
          type: 'champ'
        };
        setNowSkin([nowSkin]);
        setOtherList([...otehrList, nowSkin]);
      } else {
        // * 중복이면 count + 1
        handleOtherDuplication(duplication, 1);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  // * 소환사 아이콘 + 와드 스킨 뽑을 경우
  const handleGetWardProfile = (result: string) => {
    // * 중복 검사
    const duplication = _.findIndex(otehrList, { name: result });
    const findEssence = _.findIndex(otehrList, { name: `orangeEssence` });

    // * 지금 뽑은 결과
    const nowSkin = useNowSkin(result);
    // * 주황 정수 결과
    const Essence = useNowSkin('orangeEssence');
    setNowSkin([nowSkin, Essence]);

    let others = [...otehrList];
    // * 프로필 아이콘/와드스킨을 처음 뽑는 경우 리스트에 추가
    if (duplication === -1) {
      others.push(nowSkin);
      setOtherList(others);
    } else {
      // * 프로필 아이콘/와드스킨이 이미 있는 경우, +1
      others[duplication] = {
        ...others[duplication],
        count: others[duplication].count + 1
      };
      setOtherList(others);
    }

    // * 주황 정수를 처음 뽑는 경우 리스트에 추가
    if (findEssence === -1) {
      others.push(Essence);
      setOtherList(others);
    } else {
      // * 주황 정수가 이미 있는 경우 + 150
      others[findEssence] = {
        ...others[findEssence],
        count: others[findEssence].count + 150
      };
      setOtherList(others);
    }
    setLoading(false);
  };

  // * 기타 목록 뽑기
  const handleGetOthers = (name: string) => {
    // * 중복 검사
    const duplication = _.findIndex(otehrList, { name });
    //* 기타 목록에 따라 nowSkin을 바꿔 준다
    const nowSkin = useNowSkin(name);
    // * 중복이 아니면 추가
    if (duplication === -1) {
      setNowSkin([nowSkin]);
      setOtherList([...otehrList, nowSkin]);
    } else {
      // * 중복이면 count +
      handleOtherDuplication(duplication, nowSkin.count);
    }
    setLoading(false);
  };

  // * 기타 목록 중복일 경우 +1
  const handleOtherDuplication = (duplication: number, count: number) => {
    let others = [...otehrList];
    others[duplication] = {
      ...others[duplication],
      count: others[duplication].count + count
    };
    setNowSkin([others[duplication]]);
    setOtherList(others);
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

  // * 카카오톡 공유하기 기능
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
      <S.Main>
        <S.CategoryWrapper>
          <S.CategoryTitle>{t(`category`)}</S.CategoryTitle>
          <S.CategoryBoxWrapper>
            {selectBoxList.map((box) => (
              <S.CategoryBox key={box.url} onClick={() => handleSelectBox(box)}>
                <Images src={box.url} width={box.width} height={box.height} />
                {box.count !== 1 && <S.SkinCount>{box.count}</S.SkinCount>}
              </S.CategoryBox>
            ))}
          </S.CategoryBoxWrapper>
        </S.CategoryWrapper>

        {/* 선택된 상자 */}
        {select.name && (
          <S.SelectWrapper>
            <S.CategoryTitle>{t(`box`)}</S.CategoryTitle>
            <S.SelectBoxWrapper>
              <S.CategoryTitle>{t(`${select.name}`)}</S.CategoryTitle>
              <S.SelectBox>
                <Images src={select.url} width={210} height={204} />
              </S.SelectBox>
              <S.OpenButtonWrapper>
                <S.OpenButton onClick={handleDrawingLogic}>{t(`open`)}</S.OpenButton>
                <S.OpenButton onClick={handleReset}>{t(`reset`)}</S.OpenButton>
                <S.OpenButton onClick={() => setIsModal(true)}>{t(`percentage`)}</S.OpenButton>
              </S.OpenButtonWrapper>
              <S.OpenCount>
                {t(`countBox`)} : {openBoxCount}
              </S.OpenCount>
            </S.SelectBoxWrapper>
          </S.SelectWrapper>
        )}
        {/* 스킨 결과 */}
        {select.name && (
          <S.ResultWrapper>
            <S.CategoryTitle>{t(`result`)}</S.CategoryTitle>
            <S.ResultList>
              {loading && <div style={{ width: '180px', height: '300px' }}></div>}
              {Array.isArray(nowSkin) &&
                nowSkin.length > 0 &&
                !loading &&
                nowSkin.map((now, index) => (
                  <S.SkinResult key={index}>
                    {now.type === 'skin' ? (
                      <Images src={now.url} width={180} height={300} loader={imageLoader} />
                    ) : (
                      <Images src={now.url} width={140} height={140} loader={imageLoader} />
                    )}
                    <S.SkinResultTitle>
                      {now.type === 'other' ? t(now.name) : now.name}
                    </S.SkinResultTitle>
                  </S.SkinResult>
                ))}
            </S.ResultList>
          </S.ResultWrapper>
        )}

        {/* 기타 목록 */}
        <S.SkinList>
          <S.CategoryTitle>{t(`etc`)}</S.CategoryTitle>
          <S.OtherWrapper>
            {otehrList.map((data) => (
              <S.Skin key={data.url}>
                <Images src={data.url} width={88} height={88} loader={imageLoader} />
                {data.count !== 1 && <S.SkinCount>{data.count}</S.SkinCount>}
              </S.Skin>
            ))}
          </S.OtherWrapper>
        </S.SkinList>

        {/* 스킨 목록 */}
        <S.SkinList>
          <S.CategoryTitle>{t(`skin`)}</S.CategoryTitle>
          <S.ListWrapper>
            {skins.map((data) => (
              <S.Skin key={data.url}>
                <Images
                  src={data.url}
                  width={157}
                  height={240}
                  loader={imageLoader}
                  style={{ display: 'inline', maxWidth: '157px', height: '100%', width: '100%' }}
                />
                {data.count !== 1 && <S.SkinCount>{data.count}</S.SkinCount>}
              </S.Skin>
            ))}
          </S.ListWrapper>
        </S.SkinList>
        {isModal && (
          <S.Modal ref={modalRef}>
            <S.ModalTitle>{t(`percentage`)}</S.ModalTitle>
            <S.ModalWrapper>
              {Array.isArray(probability) &&
                probability.length > 0 &&
                probability.map((pro) => (
                  <S.ModalText key={pro.name}>
                    {t(pro.name)} : {pro.percent}
                  </S.ModalText>
                ))}
            </S.ModalWrapper>
            <S.ModalPercent>{t(`refer`)}</S.ModalPercent>
            <S.ModalClose onClick={() => setIsModal(false)}>X</S.ModalClose>
          </S.Modal>
        )}
        {locale === 'ko' && <S.Share onClick={onClick}>카카오톡 공유하기</S.Share>}
      </S.Main>
    </>
  );
}
