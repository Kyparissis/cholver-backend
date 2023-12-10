const http = require('http');
const test = require('ava');
const listen = require('test-listen');
const got = require('got');
const app = require('../index.js');
const { userGET , userUserIDPUT } = require("../service/UserService.js");


//______Initializaiton of Server___________
test.before(async (t) => {
  t.context.server = http.createServer(app);
  t.context.prefixUrl = await listen(t.context.server);
  t.context.got = got.extend({ prefixUrl: t.context.prefixUrl, responseType: 'json' });
});

test.after.always((t) => {
  t.context.server.close();
});


//_________GET/user_________________________
//Test function
test("GET users by keyword (function)", async (t) => {
  const keyword = 'keyword'; 
  const result = await userGET(keyword);
  const randUser = result[1]; 
 
 // t.true(result.every(user => user.fullname.includes(keyword) || user.userDescription.includes(keyword)));

// console.log(typeof randUser.userID);

  t.is(randUser.userDescription , "userDescription");
  t.is(randUser.gender , "gender");
  t.is(randUser.city , "city");
  t.is(randUser.phone , "phone");
  t.is(randUser.profilePic , "");
  t.is(randUser.rating, 1);
  t.is(randUser.fullname , "fullname");
  t.is(randUser.userID , 0);
  t.is(randUser.email , "email");
  t.is(randUser.age , 6 );
}); 


//Test Server
test('GET users by keyword (status code 200)', async t => {
  const keyword = 'keyword'; 
  const { body, statusCode } = await t.context.got.get(`user?keyword=${keyword}`);

  t.is(statusCode, 200);

  const randUser = body[0];
  
  t.is(randUser.userDescription, "userDescription");
  t.is(randUser.gender, "gender");
  t.is(randUser.city, "city");
  t.is(randUser.phone, "phone");
  t.is(randUser.profilePic, "");
  t.is(randUser.rating, 1);
  t.is(randUser.fullname , "fullname");
  t.is(randUser.userID, 0);
  t.is(randUser.email, "email");
  t.is(randUser.age, 6);
});


// Testing unhappy paths
// 1. Wrong data type of keyword (400)
test('GET users by keyword | Keyword is null', async (t) => {
    const keyword = null; // keyword is integer instead of string
    const error = await t.throwsAsync(async () => {
     await t.context.got.get("user", { searchParams: {
        keyword: keyword
    } }),
    { instanceof: got.HTTPError }
    });

    t.is(error.response.statusCode, 400);
    t.is(error.response.body.message, "Empty value found for query parameter \'keyword\'");   
});


//___________PUT/user/{userID}______________
//Test function
test('PUT user information (function)', async (t) => {
  const userID = 1;
  const body = { 
    userDescription :"string", 
    gender: "string",
    city : "string", 
    phone : "string", 
    profilePic: "string", 
    rating: 1, 
    fullname: "string", 
    userID : 0, 
    email : "string", 
    age : 6
  };
  const result = await userUserIDPUT(body, userID);

  t.is(result.userDescription , "userDescription");
  t.is(result.gender , "gender");
  t.is(result.city , "city");
  t.is(result.phone , "phone");
  t.is(result.profilePic , "");
  t.is(result.rating , 1);
  t.is(result.fullname , "fullname");
  t.is(result.userID , 0);
  t.is(result.email , "email");
  t.is(result.age , 6);
});


//Test Server
test('PUT user information (status code 200)', async t => {
  const userID = 1;
  const requestBody = { 
    userDescription: "string", 
    gender: "string",
    city: "string", 
    phone: "string", 
    profilePic: "string", 
    rating: 1 , 
    fullname: "string", 
    userID: 1, 
    email: "string", 
    age: 1
  };

  const { body, statusCode } = await t.context.got.put(`user/${userID}`,  {json: requestBody});
    
  t.is(statusCode, 200);

  const randUser = body[0];
  
   t.is(body.userDescription , "userDescription");
   t.is(body.gender , "gender");
   t.is(body.city , "city");
   t.is(body.phone , "phone");
   t.is(body.profilePic , "");
   t.is(body.rating , 1);
   t.is(body.fullname , "fullname");
   t.is(body.userID , 0);
   t.is(body.email , "email");
   t.is(body.age , 6);

});


// Testing unhappy paths
// 1. undefined request body (400)
test('PUT user information | Undefined request body (userDescription is integer)', async t => {
  const userID = 1;
  const putBody = { 
    "userDescription" : 12345, // it is integer instead of string
    "gender": "string",  
    "city": "string", 
    "phone": "string", 
    "profilePic": "string", 
    "rating": 1, 
    "fullname": "string", 
    "userID": 0, 
    "email": "string", 
    "age": 6
  };
  
  const error = await t.throwsAsync(async () => {
        await t.context.got.put(`user/${userID}`, {json: putBody}),
        { instanceof: got.HTTPError }
    });

  t.is(error.response.statusCode, 400);
  t.is(error.response.body.message, 'request.body.userDescription should be string');
  
});


// 2. undefined request body (400)
test('PUT user information | Undefined request body (gender is null)', async t => {
    const userID = 1;
    const putBody = { 
      "userDescription" : "12345", 
      "gender": null,  // gender is null
      "city": "string", 
      "phone": "string", 
      "profilePic": "string", 
      "rating": 1, 
      "fullname": "string", 
      "userID": 0, 
      "email": "string", 
      "age": 6
    };
    
    const error = await t.throwsAsync(async () => {
          await t.context.got.put(`user/${userID}`, {json: putBody}),
          { instanceof: got.HTTPError }
      });
  
    t.is(error.response.statusCode, 400);
    t.is(error.response.body.message, 'request.body.gender should be string');
});
  

// 3. Missing request body (415)
test('PUT user information | Missing request body', async t => {
    const userID = 1;
    const error = await t.throwsAsync(async () => {
      await t.context.got.put(`user/${userID}`),
          {instanceof: got.HTTPError}
      });
    
    t.is(error.response.statusCode, 415);
    t.is(error.response.body.message, 'unsupported media type undefined');
});


// 4. Multiple times fullname given in request body (400)
test('PUT user information | undefined request body - multiple fullnames given', async t => {
    const userID = 1;
    const body = { 
        "userDescription" :"string", 
        "gender": "string",  
        "city": "string", 
        "phone": "string", 
        "profilePic": "string", 
        "rating": 1, 
        "fullname": ["string", "newstring"] ,       //ex. 2 given fullnames
        "userID" : 0, 
        "email": "string", 
        "age": 6
      };
    const error = await t.throwsAsync(async () => {
      await t.context.got.put(`user/${userID}`, {json: body}),  
          {instanceof: got.HTTPError}
      });
    
    t.is(error.response.statusCode, 400);
    t.is(error.response.body.message, 'request.body.fullname should be string');
});


// 5. undefined request body (400)
test('PUT user information | Undefined request body (userDescription,city and fullname are integer)', async t => {
    const userID = 1;
    const putBody = { 
      "userDescription" : 12345, // it is integer instead of string
      "gender": "string",  
      "city": 12345, 
      "phone": "string", 
      "profilePic": "string", 
      "rating": 1, 
      "fullname": 12345, 
      "userID": 0, 
      "email": "string", 
      "age": 6
    };
    
    const error = await t.throwsAsync(async () => {
          await t.context.got.put(`user/${userID}`, {json: putBody}),
          { instanceof: got.HTTPError }
      });
  
    t.is(error.response.statusCode, 400);
    t.is(error.response.body.message, 'request.body.fullname should be string, request.body.city should be string, request.body.userDescription should be string');
    
  });
  
 
// 6. undefined request body (400)
test('PUT user information | Undefined request body (gender is null and rating is string)', async t => {
    const userID = 1;
    const putBody = { 
      "userDescription" : "12345", 
      "gender": null,  // gender is null
      "city": "string", 
      "phone": "string", 
      "profilePic": "string", 
      "rating": "1", 
      "fullname": "string", 
      "userID": 0, 
      "email": "string", 
      "age": 6
    };
    
    const error = await t.throwsAsync(async () => {
          await t.context.got.put(`user/${userID}`, {json: putBody}),
          { instanceof: got.HTTPError }
      });
  
    t.is(error.response.statusCode, 400);
    t.is(error.response.body.message, 'request.body.gender should be string, request.body.rating should be integer');
});
  

// 7. Multiple times fullname and rating given in request body (400)
test('PUT user information | undefined request body - multiple fullnames given and ratings', async t => {
    const userID = 1;
    const body = { 
        "userDescription" :"string", 
        "gender": "string",  
        "city": "string", 
        "phone": "string", 
        "profilePic": "string", 
        "rating": [ 1, 2], 
        "fullname": ["string", "newstring"] ,       //ex. 2 given fullnames
        "userID" : 0, 
        "email": "string", 
        "age": 6
      };
    const error = await t.throwsAsync(async () => {
      await t.context.got.put(`user/${userID}`, {json: body}),  
          {instanceof: got.HTTPError}
      });
    
    t.is(error.response.statusCode, 400);
    t.is(error.response.body.message, 'request.body.fullname should be string, request.body.rating should be integer');
});
