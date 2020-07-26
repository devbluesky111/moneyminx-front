import env from 'app/app.env';
describe('Http Api Test', () => {
  test('base url is defined', () => {
    expect(env.BASE_URL).not.toBe(undefined);
    expect(env.BASE_URL).toBe('http://localhost:5000/v1');
  });
});
