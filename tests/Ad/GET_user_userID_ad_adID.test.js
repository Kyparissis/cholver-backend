// Import the dependencies for testing
const http = require("http");
const test = require("ava");
const listen = require("test-listen");
const got = require("got");

// Import the server
const app = require("../../index.js");

// Import functions from AdService that we want to test
const {
  userUserIDAdGET,
  userUserIDAdAdIDGET,
  userUserIDAdPOST,
  adGET,
  userUserIDAdAdIDDELETE,
  adAdIDPUT,
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


// -=-=-=-=-=-=-=-=-= GET user/{userID}/ad/{adID} -=-=-=-=-=-=-=-=-=

// Test GET the interested users for an ad (by calling the function)
test("GET the interested users for an ad | calling the function should work successfully", async (t) => {
  // Define path parameters
  const userID = 6;
  const adID = 1;
  // Call the function
  const result = await userUserIDAdAdIDGET(userID, adID);
  // Assert that we get two entries (body must be an array)
  t.is(result.length, 2);
  // Get the first of the entries of the body
  const firstProfile = result[0];
  // Assert that we get the expected body
  t.is(firstProfile.userDescription, "userDescription");
  t.is(firstProfile.gender, "gender");
  t.is(firstProfile.phone, "phone");
  t.is(firstProfile.city, "city");
  t.is(firstProfile.profilePic, "");
  t.is(firstProfile.rating, 1);
  t.is(firstProfile.fullname, "fullname");
  t.is(firstProfile.userID, 0);
  t.is(firstProfile.email, "email");
  t.is(firstProfile.age, 6);
});

// Test GET the interested users for an ad (by sending a GET request to the server)
test("GET the interested users for an ad | endpoint should work successfully", async (t) => {
  // Define path parameters
  const userID = 6;
  const adID = 1;
  // Make GET request to server
  const { body, statusCode } = await t.context.got.get(
    `user/${userID}/ad/${adID}`,
  );
  // Assert success status code
  t.is(statusCode, 200);
  // Assert that we get two entries (body must be an array)
  t.is(body.length, 2);
  // Get the first of the entries of the body
  const firstProfile = body[0];
  // Assert that we get the expected body
  t.is(firstProfile.userDescription, "userDescription");
  t.is(firstProfile.gender, "gender");
  t.is(firstProfile.phone, "phone");
  t.is(firstProfile.city, "city");
  t.is(firstProfile.profilePic, "");
  t.is(firstProfile.rating, 1);
  t.is(firstProfile.fullname, "fullname");
  t.is(firstProfile.userID, 0);
  t.is(firstProfile.email, "email");
  t.is(firstProfile.age, 6);
});
