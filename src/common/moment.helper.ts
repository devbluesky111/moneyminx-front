import moment from 'moment';

export const getMonthYear = (inputDate?: any) => moment(inputDate).format('MMM YYYY');

export const getRelativeDate = (inputDate: string) => moment(inputDate).fromNow();

export const getISOString = <T>(inputDate: T) => moment(inputDate).toISOString();

export const isAfter = <T, D>(inputDate: T, valDate?: D) => moment(inputDate).isAfter(valDate);

export const getDate = <T>(inputDate: T) => new Date(moment(inputDate).format('yyyy-MM-DD')).toISOString();
