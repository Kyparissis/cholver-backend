// Import the dependencies for testing
const http = require("http");
const test = require("ava");
const listen = require("test-listen");
const got = require("got");
const app = require("../../index.js");

// Import functions from UserService that we want to test
const { userUserIDGET } = require("../../service/UserService.js");

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

// Test GET user by userID by calling the function
test("GET user by userID | calling the function should work successfully", async (t) => {
  // Define parameters
  const userId = 0;

  // Call the function
  const result = await userUserIDGET(userId);

  // ASSERTIONS
  // Assert that we get the expected body
  const randUser = result;
  t.is(randUser.userDescription, "userDescription");
  t.is(randUser.gender, "gender");
  t.is(randUser.city, "city");
  t.is(randUser.phone, "phone");
  t.is(randUser.profilePic, "");
  t.is(randUser.rating, 1);
  t.is(randUser.fullname, "fullname");
  t.is(randUser.userID, 0);
  t.is(randUser.email, "email");
  t.is(randUser.age, 6);
});

// Test GET user by userID by sending a GET request to the server
test("GET user by userID | endpoint should work successfully", async (t) => {
  // Define parameters
  const userId = 0;

  // Send GET request to server
  const { body, statusCode } = await t.context.got.get(`user/${userId}`);

  // ASSERTIONS
  // Assert success status code
  t.is(statusCode, 200);
  // Assert that we get the expected body
  const randUser = body;
  t.is(randUser.userDescription, "userDescription");
  t.is(randUser.gender, "gender");
  t.is(randUser.city, "city");
  t.is(randUser.phone, "phone");
  t.is(randUser.profilePic, "");
  t.is(randUser.rating, 1);
  t.is(randUser.fullname, "fullname");
  t.is(randUser.userID, 0);
  t.is(randUser.email, "email");
  t.is(randUser.age, 6);
});
