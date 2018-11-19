import linkUtils from './linkUtils';
import genreUtils from './genreUtils';

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
  formatCombinedCast(cast) {
    const movie = [];
    const tv = [];
    const combined = [];

    cast.forEach(castItem => {
      const formattedCastItem = this.formatCast(castItem);

      if (formattedCastItem.mediaType === 'movie') {
        movie.push(formattedCastItem);
      } else if (formattedCastItem.mediaType === 'tv') {
        tv.push(formattedCastItem);
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
  formatSearchMultiObject(data) {
    let result;

    if (data.media_type === 'tv') {
      result = this.formatTvObject(data);
    } else if (data.media_type === 'movie') {
      result = this.formatMovieObject(data);
    } else if (data.media_type === 'person') {
      result = this.formatPersonObject(data);
    }

    return result;
  },
  formatMovieObject(data) {
    const link = linkUtils.generateLink(
      'movies',
      data.id,
      data.original_title,
      data.release_date
    );

    const genres = data.genre_ids
      ? data.genre_ids.map(genreUtils.getGenreNameById.bind(genreUtils))
      : [];

    return {
      link,
      mediaType: 'movie',
      adult: data.adult || false,
      backdrop: data.backdrop_path || '',
      genres,
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
    const link = linkUtils.generateLink(
      'shows',
      data.id,
      data.original_name,
      data.first_air_date
    );

    const genres = data.genre_ids
      ? data.genre_ids.map(genreUtils.getGenreNameById.bind(genreUtils))
      : [];

    return {
      link,
      mediaType: 'tv',
      backdrop: data.backdrop_path || '',
      releaseDate: data.first_air_date || '',
      genres,
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
  },
  formatPersonObject(data) {
    const link = linkUtils.generateLink('people', data.id, data.name);

    return {
      poster: data.profile_path,
      adult: data.adult,
      id: data.id,
      mediaType: 'person',
      knownFor: data.known_for,
      title: data.name,
      popularity: data.popularity,
      link
    };
  }
};

export default actionCreatorsUtils;
