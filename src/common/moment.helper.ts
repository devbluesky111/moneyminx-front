import moment from 'moment';

export const curMonthYearStr = (inputDate?: any) => moment(inputDate).format('MMM YYYY');

export const getRelativeDate = (inputDate: string) => moment(inputDate).fromNow();
