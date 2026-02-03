import styled from 'styled-components';

export const InlineList = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;

    li {
        display: inline-block;
        margin-right: 15px;

        &:last-child {
            margin-right: 0;
        }
    }
`;
