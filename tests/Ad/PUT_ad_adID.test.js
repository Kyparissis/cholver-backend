// Import the dependencies for testing
const http = require("http");
const test = require("ava");
const listen = require("test-listen");
const got = require("got");

// Import the server
const app = require("../../index.js");

// Import functions from AdService that we want to test
const {
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

// --------- PUT /ad/{adid} ----------

// Show interest in an ad
// Test case for showing interest in an ad by calling the function
test("PUT interest in an ad | calling the function should work successfully", async (t) => {
  // Define parameters
  const adId = 0;

  // define request body for showing interest in an ad
  const requestBody = {
    userID: 0,
  };

  // Call adAdIDPUT function to show interest in an ad
  const result = await adAdIDPUT(requestBody, adId);

  // Assert that the result is an object
  t.true(typeof result === "object");

  // Assert that we get the expected body length
  t.is(Object.keys(result).length, 6);

  // Assert that we get the expected body
  t.is(result.adDescription, "adDescription");
  t.is(result.date, "date");
  t.is(result.adID, adId);
  t.is(result.city, "city");
  t.is(result.title, "title");
  t.is(result.userID, 6);
});

// Test case for making a HTTP request
test("PUT interest in an ad | endpoint should work successfully", async (t) => {
  // Define parameters
  const adId = 0;

  // define request body for showing interest in an ad
  const requestBody = {
    userID: 6,
  };

  //PUT request
  const { body, statusCode } = await t.context.got.put(`ad/${adId}`, {
    json: requestBody,
  });

  // Assert success status code
  t.is(statusCode, 200);
  // Assert that we get the expected body length
  t.is(Object.keys(body).length, 6);

  // Assert that we get the expected body
  t.is(body.adDescription, "adDescription");
  t.is(body.date, "date");
  t.is(body.adID, 0);
  t.is(body.city, "city");
  t.is(body.title, "title");
  t.is(body.userID, 6);
});

// Test case for show interest in ad with undefined request body (by sending a HTTP request to the server)
test("PUT show interest in an ad | endpoint should error if request body is undefined", async (t) => {
  // Define path parameters
  const adId = 0;
  // Send PUT request to server
  const error = await t.throwsAsync(async () => {
    await t.context.got.put(`ad/${adId}`, { json: undefined }),
      { instanceof: got.HTTPError };
  });
  // Assert error status code
  t.is(error.response.statusCode, 415);
  // Assert error message
  t.is(error.response.body.message, "unsupported media type undefined");
});

// Test case for show interest in ad with null request body (by sending a HTTP request to the server)
test("PUT show interest in an ad | endpoint should error if userID is null", async (t) => {
  // Define path parameters
  const adId = 0;
  const requestBody = {
    userID: null,
  };
  // Send PUT request to server
  const error = await t.throwsAsync(async () => {
    await t.context.got.put(`ad/${adId}`, { json: requestBody }),
      { instanceof: got.HTTPError };
  });
  // Assert error status code
  t.is(error.response.statusCode, 400);
  // Assert error message
  t.is(error.response.body.message, "request.body.userID should be integer");
});

// Test case for show interest in ad with string request body (by sending a HTTP request to the server)
test("PUT show interest in an ad | endpoint should error if userID is string", async (t) => {
  // Define path parameters
  const adId = 0;
  const requestBody = {
    userID: "userID1",
  };
  // Send PUT request to server
  const error = await t.throwsAsync(async () => {
    await t.context.got.put(`ad/${adId}`, { json: requestBody }),
      { instanceof: got.HTTPError };
  });
  // Assert error status code
  t.is(error.response.statusCode, 400);
  // Assert error message
  t.is(error.response.body.message, "request.body.userID should be integer");
});

// Test case for show interest in ad with request body / string values in an array (by sending a HTTP request to the server)
test("PUT show interest in an ad | endpoint should error if userID is array of strings", async (t) => {
  // Define path parameters
  const adId = 0;
  const requestBody = {
    userID: ["userID1", "userID2"],
  };
  // Send PUT request to server
  const error = await t.throwsAsync(async () => {
    await t.context.got.put(`ad/${adId}`, { json: requestBody }),
      { instanceof: got.HTTPError };
  });
  // Assert error status code
  t.is(error.response.statusCode, 400);
  // Assert error message
  t.is(error.response.body.message, "request.body.userID should be integer");
});

// Test case for show interest in ad with request body / integer values in an array (by sending a HTTP request to the server)
test("PUT show interest in an ad | endpoint should error if userID is array of integers", async (t) => {
  // Define path parameters
  const adId = 0;
  const requestBody = {
    userID: [2, 3],
  };
  // Send PUT request to server
  const error = await t.throwsAsync(async () => {
    await t.context.got.put(`ad/${adId}`, { json: requestBody }),
      { instanceof: got.HTTPError };
  });
  // Assert error status code
  t.is(error.response.statusCode, 400);
  // Assert error message
  t.is(error.response.body.message, "request.body.userID should be integer");
});

// Test case for show interest in ad with request body (integer and null values in an array) (by sending a HTTP request to the server)
test("PUT show interest in an ad | endpoint should error if userID has string and null", async (t) => {
  // Define path parameters
  const adId = 0;
  const requestBody = {
    userID: ["userID1", null],
  };
  // Send PUT request to server
  const error = await t.throwsAsync(async () => {
    await t.context.got.put(`ad/${adId}`, { json: requestBody }),
      { instanceof: got.HTTPError };
  });
  // Assert error status code
  t.is(error.response.statusCode, 400);
  // Assert error message
  t.is(error.response.body.message, "request.body.userID should be integer");
});

// Test case for show interest in ad with array request body (by sending a HTTP request to the server)
test("PUT show interest in an ad | endpoint should error if body is an array", async (t) => {
  // Define path parameters
  const adId = 0;
  const requestBody = [
    {
      userID: 9,
    },
    {
      userID: 2,
    },
  ];
  // Send PUT request to server
  const error = await t.throwsAsync(async () => {
    await t.context.got.put(`ad/${adId}`, { json: requestBody }),
      { instanceof: got.HTTPError };
  });
  // Assert error status code
  t.is(error.response.statusCode, 400);
  // Assert error message
  t.is(error.response.body.message, "request.body should be object");
});