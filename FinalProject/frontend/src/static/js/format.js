
export default {
  getFormattedDate: (date) => {
    let parsedDate = new Date(date);
    return [parsedDate.getMonth() < 10 ? '0' + parsedDate.getMonth() : parsedDate.getMonth(),
            '/',
            parsedDate.getDate() < 10 ? '0' + parsedDate.getDate() : parsedDate.getDate(),
            ' ',
            parsedDate.getHours() < 10 ? '0' + parsedDate.getHours() : parsedDate.getHours(),
            ':',
            parsedDate.getMinutes() < 10 ? '0' + parsedDate.getMinutes() : parsedDate.getMinutes(),].join('');
            //TODO: Add AM or PM
  }
}