import { Metadata } from 'next';
import Story from '@components/page/story';

// ts-prune-ignore-next
export const metadata: Metadata = {
  title: 'LOL Simulation | 롤 스토리 읽기',
  description: '롤 스토리 읽기',
  openGraph: {
    title: 'LOL Simulation | 롤 스토리 읽기',
    description: '롤 스토리 읽기',
    url: 'https://lol-simulation.site/couple',
    siteName: 'LOL Simulation',
    images: '/images/hextech_chest.png',
    type: 'website'
  },
  icons: '/images/hextech_chest.png',
  robots: 'all',
  keywords:
    'LOL Simulation, 롤 연애상대,롤 연애, lol, simultation,롤 시뮬레이션, 롤 상자깡 시뮬레이션, 롤 상자깡,시뮬레이션, 게임 시뮬레이션, 시뮬레이터, 롤 시뮬레이터, 상자깡, 상자, 마법공학 상자, 마법공학, 명품상자, 주머니, 토큰, 롤 상자깡, 라구, 롤, 리그오브레전드, 열쇠, 롤 스킨, 주황정수, 라구깡, 신스킨, 롤 신스킨, 먹그림자라구, 먹그림자라구깡, 롤 패스, kda, 프레스티지, 프레스티지 신스킨, 롤 스킨 목록,prestige, prestige box, prestige chest, hextech, hextech chest, lol skin, lol skin list, new lol skin, lol ward skin, lol profile icon, lol, 리그오브레전드, leagueoflegends, 롤 패치, 롤 신챔, Naafiri, 나피리, 페이커, faker, 롤 스토리, 챔피언 스토리, 챔피언 이야기, lol story'
};

export default function Page() {
  return (
    <>
      <Story />
    </>
  );
}
