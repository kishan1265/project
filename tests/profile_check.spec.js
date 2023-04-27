const request = require('supertest');

const baseURL = 'https://programming-club-daiict.up.railway.app';

describe('GET /', () => {
  test('should return status 302 to redirect login page beacuse user directly not access profile page', async () => {
    const res = await request(baseURL).get('/profile');
    expect(res.status).toEqual(302);
    expect(res.headers.location).toEqual('/users/login');
  });
});
