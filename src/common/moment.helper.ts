import moment from 'moment';

/**
 *
 * @param inputDate
 * used just for parsing not calculation please
 */
export const getMonthYear = (inputDate?: any) => {
  return moment(inputDate).format('MMM YYYY');
};

export const parseDateFromString = (dateString: string) => {
  if (dateString.includes('Q')) {
    const qDate = moment(dateString, 'Q YYYY').toDate();

    return qDate;
  }

  const myDate = moment(dateString, 'MMM YYYY').toDate();
  return myDate;
};

export const parseUTCString = (str: string, isQuarter?: boolean) => {
  if (isQuarter) {
    return moment.utc(str, 'Q YYYY').local().format('[Q]Q YYYY');
  }

  return moment.utc(str, 'MMM YYYY').local().format('MMM YYYY');
};
export const parseDate = (str: string) => {
  if (str.includes('Q')) {
    return moment.utc(str, 'Q YYYY').toDate();
  }

  return moment.utc(str, 'MMM YYYY').toDate();
};

export const getUTC = <T>(inputDate?: T) => moment.utc(inputDate).toDate();

export const getRelativeDate = (inputDate: string) => moment.utc(inputDate).fromNow();

export const getISOString = <T>(inputDate: T) => moment.utc(inputDate).toISOString();

export const isAfter = <T, D>(inputDate: T, valDate?: D) => moment.utc(inputDate).isAfter(valDate);

export const isBefore = <T, D>(inputDate: T, valDate?: D) => moment.utc(inputDate).isBefore(valDate);

export const getDate = <T>(inputDate: T) => new Date(moment.utc(inputDate).format('yyyy-MM-DD')).toISOString();

export const getQuarter = <T>(inputDate?: T) => moment.utc(inputDate).format('[Q]Q yyyy');

export const getYear = <T>(inputDate?: T) => moment.utc(inputDate).format('yyyy');

export const getStringDate = <T>(inputDate?: T) => moment.utc(inputDate).format('MMM DD, yyyy');

export const getPreviousMonth = <T extends Date | null>(inputDate?: T) => {
  if (inputDate) {
    return moment.utc(inputDate).subtract(1, 'month').toDate();
  }

  return moment.utc().subtract(1, 'month').toDate();
};

export const getNextMonth = <T extends Date | null>(inputDate?: T) => {
  if (inputDate) {
    return moment.utc(inputDate).add(1, 'month').toDate();
  }

  return moment.utc().subtract(1, 'month').toDate();
};

export const getMonthSubtracted = (month: number) => moment.utc().subtract(month, 'month').toDate();

export const getLastDateOfMonth = (date: Date) => moment.utc(date).endOf('month').toDate();
