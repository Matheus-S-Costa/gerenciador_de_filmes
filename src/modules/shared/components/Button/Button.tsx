import React from 'react';
import styled from 'styled-components';
import { Colors } from '../../styles/Colors';

type ButtonProps = {
    label: string;
    type?: 'button' | 'submit' | 'reset' | undefined;
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

class Button extends React.PureComponent<ButtonProps> {
    render() {
        const { label, type, onClick } = this.props;
        return (
            <ButtonContainer type={type} onClick={onClick}>
                {label}
            </ButtonContainer>
        );
    }
}

const ButtonContainer = styled.button`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    font-size: 16px;
    text-transform: uppercase;
    line-height: 100%;
    align-items: center;
    text-align: center;
    border-radius: 4px;
    outline: none;
    color: white;
    background-color: ${Colors.darkRed};
    padding: 5px 10px;
    width: fit-content;
`;

export { Button };
