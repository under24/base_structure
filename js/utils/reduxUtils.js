const reduxUtils = {
  combineObjects(obj1, obj2) {
    const result = { ...obj1 };

    Object.keys(obj2).forEach(key => {
      // if both obj have the same key
      // use obj2 cause it is from tmdb
      if (result[key] && obj2[key]) {
        result[key] = obj2[key];
      }

      // if obj1 does not have a key and obj2 does have
      // then put obj2 key in obj1
      if (!result[key]) {
        result[key] = obj2[key];
      }
    });

    return result;
  }
};

export default reduxUtils;
