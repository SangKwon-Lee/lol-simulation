'use client';
import { styled } from 'styled-components';

export default function Footer() {
  return (
    <FooterDiv>
      <Wrapper>Copyright © 2023 Powered by Kogong</Wrapper>
    </FooterDiv>
  );
}

const FooterDiv = styled.footer`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-top: 1px solid ${({ theme }) => theme.textColor.default};
  margin-top: auto;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  border-top: 1px solid ${({ theme }) => theme.textColor.color60};
  background-color: ${({ theme }) => theme.bg.default};
  ${({ theme }) => theme.textSize.S14W400};
`;
