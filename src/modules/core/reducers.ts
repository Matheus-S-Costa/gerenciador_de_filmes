import { combineReducers } from "redux";
import { movies } from "../movies/store/reducers/movies";

export const reducers = combineReducers({
    movies,
});
