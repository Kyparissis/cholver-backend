// Import dependencies
const http = require("http");
const test = require("ava");
const listen = require("test-listen");
const got = require("got");
const app = require("../../index.js");

// Import function to be tested
const { userUserIDPUT } = require("../../service/UserService.js");

// Before each test, start the server and save the connection information  (host/port).
// Also, create a `got` instance with the server URL already set.
test.before(async (t) => {
  t.context.server = http.createServer(app);
  t.context.prefixUrl = await listen(t.context.server);
  t.context.got = got.extend({
    prefixUrl: t.context.prefixUrl,
    responseType: "json",
  });
});

// After each test, close the server connection.
test.after.always((t) => {
  t.context.server.close();
});


//___________PUT/user/{userID}______________

// Test PUT user information by calling the function
test("PUT user information | calling the function should work successfully", async (t) => {
  // Define parameters
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

  // Call the function
  const result = await userUserIDPUT(body, userID);

  // ASSERTIONS
  // Assert that we get the expected body
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

// Test PUT user information by sending a PUT request to the server
test("PUT user information | endpoint should work successfully", async (t) => {
  // Define parameters
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

  // Send PUT request to server
  const { body, statusCode } = await t.context.got.put(`user/${userID}`, {
    json: requestBody,
  });

  // ASSERTIONS
  // Assert success status code
  t.is(statusCode, 200);
  // Assert that we get the expected body
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

// Test PUT user information by sending a PUT request to the server with userDescription as integer
test("PUT user information | endpoint should error if userDescription is integer", async (t) => {
  // Define parameters
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

  // Send PUT request to server
  const error = await t.throwsAsync(async () => {
    await t.context.got.put(`user/${userID}`, { json: putBody }),
      { instanceof: got.HTTPError };
  });

  // ASSERTIONS
  // Assert error status code
  t.is(error.response.statusCode, 400);
  // Assert error message
  t.is(error.response.body.message, "request.body.userDescription should be string");
});

// Test PUT user information by sending a PUT request to the server with gender being null
test("PUT user information | endpoint should error if gender is null", async (t) => {
  // Define parameters
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

  // Send PUT request to server
  const error = await t.throwsAsync(async () => {
    await t.context.got.put(`user/${userID}`, { json: putBody }),
      { instanceof: got.HTTPError };
  });

  // ASSERTIONS
  // Assert error status code
  t.is(error.response.statusCode, 400);
  // Assert error message
  t.is(error.response.body.message, "request.body.gender should be string");
});

// Test PUT user information by sending a PUT request to the server with request body not being undefined
test("PUT user information | endpoint should error if request body is missing", async (t) => {
  // Define parameters
  const userID = 1;

  // Send PUT request to server
  const error = await t.throwsAsync(async () => {
    await t.context.got.put(`user/${userID}`), { instanceof: got.HTTPError };
  });

  // ASSERTIONS
  // Assert error status code
  t.is(error.response.statusCode, 415);
  // Assert error message
  t.is(error.response.body.message, "unsupported media type undefined");
});

// Test PUT user information by sending a PUT request to the server with multiple fullnames given in request body
test("PUT user information | endpoint should error if multiple fullnames given", async (t) => {
  // Define parameters
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

  // Send PUT request to server
  const error = await t.throwsAsync(async () => {
    await t.context.got.put(`user/${userID}`, { json: body }),
      { instanceof: got.HTTPError };
  });

  // ASSERTIONS
  // Assert error status code
  t.is(error.response.statusCode, 400);
  // Assert error message
  t.is(error.response.body.message, "request.body.fullname should be string");
});

// Test PUT user information by sending a PUT request to the server with userDescription, city and fullname being integers
test("PUT user information | endpoint should error if userDescription, city and fullname are integers", async (t) => {
  // Define parameters
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

  // Send PUT request to server
  const error = await t.throwsAsync(async () => {
    await t.context.got.put(`user/${userID}`, { json: putBody }),
      { instanceof: got.HTTPError };
  });

  // ASSERTIONS
  // Assert error status code
  t.is(error.response.statusCode, 400);
  // Assert error message
  t.is(
    error.response.body.message,
    "request.body.fullname should be string, request.body.city should be string, request.body.userDescription should be string",
  );
});

// Test PUT user information by sending a PUT request to the server with gender being null and rating being string
test("PUT user information | endpoint should error if gender is null and rating is string", async (t) => {
  // Define parameters
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

  // Send PUT request to server
  const error = await t.throwsAsync(async () => {
    await t.context.got.put(`user/${userID}`, { json: putBody }),
      { instanceof: got.HTTPError };
  });

  // ASSERTIONS
  // Assert error status code
  t.is(error.response.statusCode, 400);
  // Assert error message
  t.is(
    error.response.body.message,
    "request.body.gender should be string, request.body.rating should be integer",
  );
});

// Test PUT user information by sending a PUT request to the server with multiple fullnames and ratings given
test("PUT user information | endpoint should error if multiple fullnames and ratings are given", async (t) => {
  // Define parameters
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

  // Send PUT request to server
  const error = await t.throwsAsync(async () => {
    await t.context.got.put(`user/${userID}`, { json: body }),
      { instanceof: got.HTTPError };
  });

  // ASSERTIONS
  // Assert error status code
  t.is(error.response.statusCode, 400);
  // Assert error message
  t.is(
    error.response.body.message,
    "request.body.fullname should be string, request.body.rating should be integer",
  );
});