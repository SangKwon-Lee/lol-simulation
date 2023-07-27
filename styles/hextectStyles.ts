import { keyframes, styled } from 'styled-components';

export const Main = styled.main`
  display: flex;
  width: 100%;
  max-width: 1200px;
  min-height: 100vh;
  flex-direction: column;
  padding-bottom: 32px;
  background-color: #040a14;
`;

// * 카테고리

export const CategoryWrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
`;

export const CategoryTitle = styled.h2`
  color: ${({ theme }) => theme.textColor.default};
  ${({ theme }) => theme.textSize.S20W700};
`;

export const CategoryBoxWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

export const CategoryBox = styled.div`
  position: relative;
  display: flex;
  width: 100px;
  height: 100px;
  align-items: center;
  justify-content: center;
  border: 1px solid #f9e5bf;
  background-color: #021a21;
  box-shadow: inset 0 0 10px #000, inset 0 0 2px #000;
  cursor: pointer;
`;
// * 선택한 상자

export const SelectWrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

export const SelectBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 0;
`;

const motion = keyframes`
  from {
    transform: translateY(0px)
  }

  to {
    transform: translateY(10px)
  }
`;

export const SelectBox = styled.div`
  animation: ${motion} 1.5s linear 0s infinite alternate;
  transform: translateY(10px);
  transition: all 0.5;
`;

export const OpenButtonWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

export const OpenButton = styled.button`
  padding: 8px 16px;
  border: 1px solid ${({ theme }) => theme.textColor.default};
  margin-top: 16px;
  color: ${({ theme }) => theme.textColor.default};
  ${({ theme }) => theme.textSize.S16W500};
`;

export const OpenCount = styled.div`
  margin-top: 16px;
  ${({ theme }) => theme.textSize.S14W700};
`;

// * 스킨 결과

export const ResultList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

export const ResultWrapper = styled.section`
  display: flex;
  height: 420px;
  flex-direction: column;
`;

export const SkinResult = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SkinResultTitle = styled.div`
  margin-top: 16px;
  color: ${({ theme }) => theme.textColor.default};
  ${({ theme }) => theme.textSize.S20W700};
`;

// * 기타 리스트

export const OtherWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

// * 스킨 리스트

export const SkinList = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
`;

export const Skin = styled.li`
  position: relative;
  display: inline;
`;

export const ListWrapper = styled.ul`
  display: inline-grid;
  flex-wrap: wrap;
  gap: 16px;
  grid-template-columns: repeat(8, 1fr);

  @media (max-width: 768px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (max-width: 540px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const SkinCount = styled.div`
  position: absolute;
  right: 8px;
  bottom: 8px;
  ${({ theme }) => theme.textSize.S16W700};
`;

// * 확률 모달

export const Modal = styled.div`
  position: absolute;
  z-index: 5;
  top: 30%;
  left: 50%;
  display: flex;
  width: 260px;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.textColor.default};
  margin: auto;
  background-color: black;
  transform: translate(-50%, -50%);
`;

export const ModalTitle = styled.div`
  ${({ theme }) => theme.textSize.S20W700};

  padding-bottom: 8px;
  text-align: center;
`;

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const ModalText = styled.div`
  ${({ theme }) => theme.textSize.S16W400};
`;
export const ModalPercent = styled.div`
  margin-top: 8px;
  ${({ theme }) => theme.textSize.S14W400};
`;

export const ModalClose = styled.div`
  position: absolute;
  right: 16px;

  ${({ theme }) => theme.textSize.S16W400};

  cursor: pointer;
`;

export const Share = styled.button`
  width: 100%;
  max-width: 200px;
  padding: 8px 16px;
  border: 1px solid ${({ theme }) => theme.textColor.default};
  margin-top: 16px;
  color: ${({ theme }) => theme.textColor.default};

  ${({ theme }) => theme.textSize.S16W500};
`;
