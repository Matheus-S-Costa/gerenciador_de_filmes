import styled from 'styled-components';

export const SearchBarForm = styled.form`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;

  display: flex;
  gap: 10px;
  align-items: stretch;
  flex-direction: column;

  /* Tablet / Desktop */
  @media (min-width: 640px) {
    flex-direction: row;
    align-items: center;
  }
`;
