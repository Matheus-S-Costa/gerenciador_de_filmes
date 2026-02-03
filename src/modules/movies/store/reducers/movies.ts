import { MovieItem } from '../../services/MoviesService';
import { LIKE_MOVIE, UNLIKE_MOVIE } from '../actions/moviesActions';

export interface InitialMovieState {
    likedMovies: Array<MovieItem>;
}

const initialState: InitialMovieState = {
    likedMovies: [],
};

export const movies = (
    state = initialState,
    action: { type: string; payload: any }
) => {
    switch (action.type) {
        case LIKE_MOVIE:
            return {
                ...initialState,
                likedMovies: state.likedMovies.concat(action.payload),
            };
        case UNLIKE_MOVIE:
            return {
                ...initialState,
                likedMovies: state.likedMovies.filter(
                    m => m.imdbID !== action.payload.imdbID
                ),
            };
        default:
            return state;
    }
};
