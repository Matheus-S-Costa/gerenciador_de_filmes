import { createStore } from "redux";
import { reducers } from "./reducers";
import { saveLikedMovies } from "../shared/utils/likedMoviesStorage";


export const store = createStore(
  reducers,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  const state: any = store.getState();
  saveLikedMovies(state.movies?.likedMovies ?? []);
});