import styled from 'styled-components';

export const Main = styled.main`
  display: flex;
  width: 100%;
  max-width: 1200px;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  padding-bottom: 32px;
  background-color: #040a14;
`;

export const Title = styled.h2`
  ${({ theme }) => theme.textSize.S28W700};
`;

export const InputSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const InputTitle = styled.div`
  ${({ theme }) => theme.textSize.S16W700};
`;

export const InputLabel = styled.label`
  ${({ theme }) => theme.textSize.S16W700};
`;

export const Input = styled.input`
  padding: 6px !important;
  border: 2px solid ${({ theme }) => theme.textColor.default} !important;
  border-radius: 4px !important;
`;

export const InputBtn = styled.button<{ $isActive?: boolean }>`
  padding: 4px;
  border: 2px solid ${({ theme }) => theme.textColor.default};
  border-radius: 4px;
  color: ${({ theme }) => theme.textColor.default};
  ${({ theme }) => theme.textSize.S16W400};
  color: ${(props) => (props.$isActive ? 'black' : props.theme.textColor.default)};
  background-color: ${(props) => (props.$isActive ? props.theme.textColor.default : 'none')};
`;

export const InputConfirm = styled.button`
  padding: 4px;
  border: 2px solid ${({ theme }) => theme.textColor.default};
  border-radius: 4px;
  color: ${({ theme }) => theme.textColor.default};

  ${({ theme }) => theme.textSize.S20W700};
`;

export const ResultSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SubTitle = styled.h3`
  ${({ theme }) => theme.textSize.S20W700};
`;

export const ResultText = styled.div`
  margin-bottom: 16px;

  ${({ theme }) => theme.textSize.S20W700};
`;

export const ChampName = styled.div`
  margin-bottom: 16px;

  ${({ theme }) => theme.textSize.S20W700};
`;

export const Lore = styled.div`
  margin-top: 32px;

  ${({ theme }) => theme.textSize.S18W400};
`;

export const ResetBtn = styled.button`
  padding: 8px 16px;
  border: 1px solid ${({ theme }) => theme.textColor.default};
  margin-top: 16px;
  color: ${({ theme }) => theme.textColor.default};

  ${({ theme }) => theme.textSize.S16W500};
`;

// * 카카오톡 공유하기

export const Share = styled.button`
  width: 100%;
  max-width: 180px;
  padding: 8px 16px;
  border: 1px solid ${({ theme }) => theme.textColor.default};
  margin-top: 16px;
  color: ${({ theme }) => theme.textColor.default};

  ${({ theme }) => theme.textSize.S16W500};
`;
