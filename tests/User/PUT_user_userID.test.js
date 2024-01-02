const http = require("http");
const test = require("ava");
const listen = require("test-listen");
const got = require("got");
const app = require("../../index.js");
const {
  userUserIDPUT,
} = require("../../service/UserService.js");

test.before(async (t) => {
  t.context.server = http.createServer(app);
  t.context.prefixUrl = await listen(t.context.server);
  t.context.got = got.extend({
    prefixUrl: t.context.prefixUrl,
    responseType: "json",
  });
});

test.after.always((t) => {
  t.context.server.close();
});


//___________PUT/user/{userID}______________
//Test function
test("PUT user information | calling the function should work successfully", async (t) => {
  const userID = 1;
  const body = {
    userDescription: "string",
    gender: "string",
    city: "string",
    phone: "string",
    profilePic: "string",
    rating: 1,
    fullname: "string",
    userID: 0,
    email: "string",
    age: 6,
  };
  const result = await userUserIDPUT(body, userID);

  t.is(result.userDescription, "userDescription");
  t.is(result.gender, "gender");
  t.is(result.city, "city");
  t.is(result.phone, "phone");
  t.is(result.profilePic, "");
  t.is(result.rating, 1);
  t.is(result.fullname, "fullname");
  t.is(result.userID, 0);
  t.is(result.email, "email");
  t.is(result.age, 6);
});

//Test Server
test("PUT user information | endpoint should work successfully", async (t) => {
  const userID = 1;
  const requestBody = {
    userDescription: "string",
    gender: "string",
    city: "string",
    phone: "string",
    profilePic: "string",
    rating: 1,
    fullname: "string",
    userID: 1,
    email: "string",
    age: 1,
  };

  const { body, statusCode } = await t.context.got.put(`user/${userID}`, {
    json: requestBody,
  });

  t.is(statusCode, 200);


  t.is(body.userDescription, "userDescription");
  t.is(body.gender, "gender");
  t.is(body.city, "city");
  t.is(body.phone, "phone");
  t.is(body.profilePic, "");
  t.is(body.rating, 1);
  t.is(body.fullname, "fullname");
  t.is(body.userID, 0);
  t.is(body.email, "email");
  t.is(body.age, 6);
});

// Testing unhappy paths
// 1. undefined request body (400)
test("PUT user information | endpoint should error if userDescription is integer", async (t) => {
  const userID = 1;
  const putBody = {
    userDescription: 12345, // it is integer instead of string
    gender: "string",
    city: "string",
    phone: "string",
    profilePic: "string",
    rating: 1,
    fullname: "string",
    userID: 0,
    email: "string",
    age: 6,
  };

  const error = await t.throwsAsync(async () => {
    await t.context.got.put(`user/${userID}`, { json: putBody }),
      { instanceof: got.HTTPError };
  });

  t.is(error.response.statusCode, 400);
  t.is(
    error.response.body.message,
    "request.body.userDescription should be string",
  );
});

// 2. undefined request body (400)
test("PUT user information | endpoint should error if gender is null", async (t) => {
  const userID = 1;
  const putBody = {
    userDescription: "12345",
    gender: null, // gender is null
    city: "string",
    phone: "string",
    profilePic: "string",
    rating: 1,
    fullname: "string",
    userID: 0,
    email: "string",
    age: 6,
  };

  const error = await t.throwsAsync(async () => {
    await t.context.got.put(`user/${userID}`, { json: putBody }),
      { instanceof: got.HTTPError };
  });

  t.is(error.response.statusCode, 400);
  t.is(error.response.body.message, "request.body.gender should be string");
});

// 3. Missing request body (415)
test("PUT user information | endpoint should error if request body is missing", async (t) => {
  const userID = 1;
  const error = await t.throwsAsync(async () => {
    await t.context.got.put(`user/${userID}`), { instanceof: got.HTTPError };
  });

  t.is(error.response.statusCode, 415);
  t.is(error.response.body.message, "unsupported media type undefined");
});

// 4. Multiple times fullname given in request body (400)
test("PUT user information | endpoint should error if multiple fullnames given", async (t) => {
  const userID = 1;
  const body = {
    userDescription: "string",
    gender: "string",
    city: "string",
    phone: "string",
    profilePic: "string",
    rating: 1,
    fullname: ["string", "newstring"], //ex. 2 given fullnames
    userID: 0,
    email: "string",
    age: 6,
  };
  const error = await t.throwsAsync(async () => {
    await t.context.got.put(`user/${userID}`, { json: body }),
      { instanceof: got.HTTPError };
  });

  t.is(error.response.statusCode, 400);
  t.is(error.response.body.message, "request.body.fullname should be string");
});

// 5. undefined request body (400)
test("PUT user information | endpoint should error if userDescription, city and fullname are integers", async (t) => {
  const userID = 1;
  const putBody = {
    userDescription: 12345, // it is integer instead of string
    gender: "string",
    city: 12345,
    phone: "string",
    profilePic: "string",
    rating: 1,
    fullname: 12345,
    userID: 0,
    email: "string",
    age: 6,
  };

  const error = await t.throwsAsync(async () => {
    await t.context.got.put(`user/${userID}`, { json: putBody }),
      { instanceof: got.HTTPError };
  });

  t.is(error.response.statusCode, 400);
  t.is(
    error.response.body.message,
    "request.body.fullname should be string, request.body.city should be string, request.body.userDescription should be string",
  );
});

// 6. undefined request body (400)
test("PUT user information | endpoint should error if gender is null and rating is string", async (t) => {
  const userID = 1;
  const putBody = {
    userDescription: "12345",
    gender: null, // gender is null
    city: "string",
    phone: "string",
    profilePic: "string",
    rating: "1",
    fullname: "string",
    userID: 0,
    email: "string",
    age: 6,
  };

  const error = await t.throwsAsync(async () => {
    await t.context.got.put(`user/${userID}`, { json: putBody }),
      { instanceof: got.HTTPError };
  });

  t.is(error.response.statusCode, 400);
  t.is(
    error.response.body.message,
    "request.body.gender should be string, request.body.rating should be integer",
  );
});

// 7. Multiple times fullname and rating given in request body (400)
test("PUT user information | endpoint should error if multiple fullnames and ratings are given", async (t) => {
  const userID = 1;
  const body = {
    userDescription: "string",
    gender: "string",
    city: "string",
    phone: "string",
    profilePic: "string",
    rating: [1, 2],
    fullname: ["string", "newstring"], //ex. 2 given fullnames
    userID: 0,
    email: "string",
    age: 6,
  };
  const error = await t.throwsAsync(async () => {
    await t.context.got.put(`user/${userID}`, { json: body }),
      { instanceof: got.HTTPError };
  });

  t.is(error.response.statusCode, 400);
  t.is(
    error.response.body.message,
    "request.body.fullname should be string, request.body.rating should be integer",
  );
});