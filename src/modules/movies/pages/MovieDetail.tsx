import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from '../../shared/styles/Container';
import { MovieItemDetail, MoviesService } from '../services/MoviesService';
import { useTranslation } from 'react-i18next';

export const MovieDetail: React.FC = () => {
    const [movie, setMovie] = useState<MovieItemDetail>();
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation(['movie']);

    useEffect(() => {
        MoviesService.getById(id).then(({ data }) => setMovie(data));
    }, [id]);

    return (
        <Container>
            <TitleContainer>{movie?.Title}</TitleContainer>
            <MovieSpecs>
                <PosterContainer>
                    <img src={movie?.Poster} alt="" />
                </PosterContainer>
                <div>
                    <p>
                        <strong>{t('year')}: </strong> {movie?.Year}
                    </p>
                    <p>
                        <strong>{t('type')}: </strong> {movie?.Type}
                    </p>
                    <p>
                        <strong>{t('released')}: </strong> {movie?.Released}
                    </p>
                    <p>
                        <strong>{t('genre')}: </strong> {movie?.Genre}
                    </p>
                    <p>
                        <strong>{t('director')}: </strong> {movie?.Director}
                    </p>
                    <p>
                        <strong>{t('imdbRating')}: </strong> {movie?.imdbRating}
                    </p>
                    <p>
                        <strong>{t('description')}: </strong> {movie?.Plot}
                    </p>
                </div>
            </MovieSpecs>
        </Container>
    );
};

const MovieSpecs = styled.div`
    display: flex;
`;

const PosterContainer = styled.div`
    margin-right: 50px;
`;

const TitleContainer = styled.h1`
    text-align: center;
`;
