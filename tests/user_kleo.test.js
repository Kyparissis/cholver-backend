const http = require('http');
const test = require('ava');
const listen = require('test-listen');
const got = require('got');
const app = require('../index.js');
const { userGET , userUserIDPUT } = require('../service/UserService.js');

//______Initializaiton of Server___________
test.before(async t => {
  t.context.server = http.createServer(app);
  t.context.prefixUrl = await listen(t.context.server);
  t.context.got = got.extend({ prefixUrl: t.context.prefixUrl, responseType: 'json' });
});

test.after.always(t => {
  t.context.server.close();
});
//_________________________________________


//_________GET/user_________________________
//Test function
test('GET users by keyword function works successfully', async t => {
  const keyword = "John"; //???????
  const result = await userGET(keyword);
  const randUser = result[0]; // de ksero an me afto iponoo oti tha prepe na valo kapoio test gia to length
  t.pass();

  t.true(result.every(user => user.fullname.includes(keyword) || user.userDescription.includes(keyword)));

  t.is(randUser.userDescription , "userDescription");
  t.is(randUser.gender , "gender");
  t.is(randUser.city , "city");
  t.is(randUser.phone , "phone");
  t.is(randUser.profilePic , "");
  t.is(randUser.rating , "rating");
  t.is(randUser.fullname , "fullname");
  t.is(randUser.userID , "1");
  t.is(randUser.email , "email");
  t.is(randUser.age , "age");
}); 


//Test Server
test('GET users by keyword responds with status code 200', async t => {
  const keyword = "K"; //???????
  /// sooos na allaksei apo kato got get?? oi put pados
  const { body, statusCode } = await t.context.got.get(`user`, {
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({userDescription: "descr" , gender: "" , city: "" ,phone: "" , profilePic: "" , rating: 1 , fullname: "" , userID:1 , email: "" , age:25 })
  });
  t.is(statusCode, 200);

  //const result = await userGET(keyword); theoro mallon einai lathos gt exei sinartisi kai tetsartoume server
  const randUser = body[0];
  
  t.is(randUser.userDescription , "userDescription");
  t.is(randUser.gender , "gender");
  t.is(randUser.city , "city");
  t.is(randUser.phone , "phone");
  t.is(randUser.profilePic , "");
  t.is(randUser.rating , "rating");
  t.is(randUser.fullname , "fullname");
  t.is(randUser.userID , "1");
  t.is(randUser.email , "email");
  t.is(randUser.age , "age");

});


// Testing unhappy paths
// 1. Wrong data type of keyword (400)
test('Handle incorrect data type in userId', async t => {
    const keyword = 3; // keyword is integer instead of string
    const error = await t.throwsAsync(async () => {
     await t.context.got.get(`user/`);
    });
    
    t.is(statusCode, 400);
    t.true(body.error.includes('Invalid data type for userId'));
  });


//___________PUT/user/{userID}______________
//Test function
test('PUT (Update) user information function works successfully', async t => {
  const userId = 1;
  const body = { 
    "userDescription" :"string", 
    "gender": "string",
    "city": "string", 
    "phone": "string", 
    "profilePic": "string", 
    "rating": "integer", 
    "fullname": "string", 
    "userID": "integer", 
    "email": "string", 
    "age": "integer"
  };
  const result = await userUserIDPUT(body, userID);// paizei rolo i seira sta orismata
  const randUser = result[0];
  t.pass();
  t.is(randUser.userDescription , "userDescription");
  t.is(randUser.gender , "gender");
  t.is(randUser.city , "city");
  t.is(randUser.phone , "phone");
  t.is(randUser.profilePic , "");
  t.is(randUser.rating , "rating");
  t.is(randUser.fullname , "fullname");
  t.is(randUser.userID , "1");
  t.is(randUser.email , "email");
  t.is(randUser.age , "age");
});


//Test Server
test('PUT (Update) user information', async t => {
  const userId = 1;
  const requestBody = { 
    "userDescription": "string", 
    "gender": "string",
    "city": "string", 
    "phone": "string", 
    "profilePic": "string", 
    "rating": "integer", 
    "fullname": "string", 
    "userID": "integer", 
    "email": "string", 
    "age": "integer"
  };

  //SOS mou petage error "message": "Cannot redeclare block-scoped variable 'body'.", kai allaksa pano 
  //onoma metavlitis se requestBody. Alla an pao na allakso kai sto {body , statuscode } to ksanaemfanizei
  const { body, statusCode } = await t.context.got.put(`user/${userId}`, {
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({userDescription: "descr" , gender: "" , city: "" ,phone: "" , profilePic: "" , rating: 1 , fullname: "" , userID:1 , email: "" , age:25 })
  });
  t.is(statusCode, 200);

  const randUser = body[0];
  
  t.is(randUser.userDescription , "userDescription");
  t.is(randUser.gender , "gender");
  t.is(randUser.city , "city");
  t.is(randUser.phone , "phone");
  t.is(randUser.profilePic , "");
  t.is(randUser.rating , "rating");
  t.is(randUser.fullname , "fullname");
  t.is(randUser.userID , "1");
  t.is(randUser.email , "email");
  t.is(randUser.age , "age");
});


// Testing unhappy paths
// 1. undefined request body (415)
test('PUT (Update) user information responds status code 415 if undefined request body is given', async t => {
  const userId = 1;
  const body = { 
    "userDescription" :"string", 
    "gender": "null",  // gender is null
    "city": "string", 
    "phone": "string", 
    "profilePic": "string", 
    "rating": "integer", 
    "fullname": "string", 
    "userID": "integer", 
    "email": "string", 
    "age": "integer"
  };
  const error = await t.throwsAsync(async () => {
    await t.context.got.put(`user/${userId}`, {json: requestBody}),
        {instanceof: got.HTTPError}
    });
  
  t.is(error.response.statusCode, 415);
  t.is(error.response.body.message, 'unsupported media type undefined');
});

// 2. Missing request body (415)
test('PUT user information | undefined request body is given', async t => {
    const userId = 1;
    const error = await t.throwsAsync(async () => {
      await t.context.got.put(`user/${userId}`, {json: requestBody}),
          {instanceof: got.HTTPError}
      });
    
    t.is(error.response.statusCode, 415);
    t.is(error.response.body.message, 'unsupported media type undefined');
  });

// 3. Multiple times fullname given in request body (400)
test('PUT user information | undefined request body is given', async t => {
    const userId = 1;
    const body = { 
        "userDescription" :"string", 
        "gender": "null",  
        "city": "string", 
        "phone": "string", 
        "profilePic": "string", 
        "rating": "integer", 
        "fullname": ["string", "newstring"] , //ex. 2 given fullnames
        "userID" : "integer", 
        "email": "string", 
        "age": "integer"
      };
    const error = await t.throwsAsync(async () => {
      await t.context.got.put(`user/${userId}`, {json: requestBody}),  // not sure an edo thelei putBody i request Body
          {instanceof: got.HTTPError}
      });
    
    t.is(error.response.statusCode, 400);
    t.is(error.response.body.message, 'Multiple information for fullname');
  });


