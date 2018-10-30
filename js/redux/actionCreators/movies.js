import { ADD_MOVIE_SUMMARY } from '../actions/movies';

export const addMovieSummary = (slug, summary) => ({
  type: ADD_MOVIE_SUMMARY,
  payload: { [slug]: summary }
});

export const a = 10;
