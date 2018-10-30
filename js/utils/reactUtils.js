const reactUtils = {
  defaultPropsFunc() {
    debugger;
    console.warn(
      'something went wrong. default func is used instead of action func'
    );
  },
  normalizeDate(dateString) {
    const dateObj = new Date(dateString);

    let date = dateObj.getDate();
    if (date < 10) {
      date = `0${date}`;
    }

    let month = dateObj.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }

    const year = dateObj.getFullYear();

    return `${date}-${month}-${year}`;
  },
  getAgeFromDate(birthday) {
    const diff = Date.now() - new Date(birthday);
    const age = Math.floor(diff / 31557600000); // 1000*60*60*24*365.25

    return String(age);
  }
};

export default reactUtils;
