const request = require('supertest');

const baseURL = 'https://programming-club-daiict.up.railway.app';

describe('GET /', () => {
  test('should return status 200 for successfully go to admin login page', async () => {
    const res = await request(baseURL).get('/admin/');
    expect(res.status).toEqual(200);
  });

  test('should return status 302 and redirect to login page(wrong password)', async () => {
    const user = {
      email: '202001265@daiict.ac.in',
      password: 'Kishan@65',
    };

    const res = await request(baseURL).post('/admin/').send(user);
    expect(res.status).toEqual(302);
    expect(res.headers.location).toEqual('/admin/dashboard');
  });

  test('should return status 302 and redirect to admin dashboard', async () => {
    const user = {
      email: '202001265@daiict.ac.in',
      password: 'Kisn@65',
    };

    const res = await request(baseURL).post('/admin/').send(user);
    expect(res.status).toEqual(302);
    expect(res.headers.location).toEqual('/admin/');
  });
});
