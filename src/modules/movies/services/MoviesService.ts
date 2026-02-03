import { AxiosResponse } from 'axios';
import { movieApi } from '../../core/movieApi';

export interface MovieResults {
    Search: Array<MovieItem>;
    totalResults: string;
    Response: string;
}

export interface MovieItem {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

export interface MovieItemDetail {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
}

export class MoviesService {
    static getWithParams(params: {
        s: string;
        type: string;
    }): Promise<AxiosResponse<MovieResults>> {
        return movieApi.get('/', { params });
    }

    static getById(id: string): Promise<AxiosResponse<MovieItemDetail>> {
        return movieApi.get('/', { params: { i: id, plot: 'full' } });
    }
}
