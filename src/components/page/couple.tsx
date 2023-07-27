'use client';
import _ from 'lodash';
import axios from 'axios';
import Images from '@utils/images';
import { useState } from 'react';
import maleChampions from '@src/json/championMale.json';
import { champSquare, imageLoader } from '@utils/imgLoader';
import Femalechampions from '@src/json/championFemale.json';
import { useLocale, useTranslations } from 'next-intl';
import * as S from '@styles/coupleStyles';
const version = process.env.NEXT_PUBLIC_VERSION;

interface Champ {
  url: string;
  name: string;
  lore: string;
}

export default function Couple() {
  //* 다국어
  const locale = useLocale();
  const t = useTranslations('Index');
  const dataLocale = locale === 'ko' ? 'ko_KR' : 'en_US';
  // * 현재 뽑은 결과
  const [now, setNow] = useState<Champ>({
    name: '',
    url: '',
    lore: ''
  });
  // *스텝
  const [step, setStep] = useState(1);
  // * 인풋
  const [input, setInput] = useState({
    name: '',
    sex: '남',
    age: '',
    height: 'tall',
    type: 'cute',
    personality: 'good'
  });
  // * 인풋
  const handleInput = (e: any) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  // * 결과보기
  const handleResultClick = async () => {
    setStep(2);
    let randomChamp;
    if (input.sex === '남') {
      const result = _.pickBy(Femalechampions.data, function (key, value) {
        return key.ideal.type === input.type && key.ideal.height === input.height;
      });
      const resultLength = Object.keys(result);
      randomChamp = resultLength[Math.floor(Math.random() * resultLength.length)];
    } else {
      const result = _.pickBy(maleChampions.data, function (key, value) {
        return key.ideal.type === input.type && key.ideal.personality === input.personality;
      });
      const resultLength = Object.keys(result);
      randomChamp = resultLength[Math.floor(Math.random() * resultLength.length)];
    }
    try {
      // * 랜덤으로 꺼낸 챔프의 스킨 정보 가져오기
      const { data } = await axios.get(
        `https://ddragon.leagueoflegends.com/cdn/${version}/data/${dataLocale}/champion/${randomChamp}.json`
      );
      let now = {
        name: data.data[randomChamp].name,
        url: champSquare(randomChamp),
        lore: data.data[randomChamp].lore
      };
      setNow(now);
    } catch (e) {
      console.log(e);
    }
  };

  // *리셋
  const handleReset = () => {
    setNow({
      name: '',
      url: '',
      lore: ''
    });
    setInput({
      name: '',
      sex: '남',
      age: '',
      height: 'tall',
      type: 'cute',
      personality: 'good'
    });
    setStep(1);
  };
  const onClick = () => {
    const { Kakao } = window;
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '롤 시뮬레이션',
        description: '롤 나의 연애 상대 찾기',
        imageUrl: 'https://ddragon.leagueoflegends.com/cdn/13.13.1/img/profileicon/4661.png',
        link: {
          mobileWebUrl: 'https://lol-simulation.site/couple',
          webUrl: 'https://lol-simulation.site/couple'
        }
      }
    });
  };

  return (
    <>
      <S.Main>
        <S.Title onClick={handleResultClick}>{t(`coupleTitle`)}</S.Title>
        {/* 인풋 부분 */}
        {step === 1 && (
          <S.InputSection>
            <S.InputWrapper>
              <S.InputTitle>{t(`name`)}</S.InputTitle>
              <S.Input placeholder={t(`name`)} onChange={handleInput} name="name" />
            </S.InputWrapper>
            <S.InputWrapper>
              <S.InputTitle>{t(`sex`)}</S.InputTitle>
              <S.InputBtn
                $isActive={input.sex === '남'}
                onClick={() => {
                  setInput({
                    ...input,
                    sex: '남',
                    type: 'cute',
                    height: 'tall'
                  });
                }}
                name="sex"
                value={'남'}
              >
                {t(`male`)}
              </S.InputBtn>
              <S.InputBtn
                $isActive={input.sex === '여'}
                onClick={() => {
                  setInput({
                    ...input,
                    sex: '여',
                    type: 'intellectual',
                    personality: 'good'
                  });
                }}
                name="sex"
                value={'여'}
              >
                {t(`female`)}
              </S.InputBtn>
            </S.InputWrapper>

            <S.InputWrapper>
              <S.InputLabel htmlFor="age" placeholder={t(`age`)}>
                {t(`age`)}
              </S.InputLabel>
              <S.Input id="age" onChange={handleInput} name="age" type="number" />
            </S.InputWrapper>

            <S.InputWrapper>
              <S.InputTitle>{t(`type`)}</S.InputTitle>
              {input.sex === '남' ? (
                <>
                  <S.InputBtn
                    $isActive={input.height === 'tall'}
                    onClick={handleInput}
                    name="height"
                    value={'tall'}
                  >
                    {t(`tall`)}
                  </S.InputBtn>
                  <S.InputBtn
                    $isActive={input.height === 'short'}
                    onClick={handleInput}
                    name="height"
                    value={'short'}
                  >
                    {t(`short`)}
                  </S.InputBtn>
                  <br />
                  <S.InputBtn
                    $isActive={input.type === 'cute'}
                    onClick={handleInput}
                    name="type"
                    value={'cute'}
                  >
                    {t(`cute`)}
                  </S.InputBtn>
                  <S.InputBtn
                    $isActive={input.type === 'mature'}
                    onClick={handleInput}
                    name="type"
                    value={'mature'}
                  >
                    {t(`mature`)}
                  </S.InputBtn>
                </>
              ) : (
                <>
                  <S.InputBtn
                    $isActive={input.type === 'intellectual'}
                    onClick={handleInput}
                    name="type"
                    value={'intellectual'}
                  >
                    {t(`intellectual`)}
                  </S.InputBtn>
                  <S.InputBtn
                    $isActive={input.type === 'tough'}
                    onClick={handleInput}
                    name="type"
                    value={'tough'}
                  >
                    {t(`tough`)}
                  </S.InputBtn>
                  <br />
                  <S.InputBtn
                    $isActive={input.type === 'good'}
                    onClick={handleInput}
                    name="personality"
                    value={'good'}
                  >
                    {t(`good`)}
                  </S.InputBtn>
                  <S.InputBtn
                    $isActive={input.type === 'bad'}
                    onClick={handleInput}
                    name="personality"
                    value={'bad'}
                  >
                    {t(`bad`)}
                  </S.InputBtn>
                </>
              )}
            </S.InputWrapper>
            <S.InputConfirm onClick={handleResultClick}>{t(`confirm`)}</S.InputConfirm>
            <S.InputTitle> {t(`notSave`)}</S.InputTitle>
          </S.InputSection>
        )}
        {/* 결과 부분 */}
        {step === 2 && now.url && (
          <S.ResultSection>
            <S.SubTitle>{t(`result`)}</S.SubTitle>
            <S.ResultText>
              {input.name.length > 0 && now.name.length > 0
                ? t(`coupleResult`, {
                    name: input.name,
                    champ: now.name
                  })
                : ''}
            </S.ResultText>
            <Images src={now.url} width={140} height={140} loader={imageLoader} />
            <S.ChampName>{now.name}</S.ChampName>
            <S.Lore>{now.lore}</S.Lore>
            <S.ResetBtn onClick={handleReset}>{t(`again`)}</S.ResetBtn>
          </S.ResultSection>
        )}
        {locale === 'ko' && <S.Share onClick={onClick}>카카오톡 공유하기</S.Share>}
      </S.Main>
    </>
  );
}
