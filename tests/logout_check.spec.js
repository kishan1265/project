const request = require('supertest');

const baseURL = 'https://programming-club-daiict.up.railway.app/';

describe('Logging out', () => {
  test('should redirect to login page when user clicks logout button', async () => {
    const res = await request(baseURL).get('users/logout');
    expect(res.status).toEqual(302);
    expect(res.headers.location).toEqual('/');
  });
});
