'use client';
import * as S from '@styles/storyStyles';
import champions from '@src/json/champion.json';
import Images from '@utils/images';
import { champSkin, champSquare, imageLoader } from '@utils/imgLoader';
import { useState } from 'react';
import axios from 'axios';
import { useLocale, useTranslations } from 'next-intl';

interface Champ {
  name: string;
  title: string;
  lore: string;
  blurb: string;
  skins: {
    name: string;
  }[];
}

const champList = Object.keys(champions.data);
const version = process.env.NEXT_PUBLIC_VERSION;
export default function Story() {
  const [select, setSelect] = useState('');
  const [champ, setChamp] = useState<Champ>({
    blurb: '',
    lore: '',
    name: '',
    title: '',
    skins: []
  });
  const [skinList, setSkinList] = useState([]);
  const locale = useLocale();
  const t = useTranslations('Index');
  const dataLocale = locale === 'ko' ? 'ko_KR' : 'en_US';
  const handleGetStory = async (select: string) => {
    try {
      const { data } = await axios.get(
        `https://ddragon.leagueoflegends.com/cdn/${version}/data/${dataLocale}/champion/${select}.json`
      );

      if (data.data) {
        const SkinList = data.data[select].skins.map((data: any) => champSkin(select, data.num));
        setSkinList(SkinList);
        setChamp(data.data[select]);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <S.Main>
      <S.Title>{t(`storyTitle`)}</S.Title>
      {champ.name && (
        <>
          <Images src={champSquare(select)} width={100} height={100} />
          <S.NameWrap>
            <S.ChampTitle>{champ.title}</S.ChampTitle>
            <S.Name>{champ.name}</S.Name>
          </S.NameWrap>
          <S.Lore>{champ.lore}</S.Lore>

          <S.Lore>
            {t(`skinCount`)} : {champ.skins.length - 1}
          </S.Lore>

          <S.ListWrapper>
            {skinList.map((data: any) => (
              <S.Skin key={data}>
                <Images
                  src={data}
                  width={157}
                  height={240}
                  loader={imageLoader}
                  style={{ display: 'inline', maxWidth: '157px', height: '100%', width: '100%' }}
                />
              </S.Skin>
            ))}
          </S.ListWrapper>
        </>
      )}
      <S.List>
        {champList.map((data) => (
          <Images
            key={data}
            onClick={() => {
              handleGetStory(data);
              setSelect(data);
            }}
            style={{ cursor: 'pointer' }}
            src={champSquare(data)}
            width={100}
            height={100}
          />
        ))}
      </S.List>
    </S.Main>
  );
}
