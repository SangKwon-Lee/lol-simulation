'use client';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';

// ts-prune-ignore-next
export default function NotFound() {
  const router = useRouter();
  const t = useTranslations('Index');

  return (
    <Main>
      <Text>{t(`welcome`)}</Text>
      <Text>404 Not Found</Text>
      <ButtonWrapper>
        <Button onClick={() => router.push(`/`)}>{t(`url1`)}</Button>
        <Button onClick={() => router.push(`/couple`)}>{t(`url2`)}</Button>
      </ButtonWrapper>
    </Main>
  );
}

const Main = styled.main`
  display: flex;
  width: 100%;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  padding-top: 36px;
`;

const Text = styled.div`
  ${({ theme }) => theme.textSize.S16W700};
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

const Button = styled.button`
  padding: 4px 16px;
  border: 1px solid ${({ theme }) => theme.textColor.default};
  border-radius: 4px;
  margin-top: 32px;
  color: ${({ theme }) => theme.textColor.default};
  ${({ theme }) => theme.textSize.S20W700};
`;
