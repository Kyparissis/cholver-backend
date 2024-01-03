// Import the dependencies for testing
const http = require("http");
const test = require("ava");
const listen = require("test-listen");
const got = require("got");
const app = require("../../index.js");

// Import functions from RatingService that we want to test
const { userUserIDRatePUT } = require("../../service/RatingService.js");

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

// Test PUT Rate User by calling the function
test("PUT Rate User | calling the function should work successfully", async (t) => {
  // Define parameters
  const body = { 
    raterUserID: 3, 
    rating: 2 };
  const userId = 1;

  // Call the function
  await userUserIDRatePUT(body, userId);

  // ASSERTIONS
  t.pass();
});

// Test PUT Rate User by sending a PUT request to the server
test("PUT Rate User | endpoint should work successfully", async (t) => {
  // Define parameters
  const userId = 1;

  // Send PUT request to server
  const { statusCode } = await t.context.got.put(`user/${userId}/rate`, {
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ raterUserID: 3, rating: 2 }),
  });

  // ASSERTIONS
  // Assert success status code
  t.is(statusCode, 200);
});

// Test PUT Rate User by sending a PUT request to the server with invalid content type
test("PUT Rate User | endpoint should error if content type is not json", async (t) => {
  // Define parameters
  const userId = 1;

  // Send PUT request to server
  const error = await t.throwsAsync(async () => {
    await t.context.got.put(`user/${userId}/rate`, {
      body: JSON.stringify({ raterUserID: 3, rating: 2 }),
    });
  });

  // ASSERTIONS
  // Assert error status code
  t.is(error.response.statusCode, 415);
  // Assert error message
  t.is(error.response.body.message, "unsupported media type undefined");
});
