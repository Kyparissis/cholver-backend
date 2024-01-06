// Import dependencies for testing
const http = require("http");
const test = require("ava");
const listen = require("test-listen");
const got = require("got");
const app = require("../../index.js");

// Import functions from UserService that we want to test
const { userUserIDProfile_picturePUT } = require("../../service/UserService.js");

// Import function to help with creating form data
const { getFormDataDetails } = require('../../utils/formDataUtils.js');

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

// Test Upload Profile Picture by calling the function
test("Upload Profile Picture | calling the function should work successfully", async (t) => {
  // Define parameters
  const userId = 1;

  // Call the function
  const response = await userUserIDProfile_picturePUT(userId);

  // ASSERTIONS
  // Assert that we get the expected body
  t.is(response.message, "Picture uploaded successfully");
});

// Test Upload Profile Picture by sending a PUT request to the server
test("Upload Profile Picture | endpoint should work successfully", async (t) => {
  // Define parameters
  const userId = 1;

  // Create form data to upload image
  const { requestBody, requestHeaders } = getFormDataDetails({
    formDataFieldName: 'file',
    fileContent: 'example content',
    fileName: 'profilePicture.png',
  });

  // Send PUT request to server
  const { body, statusCode } = await t.context.got.put(`user/${userId}/profile-picture`, {
    body: requestBody,
    headers: requestHeaders,
  });

  // ASSERTIONS
  // Assert success status code
  t.is(statusCode, 200);
  // Assert that we get the expected body
  t.is(body.message, "Picture uploaded successfully");
});

// Test Upload Profile Picture by sending a PUT request to the server with empty content type
// The server should return an error when the the request has no content type
test("Upload Profile Picture | endpoint should error if no file is passed", async (t) => {
  // Define parameters
  const userId = 1;

  // Send PUT request to server
  const error = await t.throwsAsync(async () => {
    await t.context.got.put(`user/${userId}/profile-picture`);
  });

  // ASSERTIONS
  // Assert error status code
  t.is(error.response.statusCode, 415);
  // Assert error message
  t.is(error.response.body.message, "unsupported media type undefined");
});