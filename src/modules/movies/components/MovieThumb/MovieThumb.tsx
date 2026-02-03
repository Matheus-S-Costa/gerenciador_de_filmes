import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../../../shared/components/Button/Button';
import { Colors } from '../../../shared/styles/Colors';
import { MoviesRoutePaths } from '../../config/routes';
import { MovieItem } from '../../services/MoviesService';
import { useTranslation } from 'react-i18next';

const imagePlaceholderUri = 'https://placehold.co/600x900?text=No+Poster';

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

const MobieThumbWrapper = styled.article`
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: #fff;

  /* dá um “card feel” */
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.08);
  transform: translateZ(0);
  transition: transform 160ms ease, box-shadow 160ms ease;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 14px 28px rgba(0, 0, 0, 0.12);
    }
  }
`;

const MoviePic = styled.img`
  width: 100%;
  display: block;
  object-fit: cover;
  aspect-ratio: 2 / 3; /* padrão de poster */
  background: rgba(0, 0, 0, 0.06);
`;

const InfoWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;

  padding: 10px 10px 12px;
  color: ${Colors.white};

  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.88),
    rgba(0, 0, 0, 0.25) 70%,
    rgba(0, 0, 0, 0)
  );

  display: grid;
  gap: 10px;

  h3 {
    margin: 0;
    font-size: 14px;
    line-height: 1.2;

    /* não estourar o card no mobile */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  a {
    color: ${Colors.white};
    text-decoration: none;

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        text-decoration: underline;
      }
    }
  }

  /* melhora área de toque do botão */
  button {
    width: 100%;
    min-height: 44px;
  }

  @media (min-width: 768px) {
    padding: 12px 12px 14px;

    h3 {
      font-size: 15px;
    }
  }
`;
