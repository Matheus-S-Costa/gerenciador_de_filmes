import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { GridContainer } from '../../shared/styles/GridContainer';
import { MovieThumb } from '../components/MovieThumb/MovieThumb';
import { MovieFormData, SearchBar } from '../components/SearchBar';
import { MovieItem, MoviesService } from '../services/MoviesService';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { likeMovie, unlikeMovie } from '../store/actions/moviesActions';

export const Home: React.FC = () => {
  const [movies, setMovies] = useState<MovieItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const dispatch = useDispatch();
  const likedMovies = useSelector((state: any) => state.movies.likedMovies);

  const { t } = useTranslation(['movie']);

    const handleSearch = async ({ s, type }: MovieFormData) => {
    setLoading(true);
    setHasSearched(true);
    setErrorMsg(null);

    try {
        const { data } = await MoviesService.getWithParams({
        s,
        type: type?.value,
        });

        // Se o seu MovieResults tem Response (padrão OMDb)
        if (data.Response === 'True') {
        setMovies(data.Search ?? []);
        setErrorMsg(null);
        } else {
        setMovies([]);
        // Aqui NÃO acessa data.Error se o tipo não permite
        setErrorMsg('Nenhum resultado encontrado.');
        }
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        setMovies([]);
        setErrorMsg(message);
    } finally {
        setLoading(false);
    }
    };


  const handleLikeMovie = (movie: MovieItem) => dispatch(likeMovie(movie));
  const handleUnlikeMovie = (movie: MovieItem) => dispatch(unlikeMovie(movie));

  const likedIds = useMemo(() => {
    return new Set((likedMovies ?? []).map((m: MovieItem) => m.imdbID));
  }, [likedMovies]);

  const isLikedByUser = (movie: MovieItem) => likedIds.has(movie.imdbID);

  return (
    <Page>
      <TopBar>
        <Brand>
          <LogoDot />
          <div>
            <Title>My Movies</Title>
            <Subtitle>{t('subtitle', { defaultValue: 'Encontre filmes e salve seus favoritos.' })}</Subtitle>
          </div>
        </Brand>

        <RightInfo>
          <Pill title="Favoritos">
            ❤️ <b>{likedMovies?.length ?? 0}</b>
          </Pill>
        </RightInfo>
      </TopBar>

      <Card>
        <SearchBar onFormSubmit={handleSearch} />
      </Card>

      <SectionHeader>
        <h2>
          {loading
            ? t('loading', { defaultValue: 'Buscando…' })
            : !hasSearched
              ? t('start', { defaultValue: 'Comece pesquisando um filme' })
              : movies.length > 0
                ? t('results', { defaultValue: 'Resultados' })
                : t('notFound', { defaultValue: 'Nenhum resultado encontrado' })}
        </h2>

        {hasSearched && !loading && (
          <SmallText>
            {movies.length > 0
              ? t('count', { defaultValue: '{{count}} itens', count: movies.length })
              : errorMsg
                ? errorMsg
                : t('tryAnother', { defaultValue: 'Tente outro termo (ex.: Batman, Matrix, Avatar).' })}
          </SmallText>
        )}
      </SectionHeader>

      {loading ? (
        <GridContainer>
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </GridContainer>
      ) : movies.length > 0 ? (
        <GridContainer>
          {movies.map((movie: MovieItem) => (
            <MovieThumb
              key={movie.imdbID}
              movie={movie}
              like={() => handleLikeMovie(movie)}
              unlike={() => handleUnlikeMovie(movie)}
              likedByUser={isLikedByUser(movie)}
            />
          ))}
        </GridContainer>
      ) : (
        <EmptyState>
          <EmptyIcon>🎬</EmptyIcon>
          <EmptyTitle>
            {!hasSearched
              ? t('emptyTitle', { defaultValue: 'Procure por um filme para ver resultados.' })
              : t('emptyNoResults', { defaultValue: 'Não encontramos nada por aqui.' })}
          </EmptyTitle>
          <EmptySubtitle>
            {!hasSearched
              ? t('emptyHint', { defaultValue: 'Dica: use termos em inglês para melhorar as buscas.' })
              : t('emptyHint2', { defaultValue: 'Tente variar o nome ou remover palavras extras.' })}
          </EmptySubtitle>
        </EmptyState>
      )}
    </Page>
  );
};

/** ===== styled-components locais (só para a Home) ===== */
const Page = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 28px 16px 40px;
`;

const TopBar = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
`;

const Brand = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const LogoDot = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 999px;
  background: #111;
  box-shadow: 0 0 0 6px rgba(17, 17, 17, 0.08);
`;

const Title = styled.h1`
  margin: 0;
  font-size: 28px;
  line-height: 1.1;
`;

const Subtitle = styled.p`
  margin: 4px 0 0;
  opacity: 0.75;
`;

const RightInfo = styled.div`
  display: flex;
  gap: 10px;
`;

const Pill = styled.div`
  font-size: 14px;
  background: rgba(0, 0, 0, 0.06);
  padding: 8px 12px;
  border-radius: 999px;
  user-select: none;

  b {
    font-weight: 700;
  }
`;

const Card = styled.div`
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  padding: 14px;
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.06);
  margin-bottom: 18px;
`;

const SectionHeader = styled.div`
  margin: 18px 2px 10px;

  h2 {
    margin: 0;
    font-size: 18px;
  }
`;

const SmallText = styled.div`
  margin-top: 6px;
  opacity: 0.75;
  font-size: 13px;
`;

const EmptyState = styled.div`
  margin-top: 26px;
  padding: 30px 18px;
  border-radius: 18px;
  border: 1px dashed rgba(0, 0, 0, 0.18);
  text-align: center;
`;

const EmptyIcon = styled.div`
  font-size: 34px;
  margin-bottom: 10px;
`;

const EmptyTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
`;

const EmptySubtitle = styled.div`
  margin-top: 6px;
  opacity: 0.75;
`;

const SkeletonCard = styled.div`
  height: 280px;
  border-radius: 14px;
  background: rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.06);
  animation: pulse 1.2s ease-in-out infinite;

  @keyframes pulse {
    0% { opacity: 0.55; }
    50% { opacity: 0.85; }
    100% { opacity: 0.55; }
  }
`;