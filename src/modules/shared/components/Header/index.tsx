import styled from 'styled-components';
import logo from '../../../../assets/images/logo.svg';
import { InlineList } from '../../styles/InlineList';
import { Navbar } from '../Navbar';
import { useTranslation } from 'react-i18next';

export const Header: React.FC = () => {
    const { i18n } = useTranslation();
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <HeaderContainer>
            <LogoContainer>
                <img src={logo} className="watch-later-logo" alt="logo" />
            </LogoContainer>
            <InlineList>
                <li>
                    <button onClick={() => changeLanguage('en')}>🇺🇸</button>
                </li>
                <li>
                    <button onClick={() => changeLanguage('pt-BR')}>🇧🇷</button>
                </li>
            </InlineList>
            <Navbar />
        </HeaderContainer>
    );
};

const HeaderContainer = styled.header`
    text-align: center;
`;

const LogoContainer = styled.h1`
    img {
        width: 170px;
        height: auto;
    }
`;
