const http = require('http');
const test = require('ava');
const listen = require('test-listen');
const got = require('got');
const app = require('../index.js');
const { userUserIDDELETE, userUserIDProfile_picturePUT } = require('../service/UserService.js');
const { FormData, File } = require('formdata-node');
const { FormDataEncoder } = require('form-data-encoder');
const { Readable } = require('stream');

test.before(async t => {
  t.context.server = http.createServer(app);
  t.context.prefixUrl = await listen(t.context.server);
  t.context.got = got.extend({ prefixUrl: t.context.prefixUrl, responseType: 'json' });
});

test.after.always(t => {
  t.context.server.close();
});

test('Delete User function works successfully', async t => {
  const userId = 1;
  const user = await userUserIDDELETE(userId);
  t.is(user.userDescription, 'userDescription');
  t.is(user.gender, 'gender');
  t.is(user.city, 'city');
  t.is(user.phone, 'phone');
  t.is(user.profilePic, '');
  t.is(user.rating, 1);
  t.is(user.fullname, 'fullname');
  t.is(user.userID, 0);
  t.is(user.email, 'email');
  t.is(user.age, 6);
});

test('Delete User responds with status code 200', async t => {
  const userId = 1;
  const { body, statusCode } = await t.context.got.delete(`user/${userId}`);
  t.is(statusCode, 200);

  t.is(body.userDescription, 'userDescription');
  t.is(body.gender, 'gender');
  t.is(body.city, 'city');
  t.is(body.phone, 'phone');
  t.is(body.profilePic, '');
  t.is(body.rating, 1);
  t.is(body.fullname, 'fullname');
  t.is(body.userID, 0);
  t.is(body.email, 'email');
  t.is(body.age, 6);
});

test('Upload Profile Picture function works successfully', async t => {
  const userId = 1;
  const response = await userUserIDProfile_picturePUT(userId);
  t.is(response.message, 'Picture uploaded successfully');
});

test('Upload Profile Picture responds with status code 200', async t => {
  const userId = 1;

  const formData = new FormData();
  const file = new File(['example content'], 'profilePicture.png');
  formData.set('file', file);

  const encoder = new FormDataEncoder(formData);

  const { body, statusCode } = await t.context.got.put(`user/${userId}/profile-picture`, {
    body: Readable.from(encoder.encode()),
    headers: encoder.headers,
  });
  t.is(statusCode, 200);
  t.is(body.message, 'Picture uploaded successfully');
});

test('Upload Profile Picture responds with status code 415 if no file is passed', async t => {
  const userId = 1;

  const error = await t.throwsAsync(async () => {
    await t.context.got.put(`user/${userId}/profile-picture`);
  });
  t.is(error.response.statusCode, 415);
  t.is(error.response.body.message, 'unsupported media type undefined');
});
