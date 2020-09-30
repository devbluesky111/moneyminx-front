import { curMonthYearStr } from 'common/moment.helper';

describe('Moment helper', () => {
  test.only('Get Current Month Year Format', () => {
    const expected = 'Sep 2020';
    const today = new Date('2020-09-28');

    expect(curMonthYearStr(today)).toBe(expected);
  });
});
