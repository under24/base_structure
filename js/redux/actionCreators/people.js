import { ADD_TMDB_PEOPLE_POPULAR } from '../actions/people';

export const addTmdbPeoplePopular = data => ({
  type: ADD_TMDB_PEOPLE_POPULAR,
  payload: {
    pages: {
      [data.page]: data.results
    },
    totalPages: data.total_pages,
    totalResults: data.total_results
  }
});

export const a = 10;
