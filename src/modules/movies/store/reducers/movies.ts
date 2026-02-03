import { MovieItem } from '../../services/MoviesService';
import { LIKE_MOVIE, UNLIKE_MOVIE } from '../actions/moviesActions';
 import { loadLikedMovies } from '../../../shared/utils/likedMoviesStorage';

export interface InitialMovieState {
    likedMovies: Array<MovieItem>;
}

const initialState: InitialMovieState = {
  likedMovies: loadLikedMovies<MovieItem>(),
};

export const movies = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case LIKE_MOVIE: {
      const exists = state.likedMovies.some(m => m.imdbID === action.payload.imdbID);
      return {
        ...state,
        likedMovies: exists ? state.likedMovies : state.likedMovies.concat(action.payload),
      };
    }

    case UNLIKE_MOVIE:
      return {
        ...state,
        likedMovies: state.likedMovies.filter(m => m.imdbID !== action.payload.imdbID),
      };

    default:
      return state;
  }
};

