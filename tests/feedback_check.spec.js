const request = require('supertest');
const Feedback = require('../models/Feedback'); // assuming you have a Feedback model defined in a separate file

const baseURL = 'https://programming-club-daiict.up.railway.app/';

describe('POST /feedback', () => {
  beforeEach(() => {
    jest.resetAllMocks(); // reset any mock functions before each test
  });

  test('should create a new feedback entry when given valid input', async () => {
    const body = {
      title: 'Test Feedback',
      feedback: 'This is a test feedback',
    };
    const user = {
      email: '202001265@daiict.ac.in',
      name: 'kishan sangani',
    };

    const saveMock = jest.spyOn(Feedback.prototype, 'save');

    const res = await request(baseURL)
      .post('/feedback')
      .send(body)
      .set('Cookie', [
        `connect.sid=test; email=${user.email}; name=${user.name}`,
      ]);

    expect(res.status).toBe(302);
    expect(saveMock).toHaveBeenCalled();
    expect(saveMock.mock.calls[0][0]).toMatchObject({
      title: body.title,
      email: user.email,
      name: user.name,
      feedback: body.feedback,
    });
  });
});

//   test('should return an error message when given invalid input', async () => {
//     const feedback = {
//       title: '',
//       feedback: '',
//     };
//     const errors = [{ msg: 'Please enter all fields' }];

//     const res = await request(baseURL).post('/feedback').send(feedback);

//     //const renderMock = jest.spyOn(res, 'render');
//     const renderMock = jest.replaceProperty(res, 'render', jest.fn());

//     expect(res.status).toBe(200);
//     expect(renderMock).toHaveBeenCalledWith('user_feedback', {
//       errors,
//       title: feedback.title,
//       feedback: feedback.feedback,
//     });
//   });
// });
