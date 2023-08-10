import { styled } from 'styled-components';
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

export const List = styled.ul`
  padding: 16px;
  gap: 16px;
  flex-wrap: wrap;
  display: inline-grid;
  grid-template-columns: repeat(7, 1fr);
  @media (max-width: 800px) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media (max-width: 580px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 340px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const NameWrap = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
  margin-bottom: 16px;
`;

export const Name = styled.h3`
  ${({ theme }) => theme.textSize.S28W700};
  margin: 0;
`;

export const ChampTitle = styled.div`
  ${({ theme }) => theme.textSize.S28W700};
`;

export const Lore = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
  ${({ theme }) => theme.textSize.S18W700};
`;

export const ListWrapper = styled.ul`
  display: inline-grid;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
  grid-template-columns: repeat(8, 1fr);

  @media (max-width: 768px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (max-width: 540px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
export const Skin = styled.li`
  position: relative;
  display: inline;
`;
