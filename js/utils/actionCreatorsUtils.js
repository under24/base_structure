const actionCreatorsUtils = {
  normalizeDates(birthday) {
    return {
      birthday: birthday
        .split('-')
        .reverse()
        .join('.'),
      age: this.getAgeFromDate(new Date(birthday))
    };
  },
  getAgeFromDate(birthday) {
    const diff = Date.now() - birthday;
    const age = Math.floor(diff / 31557600000); // 1000*60*60*24*365.25

    return age;
  },
  generateLink(page, tmdbId, seoPhrase, date) {
    let nameURL = '';
    if (seoPhrase) {
      const nameFormatted = seoPhrase
        .replace(/[^\w\s]/gi, '')
        .trim()
        .toLowerCase()
        .replace(/\s/g, '-');

      if (nameFormatted) {
        nameURL = `-${nameFormatted}`;
      }
    }

    let dateURL = '';
    if (nameURL && date) {
      const dateFormatted = new Date(date).getFullYear();

      dateURL = `-${dateFormatted}`;
    }

    return `/${page}/${tmdbId}${nameURL}${dateURL}`;
  },
  formatCast(castItem) {
    if (!castItem) {
      console.warn('no input data to work with');
    }

    let mediaObj;
    if (castItem.media_type === 'movie') {
      mediaObj = this.formatMovieObject(castItem);
    } else if (castItem.media_type === 'tv') {
      mediaObj = this.formatTvObject(castItem);
    }

    return {
      ...mediaObj,
      backdrop: castItem.backdrop_path || '',
      character: castItem.character || '',
      creditId: castItem.credit_id || '',
      genres: castItem.genre_ids || [],
      id: castItem.id,
      mediaType: 'movie',
      originalLanguage: castItem.original_language || '',
      overview: castItem.overview || '',
      popularity: castItem.popularity || 0,
      poster: castItem.poster_path || '',
      voteAverage: castItem.vote_average || 0,
      voteCount: castItem.vote_count || 0
    };
  },
  formatCrew(crewItem) {
    if (!crewItem) {
      console.warn('no input data to work with');
    }

    let mediaObj;
    if (crewItem.media_type === 'movie') {
      mediaObj = this.formatMovieObject(crewItem);
    } else if (crewItem.media_type === 'tv') {
      mediaObj = this.formatTvObject(crewItem);
    }

    return {
      ...mediaObj,
      department: crewItem.department || '',
      job: crewItem.job || ''
    };
  },
  formatMovieObject(data) {
    const link = this.generateLink(
      'movies',
      data.id,
      data.original_title,
      data.release_date
    );

    return {
      title: data.title || '',
      originalTitle: data.original_title || '',
      releaseDate: data.release_date || '',
      link
    };
  },
  formatTvObject(data) {
    const link = this.generateLink(
      'shows',
      data.id,
      data.original_name,
      data.first_air_date
    );

    return {
      title: data.name || '',
      originalTitle: data.original_name || '',
      originCountry: data.origin_country || [],
      episodes: data.episode_count || 0,
      releaseDate: data.first_air_date || '',
      link
    };
  }
};

export default actionCreatorsUtils;
