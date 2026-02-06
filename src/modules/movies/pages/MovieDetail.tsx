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
    const controller = new AbortController();

    async function loadMovie() {
      try {
        const { data } = await MoviesService.getById(id);

        setMovie(data);

        const plot = data?.Plot;

        if (!plot || plot === 'N/A') return;

        try {
          const translatedPlot = await translateToPt(plot, controller.signal);
          setMovie(prev => (prev ? { ...prev, Plot: translatedPlot } : prev));
        } catch (err) {
          console.error('[translateToPt] falhou:', err);
        }
      } catch (err) {
        console.error('[getById] falhou:', err);
      }
    }

    loadMovie();

    return () => controller.abort();
  }, [id]);

  async function translateToPt(text: string, signal?: AbortSignal): Promise<string> {
    const res = await fetch('https://libretranslate.de/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal,
      body: JSON.stringify({
        q: text,
        source: 'en',
        target: 'pt',
        format: 'text',
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => '');
      throw new Error(`HTTP ${res.status} - ${res.statusText} - ${body}`);
    }

    const data: any = await res.json();

    if (!data?.translatedText) {
      throw new Error('Resposta sem translatedText');
    }

    return data.translatedText;
  }


  return (
    <Container>
      <Page>
        <TitleContainer>{movie?.Title}</TitleContainer>

        <MovieSpecs>
          <PosterContainer>
            <Poster
              src={movie?.Poster}
              alt={movie?.Title ? `${movie.Title} poster` : 'Poster'}
              loading="lazy"
            />
          </PosterContainer>

          <Specs>
            <SpecRow>
              <SpecLabel>{t('year')}:</SpecLabel>
              <SpecValue>{movie?.Year || '-'}</SpecValue>
            </SpecRow>

            <SpecRow>
              <SpecLabel>{t('type')}:</SpecLabel>
              <SpecValue>{movie?.Type || '-'}</SpecValue>
            </SpecRow>

            <SpecRow>
              <SpecLabel>{t('released')}:</SpecLabel>
              <SpecValue>{movie?.Released || '-'}</SpecValue>
            </SpecRow>

            <SpecRow>
              <SpecLabel>{t('genre')}:</SpecLabel>
              <SpecValue>{movie?.Genre || '-'}</SpecValue>
            </SpecRow>

            <SpecRow>
              <SpecLabel>{t('director')}:</SpecLabel>
              <SpecValue>{movie?.Director || '-'}</SpecValue>
            </SpecRow>

            <SpecRow>
              <SpecLabel>{t('imdbRating')}:</SpecLabel>
              <SpecValue>{movie?.imdbRating || '-'}</SpecValue>
            </SpecRow>

            <Description>
              <SpecLabelBlock>{t('description')}:</SpecLabelBlock>
              <p>{movie?.Plot || '-'}</p>
            </Description>
          </Specs>
        </MovieSpecs>
      </Page>
    </Container>
  );
};

const Page = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 18px 12px 28px;

  @media (min-width: 768px) {
    padding: 26px 16px 40px;
  }
`;

const TitleContainer = styled.h1`
  margin: 6px 0 16px;
  text-align: center;
  font-size: clamp(20px, 4.8vw, 34px);
  line-height: 1.15;
`;

const MovieSpecs = styled.section`
  display: grid;
  gap: 16px;

  /* Mobile: uma coluna */
  grid-template-columns: 1fr;

  /* Desktop: duas colunas */
  @media (min-width: 768px) {
    gap: 22px;
    grid-template-columns: 360px 1fr;
    align-items: start;
  }
`;

const PosterContainer = styled.div`
  width: 100%;
`;

const Poster = styled.img`
  width: 100%;
  display: block;
  border-radius: 16px;
  object-fit: cover;
  aspect-ratio: 2 / 3;
  background: rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    position: sticky;
    top: 14px;
  }
`;

const Specs = styled.div`
  background: #fff;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  padding: 14px 14px 10px;
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.06);

  @media (min-width: 768px) {
    padding: 18px 18px 12px;
  }
`;

const SpecRow = styled.div`
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);

  @media (min-width: 768px) {
    grid-template-columns: 130px 1fr;
  }
`;

const SpecLabel = styled.div`
  font-weight: 700;
  opacity: 0.9;
`;

const SpecValue = styled.div`
  opacity: 0.85;
  line-height: 1.35;
  word-break: break-word;
`;

const Description = styled.div`
  padding: 12px 0 4px;

  p {
    margin: 8px 0 0;
    opacity: 0.85;
    line-height: 1.55;
  }
`;

const SpecLabelBlock = styled.div`
  font-weight: 800;
  opacity: 0.95;
`;
