import utils from '../../utils/actionCreatorsUtils';
import { ADD_TMDB_PEOPLE_BATCHED_DATA } from '../actions/person';

export const addTmdbPeopleBatchedData = data => {
  const details = {
    adult: data.details.adult,
    alsoKnownAs: data.details.also_known_as || [],
    biography: data.details.biography || '',
    birthday: data.details.birthday || '',
    deathday: data.details.deathday || '',
    gender: data.details.gender,
    homepage: data.details.homepage || '',
    id: data.details.id,
    // imdbId: data.details.imdb_id || '',
    knownForDepartment: data.details.known_for_department || '',
    name: data.details.name || '',
    birthplace: data.details.place_of_birth || '',
    popularity: data.details.popularity || 0,
    image: data.details.profile_path || ''
  };

  const credits = {
    cast: data.combinedCredits.cast.map(utils.formatCast.bind(utils)),
    crew: data.combinedCredits.crew.map(utils.formatCrew.bind(utils))
  };

  const externalIds = {
    imdb: data.externalIds.imdb_id
      ? `https://www.imdb.com/name/${data.externalIds.imdb_id}/`
      : '',
    twitter: data.externalIds.twitter_id
      ? `https://twitter.com/${data.externalIds.twitter_id}/`
      : '',
    instagram: data.externalIds.instagram_id
      ? `https://www.instagram.com/${data.externalIds.instagram_id}/`
      : '',
    facebook: data.externalIds.facebook_id
      ? `https://www.facebook.com/${data.externalIds.facebook_id}/`
      : ''
  };

  const images = data.images.profiles.map(imageObj => ({
    aspectRatio: imageObj.aspect_ratio,
    image: imageObj.file_path,
    height: imageObj.height,
    width: imageObj.width,
    iso_639_1: imageObj.iso_639_1,
    voteAverage: imageObj.vote_average,
    voteCount: imageObj.vote_count
  }));

  const taggedImages = {
    totalPages: data.taggedImages.total_pages,
    totaResults: data.taggedImages.total_results,
    pages: {
      [`${data.taggedImages.page}`]: data.taggedImages.results.map(
        taggedImageData => ({
          aspectRatio: taggedImageData.aspect_ratio,
          image: taggedImageData.file_path,
          height: taggedImageData.height,
          voteAverage: taggedImageData.vote_average,
          voteCount: taggedImageData.vote_count,
          width: taggedImageData.width,
          media: utils.formatTaggedImageMediaObject(taggedImageData)
        })
      )
    }
  };

  return {
    type: ADD_TMDB_PEOPLE_BATCHED_DATA,
    payload: {
      details,
      credits,
      externalIds,
      images,
      taggedImages
    },
    metadata: {
      tmdbId: data.details.id
    }
  };
};

export const a = 10;
