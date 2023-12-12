const http = require('http');
const test = require('ava');
const listen = require('test-listen');
const got = require('got');
const app = require('../index.js');
const { userPOST, userUserIDGET } = require('../service/UserService.js');


// Initializaiton of Server

test.before(async t => {
  t.context.server = http.createServer(app);
  t.context.prefixUrl = await listen(t.context.server);
  t.context.got = got.extend({ prefixUrl: t.context.prefixUrl, responseType: 'json' });
});

test.after.always(t => {
  t.context.server.close();
});





// Tests for Endpoint: POST/user

// Server Tests

test('userPOST function works successfully', async t => {
  const body = { fullname: "Fullname", email: "email@gmail.com", age: 22, city: "City", phone: "Phone", userDescription: "Description", gender: "Gender", profilePic: "ProfilePic" };
  const result = await userPOST(body);
  t.pass();
});

test('POST/user responds with status code 200', async t => {
    const { body, statusCode } = await t.context.got.post(`user`, {
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ fullname: "Fullname", email: "email@gmail.com", age: 22, city: "City", phone: "Phone", userDescription: "Description", gender: "Gender", profilePic: "ProfilePic" }),
  });
  t.is(statusCode, 200);
});

// Undefined Request Body (400)

test('POST/user responds with status code 400 if fullname is not a string', async t => {
    const body = { fullname: 3243234323432, email: "email@gmail.com", age: 22, city: "City", phone: "Phone", userDescription: "Description", gender: "Gender", profilePic: "ProfilePic" };
    const error = await t.throwsAsync(async () => {
    await t.context.got.post(`user`, { json: body });
  });
  t.is(error.response.statusCode, 400);
  t.is(error.response.body.message, 'request.body.fullname should be string');
});

test('POST/user responds with status code 400 if email is not a string', async t => {
  const body = { fullname: "Fullname", email: 987567, age: 22, city: "City", phone: "Phone", userDescription: "Description", gender: "Gender", profilePic: "ProfilePic" };
  const error = await t.throwsAsync(async () => {
  await t.context.got.post(`user`, { json: body });
});
t.is(error.response.statusCode, 400);
t.is(error.response.body.message, 'request.body.email should be string');
});

test('POST/user responds with status code 400 if age is not an integer', async t => {
  const body = { fullname: "Fullname", email: "email@gmail.com", age: "Twenty Two", city: "City", phone: "Phone", userDescription: "Description", gender: "Gender", profilePic: "ProfilePic" };
  const error = await t.throwsAsync(async () => {
  await t.context.got.post(`user`, { json: body });
});
t.is(error.response.statusCode, 400);
t.is(error.response.body.message, 'request.body.age should be integer');
});

test('POST/user responds with status code 400 if phone is not a string', async t => {
  const body = { fullname: "Fullname", email: "email@gmail.com", age: 22, city: "City", phone: 6954789046, userDescription: "Description", gender: "Gender", profilePic: "ProfilePic" };
  const error = await t.throwsAsync(async () => {
  await t.context.got.post(`user`, { json: body });
});
t.is(error.response.statusCode, 400);
t.is(error.response.body.message, 'request.body.phone should be string');
});

test('POST/user responds status code 400 if undefined request body is given (gender = null)', async t => {
    const requestBody = { 
      fullname: "string", 
      email: "string", 
      age: 0,
      city: "string", 
      phone: "string", 
      userDescription :"string", 
      gender: null,  
      profilePic: "string"
  };
  
  const error = await t.throwsAsync(async () => {
    await t.context.got.post(`user/`, {json: requestBody}),
        {instanceof: got.HTTPError}
    });

  t.is(error.response.statusCode, 400);
  t.is(error.response.body.message, 'request.body.gender should be string');
});


// Missing Request Body (415)

test('POST user information | Missing request body', async t => {
  const userID = 1;
  const error = await t.throwsAsync(async () => {
    await t.context.got.put(`user/${userID}`),
        {instanceof: got.HTTPError}
    });
  
  t.is(error.response.statusCode, 415);
  t.is(error.response.body.message, 'unsupported media type undefined');
});








// Tests for Endpoint: GET/user/{userID}

// Server Tests

test('userUserIDGET function works successfully', async t => {
    const userId = 0;
    const result = await userUserIDGET(userId);
    const randUser = result;
    t.is(randUser.userDescription , "userDescription");
    t.is(randUser.gender , "gender");
    t.is(randUser.city , "city");
    t.is(randUser.phone , "phone");
    t.is(randUser.profilePic , "");
    t.is(randUser.rating , 1);
    t.is(randUser.fullname , "fullname");
    t.is(randUser.userID , 0);
    t.is(randUser.email , "email");
    t.is(randUser.age , 6);
  });


  test('GET/user/{userID} responds with status code 200', async t => {
    const userId = 0;
    const { body, statusCode } = await t.context.got.get(`user/${userId}`);         
    t.is(statusCode, 200);
    const randUser = body;
    t.is(randUser.userDescription , "userDescription");
    t.is(randUser.gender , "gender");
    t.is(randUser.city , "city");
    t.is(randUser.phone , "phone");
    t.is(randUser.profilePic , "");
    t.is(randUser.rating , 1);
    t.is(randUser.fullname , "fullname");
    t.is(randUser.userID , 0);
    t.is(randUser.email , "email");
    t.is(randUser.age , 6);
  });
  
