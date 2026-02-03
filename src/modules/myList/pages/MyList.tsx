import React from 'react';
import { MovieThumb } from '../../movies/components/MovieThumb/MovieThumb';
import { MovieItem } from '../../movies/services/MoviesService';
import { GridContainer } from '../../shared/styles/GridContainer';
import { useDispatch, useSelector } from "react-redux";
import { unlikeMovie } from '../../movies/store/actions/moviesActions';

export const MyList: React.FC = () => {
    const dispatch = useDispatch();
    const likedMovies = useSelector((state: any) => state.movies.likedMovies);

    const handleUnlikeMovie = (movie: MovieItem) => {
        dispatch(unlikeMovie(movie));
    };

    return (
        <GridContainer>
            {likedMovies.map((movie: MovieItem) => (
                <MovieThumb
                    key={movie.imdbID}
                    movie={movie}
                    unlike={() => handleUnlikeMovie(movie)}
                    likedByUser={true}
                />
            ))}
        </GridContainer>
    );
};
