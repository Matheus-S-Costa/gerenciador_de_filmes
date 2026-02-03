import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MoviesRoutePaths } from '../../../movies/config/routes';
import { MyListRoutePaths } from '../../../myList/config/routes';
import { Colors } from '../../styles/Colors';
import { InlineList } from '../../styles/InlineList';
import { useTranslation } from 'react-i18next';

export const Navbar: React.FC = () => {
    const { t } = useTranslation(['menu']);

    return (
        <NavbarContainer>
            <InlineList>
                <li>
                    <Link to={MoviesRoutePaths.Home}>{t('home')}</Link>
                </li>
                <li>
                    <Link to={MyListRoutePaths.MyList}>{t('myList')}</Link>
                </li>
            </InlineList>
        </NavbarContainer>
    );
};

const NavbarContainer = styled.nav`
    background: ${Colors.primary};
    padding: 0;
    margin-top: 10px;
    margin-bottom: 20px;
    font-size: 16px;

    a {
        color: ${Colors.white};
        text-decoration: none;
        display: inline-block;
        padding: 10px;

        &:hover {
            background: ${Colors.secondary};
        }
    }
`;
