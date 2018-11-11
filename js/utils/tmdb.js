const tmdb = {
  getApiKey() {
    return '96458538d2ee34c586e44aca817e2f8e';
  },
  peopleGetPopular(page) {
    if (
      (page && typeof page !== 'number') ||
      (page && (page > 1000 || page < 1))
    )
      console.warn('wrong input value: page');

    const apiKey = this.getApiKey();
    const pageQuery = page ? `&page=${page}` : '';

    console.log(`TMDB: PEOPLE-GET-POPULAR fetching...`);

    return fetch(
      `https://api.themoviedb.org/3/person/popular?api_key=${apiKey}&language=ru${pageQuery}`
    ).then(response => {
      console.log(`TMDB: PEOPLE-GET-POPULAR fetched`);
      return response;
    });
  },
  peopleGetTaggedImages(tmdbId, page) {
    const pageQuery = page ? `&page=${page}` : '';
    const apiKey = this.getApiKey();

    if (
      (page && typeof page !== 'number') ||
      (page && (page > 1000 || page < 1))
    )
      console.warn('wrong input value: page');

    if (!tmdbId || !apiKey) console.warn('required vars are missing');

    console.log(`TMDB: PEOPLE-TAGGED-IMAGES fetching... [${tmdbId}]`);

    return fetch(
      `https://api.themoviedb.org/3/person/${tmdbId}/tagged_images?api_key=${apiKey}&language=ru${pageQuery}`
    ).then(response => {
      console.log(`TMDB: PEOPLE-TAGGED-IMAGES fetched [${tmdbId}]`);
      return response;
    });
  },
  peopleGetExternalIDs(tmdbId) {
    const apiKey = this.getApiKey();

    if (!tmdbId || !apiKey) console.warn('required vars are missing');

    console.log(`TMDB: PEOPLE-EXTERNAL-IDS fetching... [${tmdbId}]`);

    return fetch(
      `https://api.themoviedb.org/3/person/${tmdbId}/external_ids?api_key=${apiKey}`
    ).then(response => {
      console.log(`TMDB: PEOPLE-EXTERNAL-IDS fetched [${tmdbId}]`);
      return response;
    });
  },
  peopleGetDetails(tmdbId) {
    const apiKey = this.getApiKey();

    if (!tmdbId || !apiKey) console.warn('required vars are missing');

    console.log(`TMDB: PEOPLE-DETAILS fetching... [${tmdbId}]`);

    return fetch(
      `https://api.themoviedb.org/3/person/${tmdbId}?api_key=${apiKey}&language=ru`
    ).then(response => {
      console.log(`TMDB: PEOPLE-DETAILS fetched [${tmdbId}]`);
      return response;
    });
  },
  peopleGetCombinedCredits(tmdbId) {
    const apiKey = this.getApiKey();

    if (!tmdbId || !apiKey) console.warn('required vars are missing');

    console.log(`TMDB: PEOPLE-COMBINED-CREDITS fetching... [${tmdbId}]`);

    return fetch(
      `https://api.themoviedb.org/3/person/${tmdbId}/combined_credits?api_key=${apiKey}&language=ru`
    ).then(response => {
      console.log(`TMDB: PEOPLE-COMBINED-CREDITS fetched [${tmdbId}]`);
      return response;
    });
  },
  peopleGetBatchData(tmdbId) {
    const apiKey = this.getApiKey();

    if (!tmdbId || !apiKey) {
      console.warn('required vars are missing');
    }

    console.log(`TMDB: batched data fetching... [${tmdbId}]`);

    return fetch(
      `https://api.themoviedb.org/3/person/${tmdbId}?api_key=${apiKey}&language=ru&append_to_response=combined_credits%2Cexternal_ids%2Cimages%2Ctagged_images`
    ).then(response => {
      console.log(`TMDB: batched data fetched [${tmdbId}]`);
      return response;
    });
  },
  searchMulti(searchQuery, page = 1) {
    const apiKey = this.getApiKey();

    if (!searchQuery || !apiKey) {
      console.warn('required vars are missing');
    }

    console.log(`TMDB: SEARCH-MULTI fetching... [${searchQuery}]`);

    return fetch(`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=ru&query=${searchQuery}&page=${page}&include_adult=false
`).then(response => {
      console.log(`TMDB: SEARCH-MULTI fetched [${searchQuery}]`);
      return response;
    });
  }
};

export default tmdb;
