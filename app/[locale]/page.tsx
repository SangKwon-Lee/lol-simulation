import { Metadata } from 'next';
import Hextect from '@components/page/hextect';

export const metadata: Metadata = {
  title: 'LOL Simulation | 상자깡',
  description: 'LOL Simulation 상자깡 프레스티지를 뽑아라',
  openGraph: {
    title: 'LOL Simulation | 상자깡',
    description: 'LOL Simulation 상자깡 프레스티지를 뽑아라',
    url: 'https://lol-simulation.site',
    siteName: 'LOL Simulation',
    images: '/images/hextech_chest.png',
    type: 'website'
  },
  icons: '/images/hextech_chest.png',
  keywords:
    'LOL Simulation, lol, simultation,롤 시뮬레이션, 롤 상자깡 시뮬레이션, 롤 상자깡,시뮬레이션, 게임 시뮬레이션, 시뮬레이터, 롤 시뮬레이터, 상자깡, 상자, 마법공학 상자, 마법공학, 명품상자, 주머니, 토큰, 롤 상자깡, 라구, 롤, 리그오브레전드, 열쇠, 롤 스킨, 주황정수, 라구깡, 신스킨, 롤 신스킨, 먹그림자라구, 먹그림자라구깡, 롤 패스, kda, 프레스티지, 프레스티지 신스킨, 롤 스킨 목록,prestige, prestige box, prestige chest, hextech, hextech chest, lol skin, lol skin list, new lol skin, lol ward skin, lol profile icon, lol, 리그오브레전드, leagueoflegends, 롤 패치, 롤 신챔, Naafiri, 나피리, 페이커, faker'
};

export default function Home() {
  return (
    <>
      <Hextect />
    </>
  );
}
