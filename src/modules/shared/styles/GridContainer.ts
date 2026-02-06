import styled from 'styled-components';

export const GridContainer = styled.div`
  width: 100%;
  margin: 0 auto;

  display: grid;
  gap: 10px;                 
  align-items: stretch;

  /* Mobile: 2 colunas bem bonitas */
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (min-width: 480px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 14px;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 14px;              
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 16px;
  }
`;
