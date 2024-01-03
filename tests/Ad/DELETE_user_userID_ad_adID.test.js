// Import the dependencies for testing
const http = require("http");
const test = require("ava");
const listen = require("test-listen");
const got = require("got");

// Import the server
const app = require("../../index.js");

// Import functions from AdService that we want to test
const {
  userUserIDAdAdIDDELETE,
} = require("../../service/AdService.js");

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

//---------DELETE /user/{userid}/ad/{adid}---------


// Test case for deleting an ad from user account
test("DELETE an ad from user account | calling the function should work successfully", async (t) => {
  // Define parameters
  const userID = 6;
  const adID = 0;

  // Call userUserIDAdAdIDDELETE function to delete an ad from user account
  await userUserIDAdAdIDDELETE(userID, adID);

  // If the function is called successfully, the test passes
  t.pass();
});

// Test case for making a HTTP request
test("DELETE an ad from user account | endpoint should work successfully", async (t) => {
  // Define parameters
  const userID = 6;
  const adID = 0;

  // Send DELETE request to server
  const { body, statusCode } = await t.context.got.delete(
    `user/${userID}/ad/${adID}`,
  );

  // ASSERTIONS
  // Assert success status code
  t.is(statusCode, 200);
  // Assert that we get the expected body length
  t.is(Object.keys(body).length, 0);
});
