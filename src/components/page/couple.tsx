'use client';
import _ from 'lodash';
import axios from 'axios';
import Script from 'next/script';
import Images from '@utils/images';
import { useEffect, useState } from 'react';
import styles from '@styles/couple.module.scss';
import maleChampions from '@src/json/championMale.json';
import { champSquare, imageLoader } from '@utils/imgLoader';
import Femalechampions from '@src/json/championFemale.json';
import { useLocale, useTranslations } from 'next-intl';
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
  // * 카카오톡 공유하기
  useEffect(() => {
    if (!window.Kakao?.isInitialized()) {
      window.Kakao?.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
    }
  }, []);
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
  const kakaoInit = () => {
    // 페이지가 로드시 실행
    if (!window.Kakao.isInitialized())
      // 선언되지 않았을 때만 실행하도록 if문 추가
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
  };
  return (
    <>
      <Script src="https://developers.kakao.com/sdk/js/kakao.js" onLoad={kakaoInit} />
      <main className={styles.main}>
        <h2 className={styles[`title`]} onClick={handleResultClick}>
          {t(`coupleTitle`)}
        </h2>
        {/* 인풋 부분 */}
        {step === 1 && (
          <section className={styles[`input-section`]}>
            <div className={styles[`input-wrapper`]}>
              <div className={styles[`input-title`]}>{t(`name`)}</div>
              <input
                className={styles[`input`]}
                placeholder={t(`name`)}
                onChange={handleInput}
                name="name"
              />
            </div>
            <div className={styles[`input-wrapper`]}>
              <div className={styles[`input-title`]}>{t(`sex`)}</div>
              <button
                className={
                  input.sex === '남' ? styles[`input-button-active`] : styles[`input-button`]
                }
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
              </button>
              <button
                className={
                  input.sex === '여' ? styles[`input-button-active`] : styles[`input-button`]
                }
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
              </button>
            </div>

            <div className={styles[`input-wrapper`]}>
              <label htmlFor="age" className={styles[`input-title`]} placeholder={t(`age`)}>
                {t(`age`)}
              </label>
              <input
                id="age"
                className={styles[`input`]}
                onChange={handleInput}
                name="age"
                type="number"
              />
            </div>

            <div className={styles[`input-wrapper`]}>
              <div className={styles[`input-title`]}>{t(`type`)}</div>
              {input.sex === '남' ? (
                <>
                  <button
                    className={
                      input.height === 'tall'
                        ? styles[`input-button-active`]
                        : styles[`input-button`]
                    }
                    onClick={handleInput}
                    name="height"
                    value={'tall'}
                  >
                    {t(`tall`)}
                  </button>
                  <button
                    className={
                      input.height === 'short'
                        ? styles[`input-button-active`]
                        : styles[`input-button`]
                    }
                    onClick={handleInput}
                    name="height"
                    value={'short'}
                  >
                    {t(`short`)}
                  </button>
                  <br />
                  <button
                    className={
                      input.type === 'cute' ? styles[`input-button-active`] : styles[`input-button`]
                    }
                    onClick={handleInput}
                    name="type"
                    value={'cute'}
                  >
                    {t(`cute`)}
                  </button>
                  <button
                    className={
                      input.type === 'mature'
                        ? styles[`input-button-active`]
                        : styles[`input-button`]
                    }
                    onClick={handleInput}
                    name="type"
                    value={'mature'}
                  >
                    {t(`mature`)}
                  </button>
                </>
              ) : (
                <>
                  <button
                    className={
                      input.type === 'intellectual'
                        ? styles[`input-button-active`]
                        : styles[`input-button`]
                    }
                    onClick={handleInput}
                    name="type"
                    value={'intellectual'}
                  >
                    {t(`intellectual`)}
                  </button>
                  <button
                    className={
                      input.type === 'tough'
                        ? styles[`input-button-active`]
                        : styles[`input-button`]
                    }
                    onClick={handleInput}
                    name="type"
                    value={'tough'}
                  >
                    {t(`tough`)}
                  </button>
                  <br />
                  <button
                    className={
                      input.personality === 'good'
                        ? styles[`input-button-active`]
                        : styles[`input-button`]
                    }
                    onClick={handleInput}
                    name="personality"
                    value={'good'}
                  >
                    {t(`good`)}
                  </button>
                  <button
                    className={
                      input.personality === 'bad'
                        ? styles[`input-button-active`]
                        : styles[`input-button`]
                    }
                    onClick={handleInput}
                    name="personality"
                    value={'bad'}
                  >
                    {t(`bad`)}
                  </button>
                </>
              )}
            </div>
            <button onClick={handleResultClick} className={styles[`input-confirm`]}>
              {t(`confirm`)}
            </button>
            <div className={styles[`input-title`]}> {t(`notSave`)}</div>
          </section>
        )}
        {/* 결과 부분 */}
        {step === 2 && now.url && (
          <section className={styles[`result-section`]}>
            <h3 className={styles[`sub-title`]}>{t(`result`)}</h3>
            <div className={styles[`result-text`]}>
              {t(`coupleResult`, {
                _name: input.name,
                _champ: now.name
              })}
            </div>
            <Images src={now.url} width={140} height={140} loader={imageLoader} />
            <div className={styles[`champ-name`]}>{now.name}</div>
            <div className={styles.lore}>{now.lore}</div>
            <button className={styles[`reset-button`]} onClick={handleReset}>
              {t(`again`)}
            </button>
          </section>
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
