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



// -=-=-=-=-=-=-=-=-= POST user/{userID}/ad -=-=-=-=-=-=-=-=-=

// Test POST a new ad (by calling the function)
test("POST a new ad | calling the function should work successfully", async (t) => {
  // Define path parameters
  const userID = 6;
  const body = {
    title: "string",
    adDescription: "string",
  };
  // Call the function
  const result = await userUserIDAdPOST(body, userID);
  // Assert that we get the expected body length
  t.is(Object.keys(result).length, 1);
  // Assert that we get the expected body
  t.is(result.message, "message");
});

// Test POST a new ad (by sending a POST request to the server)
test("POST a new ad | endpoint should work successfully", async (t) => {
  // Define path parameters
  const userID = 6;
  const postBody = {
    title: "string",
    adDescription: "string",
  };
  // Send POST request to server
  const { body, statusCode } = await t.context.got.post(`user/${userID}/ad`, {
    json: postBody,
  });
  // Assert success status code
  t.is(statusCode, 200);
  // Assert that we get the expected body length
  t.is(Object.keys(body).length, 1);
  // Assert that we get the expected body
  t.is(body.message, "message");
});

// Test POST a new ad | Integer in title in request body (by sending a POST request to the server)
test("POST a new ad | endpoint should error if title is integer", async (t) => {
  // Define path parameters
  const userID = 6;
  const postBody = {
    title: 313131231,
    adDescription: "string",
  };
  // Send POST request to server
  const error = await t.throwsAsync(async () => {
    await t.context.got.post(`user/${userID}/ad`, { json: postBody }),
      { instanceof: got.HTTPError };
  });
  // Assert error status code
  t.is(error.response.statusCode, 400);
  // Assert error message
  t.is(error.response.body.message, "request.body.title should be string");
});

// Test POST a new ad | Integer in adDescription in request body (by sending a POST request to the server)
test("POST a new ad | endpoint should error if adDescription is integer", async (t) => {
  // Define path parameters
  const userID = 6;
  const postBody = {
    title: "string",
    adDescription: 31313123131,
  };
  // Send POST request to server
  const error = await t.throwsAsync(async () => {
    await t.context.got.post(`user/${userID}/ad`, { json: postBody }),
      { instanceof: got.HTTPError };
  });
  // Assert error status code
  t.is(error.response.statusCode, 400);
  // Assert error message
  t.is(
    error.response.body.message,
    "request.body.adDescription should be string",
  );
});

// Test POST a new ad | Integer in adDescription,title in request body (by sending a POST request to the server)
test("POST a new ad | endpoint should error if adDescription and title are integers", async (t) => {
  // Define path parameters
  const userID = 6;
  const postBody = {
    title: 131312313131,
    adDescription: 31313123131,
  };
  // Send POST request to server
  const error = await t.throwsAsync(async () => {
    await t.context.got.post(`user/${userID}/ad`, { json: postBody }),
      { instanceof: got.HTTPError };
  });
  // Assert error status code
  t.is(error.response.statusCode, 400);
  // Assert error message
  t.is(
    error.response.body.message,
    "request.body.title should be string, request.body.adDescription should be string",
  );
});

test("POST a new ad | endpoint should error if content type is not JSON", async (t) => {
  // Define path parameters
  const userID = 6;
  const postBody = {
    title: "string",
    adDescription: "string",
  };
  // Send POST request to server
  const error = await t.throwsAsync(async () => {
    await t.context.got.post(`user/${userID}/ad`, { body: JSON.stringify(postBody) }),
      { instanceof: got.HTTPError };
  });
  // Assert error status code
  t.is(error.response.statusCode, 415);
  // Assert error message
  t.is(error.response.body.message, "unsupported media type undefined");
});

// Test POST a new ad | Multiple titles in request body (by sending a POST request to the server)
test("POST a new ad | endpoint should error if multiple titles are present", async (t) => {
  // Define path parameters
  const userID = 6;
  const postBody = {
    title: ["string", "string2"],
    adDescription: "string",
  };
  // Send POST request to server
  const error = await t.throwsAsync(async () => {
    await t.context.got.post(`user/${userID}/ad`, { json: postBody }),
      { instanceof: got.HTTPError };
  });
  // Assert error status code
  t.is(error.response.statusCode, 400);
  // Assert error message
  t.is(error.response.body.message, "request.body.title should be string");
});

// Test POST a new ad | Multiple titles, adDescriptions in request body (by sending a POST request to the server)
test("POST a new ad | endpoint should error if multiple titles and adDescriptions are present", async (t) => {
  // Define path parameters
  const userID = 6;
  const postBody = {
    title: ["string", "string2"],
    adDescription: ["string", "string2"],
  };
  // Send POST request to server
  const error = await t.throwsAsync(async () => {
    await t.context.got.post(`user/${userID}/ad`, { json: postBody }),
      { instanceof: got.HTTPError };
  });
  // Assert error status code
  t.is(error.response.statusCode, 400);
  // Assert error message
  t.is(
    error.response.body.message,
    "request.body.title should be string, request.body.adDescription should be string",
  );
});

// Test POST a new ad | Multiple adDescriptions in request body (by sending a POST request to the server)
test("POST a new ad | endpoint should error if multiple adDescriptions are present", async (t) => {
  // Define path parameters
  const userID = 6;
  const postBody = {
    title: "string",
    adDescription: ["string", "string2"],
  };
  // Send POST request to server
  const error = await t.throwsAsync(async () => {
    await t.context.got.post(`user/${userID}/ad`, { json: postBody }),
      { instanceof: got.HTTPError };
  });
  // Assert error status code
  t.is(error.response.statusCode, 400);
  // Assert error message
  t.is(
    error.response.body.message,
    "request.body.adDescription should be string",
  );
});

test("POST a new ad | endpoint should error if no request body is passed", async (t) => {
  // Define path parameters
  const userID = 6;
  // Send POST request to server
  const error = await t.throwsAsync(async () => {
    await t.context.got.post(`user/${userID}/ad`),
      { instanceof: got.HTTPError };
  });
  // Assert error status code
  t.is(error.response.statusCode, 415);
  // Assert error message
  t.is(error.response.body.message, "unsupported media type undefined");
});

// Test POST a new ad | No request body (by sending a POST request to the server)
test("POST a new ad | endpoint should error if body is undefined", async (t) => {
  // Define path parameters
  const userID = 6;
  // Send POST request to server
  const error = await t.throwsAsync(async () => {
    await t.context.got.post(`user/${userID}/ad`, { json: undefined }),
      { instanceof: got.HTTPError };
  });
  // Assert error status code
  t.is(error.response.statusCode, 415);
  // Assert error message
  t.is(error.response.body.message, "unsupported media type undefined");
});

test("POST a new ad | endpoint should error if title is null", async (t) => {
  // Define path parameters
  const userID = 6;
  const postBody = {
    title: null,
    adDescription: "string",
  };
  // Send POST request to server
  const error = await t.throwsAsync(async () => {
    await t.context.got.post(`user/${userID}/ad`, { json: postBody }),
      { instanceof: got.HTTPError };
  });
  // Assert error status code
  t.is(error.response.statusCode, 400);
  // Assert error message
  t.is(error.response.body.message, "request.body.title should be string");
});

test("POST a new ad | endpoint should error if request body is an array", async (t) => {
  // Define path parameters
  const userID = 6;
  const postBody = [
    {
      title: "string",
      adDescription: "string",
    },
    {
      title: "string",
      adDescription: "string",
    },
  ];
  // Send POST request to server
  const error = await t.throwsAsync(async () => {
    await t.context.got.post(`user/${userID}/ad`, { json: postBody }),
      { instanceof: got.HTTPError };
  });
  // Assert error status code
  t.is(error.response.statusCode, 400);
  // Assert error message
  t.is(error.response.body.message, "request.body should be object");
});