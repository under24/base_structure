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
  generateLink(page, tmdbId, description, date) {
    let nameURL = '';
    if (description) {
      const nameFormatted = description
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
  formatCombinedCast(cast) {
    const movie = [];
    const tv = [];
    const combined = [];

    cast.forEach(castItem => {
      const formattedCastItem = this.formatCast(castItem);

      switch (formattedCastItem.mediaType) {
        case 'movie':
          movie.push(formattedCastItem);
          break;
        case 'tv':
          tv.push(formattedCastItem);
          break;
      }

      combined.push(formattedCastItem);
    });

    return { movie, tv, combined };
  },
  formatCast(castItem) {
    if (!castItem) {
      console.warn('no input data to work with');
    }

    let result = null;

    if (castItem.media_type === 'movie') {
      result = {
        ...this.formatMovieObject(castItem),
        character: castItem.character || '',
        creditId: castItem.credit_id || ''
      };
    } else if (castItem.media_type === 'tv') {
      result = {
        ...this.formatTvObject(castItem),
        character: castItem.character || '',
        creditId: castItem.credit_id || '',
        episodeCount: castItem.episode_count || 0
      };
    }

    return result;
  },
  formatCrew(crewItem) {
    if (!crewItem) {
      console.warn('no input data to work with');
    }

    let result;

    if (crewItem.media_type === 'movie') {
      result = {
        ...this.formatMovieObject(crewItem),
        creditId: crewItem.credit_id || '',
        department: crewItem.department || '',
        job: crewItem.job || ''
      };
    } else if (crewItem.media_type === 'tv') {
      result = {
        ...this.formatTvObject(crewItem),
        creditId: crewItem.credit_id || '',
        department: crewItem.department || '',
        episodeCount: crewItem.episode_count || 0,
        job: crewItem.job || ''
      };
    }

    return result;
  },
  formatTaggedImageMediaObject(data) {
    let result;

    if (data.media_type === 'movie') {
      result = this.formatMovieObject(data.media);
    } else if (data.media_type === 'tv') {
      result = this.formatTvObject(data.media);
    }

    return result;
  },
  formatMovieObject(data) {
    const link = this.generateLink(
      'movies',
      data.id,
      data.original_title,
      data.release_date
    );

    return {
      link,
      mediaType: 'movie',
      adult: data.adult || false,
      backdrop: data.backdrop_path || '',
      genres: data.genre_ids || [],
      id: data.id,
      originalLanguage: data.original_language || '',
      originalTitle: data.original_title || '',
      overview: data.overview || '',
      popularity: data.popularity || 0,
      poster: data.poster_path || '',
      releaseDate: data.release_date || '',
      title: data.title || '',
      video: data.video || false,
      voteAverage: data.vote_average || 0,
      voteCount: data.vote_count || 0
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
      link,
      mediaType: 'tv',
      backdrop: data.backdrop_path || '',
      releaseDate: data.first_air_date || '',
      genres: data.genre_ids || [],
      id: data.id,
      title: data.name || '',
      originCountry: data.origin_country || [],
      originalLanguage: data.original_language || '',
      originalTitle: data.original_name || '',
      overview: data.overview || '',
      popularity: data.popularity || 0,
      poster: data.poster_path || '',
      voteAverage: data.vote_average || 0,
      voteCount: data.vote_count || 0
    };
  }
};

export default actionCreatorsUtils;
