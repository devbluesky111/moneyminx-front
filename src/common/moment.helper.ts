import moment from 'moment';

export const getMonthYear = (inputDate?: any) => {
  if (inputDate !== undefined) {
    const year = moment.utc(inputDate).format('yyyy');
    const month = moment.utc(inputDate).format('MM');
    const nextMonthDate = new Date(parseInt(year, 10), parseInt(month, 10), 1);

    return moment.utc(nextMonthDate).format('MMM YYYY');
  }

  return moment.utc(inputDate).format('MMM YYYY');
};

export const parseDate = (str: string) => moment.utc(str, 'MMM YYYY').toDate();

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
