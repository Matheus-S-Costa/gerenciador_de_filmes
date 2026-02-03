import axios from 'axios';

/** OMDB API configs */
const OMDB_API_KEY = 'a834ab5c';
const movieApiBaseUrl = 'http://www.omdbapi.com';
export const movieApi = axios.create({
    baseURL: movieApiBaseUrl,
    params: {
        apikey: OMDB_API_KEY,
    },
});
