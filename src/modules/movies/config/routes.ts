import { RouteStructureProps } from '../../../routes';
import { Home } from '../pages/Home';
import { MovieDetail } from '../pages/MovieDetail';

export enum MoviesRoutePaths {
    Home = '/',
    Movie = '/movie',
}

export const moviesModuleRoute: Array<RouteStructureProps> = [
    {
        path: MoviesRoutePaths.Home,
        key: 'INDEX',
        exact: true,
        component: Home,
    },
    {
        path: `${MoviesRoutePaths.Movie}/:id`,
        key: 'MOVIE_DETAIL',
        exact: true,
        component: MovieDetail,
    },
];
