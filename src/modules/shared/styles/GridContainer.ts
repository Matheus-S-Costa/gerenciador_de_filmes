import styled from 'styled-components';

export const GridContainer = styled.div`
  width: 100%;
  margin: 0 auto;

  display: grid;
  gap: 12px;

  /* Mobile: cards menores / 2 colunas quando couber */
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  justify-content: center;

  @media (min-width: 640px) {
    grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  }

  /* Desktop: aumenta o mínimo -> cria mais colunas -> cards não esticam */
  @media (min-width: 1024px) {
    gap: 16px;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  }
`;
