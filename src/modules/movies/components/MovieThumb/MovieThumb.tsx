import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../../../shared/components/Button/Button';
import { Colors } from '../../../shared/styles/Colors';
import { MoviesRoutePaths } from '../../config/routes';
import { MovieItem } from '../../services/MoviesService';
import { useTranslation } from 'react-i18next';

const imagePlaceholderUri =
    'http://placehold.it/974x548';

type MovieThumbProps = {
    movie: MovieItem;
    likedByUser: boolean;
    like?: () => void;
    unlike?: () => void;
};

export const MovieThumb: React.FC<MovieThumbProps> = ({
    movie,
    likedByUser,
    like,
    unlike,
}) => {
    const [isLikedByUser, setLiked] = useState(likedByUser);
    const { t } = useTranslation(['movie']);

    const handleLikeButtonClick = () => {
        if (isLikedByUser) {
            unlike && unlike();
        } else {
            like && like();
        }

        setLiked(!isLikedByUser);
    };

    return (
        <MobieThumbWrapper>
            <MoviePic
                src={movie.Poster || imagePlaceholderUri}
                alt={`${movie.Title} pic`}
            />
            <InfoWrapper>
                <h3>
                    <Link to={`${MoviesRoutePaths.Movie}/${movie.imdbID}`}>
                        {movie.Title}
                    </Link>
                </h3>
                <Button
                    label={isLikedByUser ? t('unlike') : t('like')}
                    onClick={handleLikeButtonClick}
                />
            </InfoWrapper>
        </MobieThumbWrapper>
    );
};

const MobieThumbWrapper = styled.div`
    width: 250px;
    height: 250px;
    border-radius: 20px;
    border: black solid 1px;
    margin: 20px 15px;
    overflow: hidden;
    position: relative;
`;

const MoviePic = styled.img`
    width: 250px;
    height: 250px;
`;

const InfoWrapper = styled.div`
    width: 250px;
    height: 80px;
    display: flex;
    flex-direction: column;
    background-color: ${Colors.black};
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;
    color: white;
    padding: 10px;
    opacity: 0.8;

    a {
        color: ${Colors.white};
    }
`;
