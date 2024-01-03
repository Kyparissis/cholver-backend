// Importing Dependencies
const http = require("http");
const test = require("ava");
const listen = require("test-listen");
const got = require("got");
const app = require("../../index.js");

// Import functions from UserService that we want to test
const { userPOST } = require("../../service/UserService.js");

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

// Test POST user by calling the function
test("POST user | calling the function should work successfully", async (t) => {
  // Define parameters
  const body = {
    fullname: "Fullname",
    email: "email@gmail.com",
    age: 22,
    city: "City",
    phone: "Phone",
    userDescription: "Description",
    gender: "Gender",
    profilePic: "ProfilePic",
  };
  
  // Call the function
  await userPOST(body);

  // ASSERTIONS
  t.pass();
});

// Test POST user by sending a POST request to the server
test("POST user | endpoint should work successfully", async (t) => {
  // Send POST request to server
  const { statusCode } = await t.context.got.post(`user`, {
    // Define request body
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      fullname: "Fullname",
      email: "email@gmail.com",
      age: 22,
      city: "City",
      phone: "Phone",
      userDescription: "Description",
      gender: "Gender",
      profilePic: "ProfilePic",
    }),
  });

  // ASSERTIONS
  // Assert success status code
  t.is(statusCode, 200);
});

// Test POST user by sending a POST request to the server with invalid full name
test("POST user | endpoint should error if fullname is not a string", async (t) => {
  // Define request body
  const body = {
    fullname: 3243234323432,
    email: "email@gmail.com",
    age: 22,
    city: "City",
    phone: "Phone",
    userDescription: "Description",
    gender: "Gender",
    profilePic: "ProfilePic",
  };

  // Send POST request to server
  const error = await t.throwsAsync(async () => {
    await t.context.got.post(`user`, { json: body });
  });
  
  // ASSERTIONS
  // Assert error status code
  t.is(error.response.statusCode, 400);
  // Assert error message
  t.is(error.response.body.message, "request.body.fullname should be string");
});

// Test POST user by sending a POST request to the server with invalid email
test("POST user | endpoint should error if email is not a string", async (t) => {
  // Define request body
  const body = {
    fullname: "Fullname",
    email: 987567,
    age: 22,
    city: "City",
    phone: "Phone",
    userDescription: "Description",
    gender: "Gender",
    profilePic: "ProfilePic",
  };

  // Send POST request to server
  const error = await t.throwsAsync(async () => {
    await t.context.got.post(`user`, { json: body });
  });

  // ASSERTIONS
  // Assert error status code
  t.is(error.response.statusCode, 400);
  // Assert error message
  t.is(error.response.body.message, "request.body.email should be string");
});

// Test POST user by sending a POST request to the server with invalid age
test("POST user | endpoint should error if age is not an integer", async (t) => {
  // Define request body
  const body = {
    fullname: "Fullname",
    email: "email@gmail.com",
    age: "Twenty Two",
    city: "City",
    phone: "Phone",
    userDescription: "Description",
    gender: "Gender",
    profilePic: "ProfilePic",
  };

  // Send POST request to server
  const error = await t.throwsAsync(async () => {
    await t.context.got.post(`user`, { json: body });
  });

  // ASSERTIONS
  // Assert error status code
  t.is(error.response.statusCode, 400);
  // Assert error message
  t.is(error.response.body.message, "request.body.age should be integer");
});

// Test POST user by sending a POST request to the server with invalid phone
test("POST user | endpoint should error if phone is not a string", async (t) => {
  // Define request body
  const body = {
    fullname: "Fullname",
    email: "email@gmail.com",
    age: 22,
    city: "City",
    phone: 6954789046,
    userDescription: "Description",
    gender: "Gender",
    profilePic: "ProfilePic",
  };

  // Send POST request to server
  const error = await t.throwsAsync(async () => {
    await t.context.got.post(`user`, { json: body });
  });

  // ASSERTIONS
  // Assert error status code
  t.is(error.response.statusCode, 400);
  // Assert error message
  t.is(error.response.body.message, "request.body.phone should be string");
});

// Test POST user by sending a POST request to the server with gender being null
test("POST user | endpoint should error if gender is null", async (t) => {
  // Define request body
  const requestBody = {
    fullname: "string",
    email: "string",
    age: 0,
    city: "string",
    phone: "string",
    userDescription: "string",
    gender: null,
    profilePic: "string",
  };

  // Send POST request to server
  const error = await t.throwsAsync(async () => {
    await t.context.got.post(`user/`, { json: requestBody }),
      { instanceof: got.HTTPError };
  });

  // ASSERTIONS
  // Assert error status code
  t.is(error.response.statusCode, 400);
  // Assert error message
  t.is(error.response.body.message, "request.body.gender should be string");
});