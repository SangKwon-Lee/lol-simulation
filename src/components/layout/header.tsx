'use client';
import Link from 'next/link';
import styled from 'styled-components';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

export default function Header() {
  const t = useTranslations('Index');
  const pathname = usePathname();
  return (
    <HeaderDiv>
      <Wrapper>
        <Link href={'/'}>
          <Title>LOL Simulation</Title>
        </Link>
        <NavWrapper>
          <Link
            href={'/'}
            title="LoL Simulation 상자깡"
            style={{
              fontWeight: pathname === '/' ? 700 : 400
            }}
          >
            {t(`navBox`)}
          </Link>
          <Link
            href={'/couple'}
            title="LoL Simulation 나의 연애 상대 찾기"
            style={{
              fontWeight: pathname === '/couple' ? 700 : 400
            }}
          >
            {t(`navCouple`)}
          </Link>
        </NavWrapper>
      </Wrapper>
    </HeaderDiv>
  );
}

const HeaderDiv = styled.header`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #293435;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  flex-wrap: wrap;
  align-items: center;
  padding: 16px;
`;

const Title = styled.h1`
  margin-right: 32px;
  font-size: 48px;
  ${({ theme }) => theme.textSize.S28W700};
`;

const NavWrapper = styled.nav`
  display: flex;
  gap: 16px;
  ${({ theme }) => theme.textSize.S16W400};
`;
