// Import the dependencies for testing
const http = require("http");
const test = require("ava");
const listen = require("test-listen");
const got = require("got");
const app = require("../../index.js");

// Import functions from UserService that we want to test
const { userUserIDDELETE } = require("../../service/UserService.js");

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

// Test Delete User by calling the function
test("DELETE User | calling the function should work successfully", async (t) => {
  // Define parameters
  const userId = 1;

  // Call the function
  const user = await userUserIDDELETE(userId);

  // ASSERTIONS
  // Assert that we get the expected body
  t.is(user.userDescription, "userDescription");
  t.is(user.gender, "gender");
  t.is(user.city, "city");
  t.is(user.phone, "phone");
  t.is(user.profilePic, "");
  t.is(user.rating, 1);
  t.is(user.fullname, "fullname");
  t.is(user.userID, 0);
  t.is(user.email, "email");
  t.is(user.age, 6);
});

// Test Delete User by sending a DELETE request to the server
test("Delete User | endpoint should work successfully", async (t) => {
  // Define parameters
  const userId = 1;

  // Send DELETE request to server
  const { body, statusCode } = await t.context.got.delete(`user/${userId}`);

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