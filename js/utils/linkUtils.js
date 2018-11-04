const linkUtils = {
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
  }
};

export default linkUtils;
