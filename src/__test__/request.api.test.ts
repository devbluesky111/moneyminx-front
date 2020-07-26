import { restaurantLogin, registerRestaurant } from 'api/request.api';

describe('Request Api test', () => {
  test('Demo Admin login', async () => {
    const payload = {
      email: 'admin@admin.com',
      password: '3MtkS-#Vk?2?Ek3B',
    };
    const res = await restaurantLogin(payload);
    expect(res).not.toBe(undefined);
    expect(res.data).not.toBeFalsy();
  });

  test('Restaurant sign up should work', async () => {
    const payload = {
      name: 'Mero Khaja Ghar',
      email: 'merokhajaghar@gmail.com',
      password: 'password',
    };

    const res = await registerRestaurant(payload);

    expect(res).not.toBe(undefined);
  });
});
