const trakt = {
  getApiKey() {
    return '76f8823d241c75b03cb34d0225436a5c64db4cd285a292056cbb512151d5b928';
  },
  getHeaders() {
    return {
      'Content-Type': 'application/json',
      'trakt-api-version': '2',
      'trakt-api-key': this.getApiKey()
    };
  },
  getRequestParams() {
    return {
      method: 'GET',
      headers: new Headers(this.getHeaders()),
      mode: 'cors',
      cache: 'default'
    };
  },
  getPeopleSummary(slug, extended) {
    const params = this.getRequestParams();
    const extendedQuery = extended ? '?extended=full' : '';

    if (!slug || !params) {
      console.warn('required vars are missing');
    }

    console.log(`TRAKT: PEOPLE-SUMMARY fetching... [${slug}]`);

    return fetch(
      `https://api.trakt.tv/people/${slug}${extendedQuery}`,
      params
    ).then(response => {
      console.log(`TRAKT: PEOPLE-SUMMARY fetched [${slug}]`);
      return response;
    });
  },
  getPeopleMovies(slug, extended) {
    const params = this.getRequestParams();
    const extendedQuery = extended ? '?extended=full' : '';

    if (!slug || !params) {
      console.warn('required vars are missing');
    }

    console.log(`TRAKT: PEOPLE-MOVIES fetching... [${slug}]`);

    return fetch(
      `https://api.trakt.tv/people/${slug}/movies${extendedQuery}`,
      params
    ).then(response => {
      console.log(`TRAKT: PEOPLE-MOVIES fetched [${slug}]`);
      return response;
    });
  },
  getPeopleShows(slug, extended) {
    const params = this.getRequestParams();
    const extendedQuery = extended ? '?extended=full' : '';

    if (!slug || !params) {
      console.warn('required vars are missing');
    }

    console.log(`TRAKT: PEOPLE-SHOWS fetching... [${slug}]`);

    return fetch(
      `https://api.trakt.tv/people/${slug}/shows${extendedQuery}`,
      params
    ).then(response => {
      console.log(`TRAKT: PEOPLE-SHOWS fetched [${slug}]`);
      return response;
    });
  }
};

export default trakt;
