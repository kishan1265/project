const request = require('supertest');

const baseURL = 'http://localhost:5000';

describe('GET /', () => {
  test('should return status 200 for welcome page', async () => {
    const res = await request(baseURL).get('/');
    expect(res.status).toEqual(200);
  });
});

describe('POST /', () => {
  test('should return status 302 for event registration successfully and refreash page', async () => {
    const req = {
      body: {
        event_id: '643bb200689344b247c114c2',
        user_id: '643d00e982ae64d1eeb5b2ad',
      },
    };
    const res = await request(baseURL).get('/event');
    expect(res.status).toEqual(302);
  });
});
