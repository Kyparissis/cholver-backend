// Import the dependencies for testing
const http = require("http");
const test = require("ava");
const listen = require("test-listen");
const got = require("got");
const app = require("../../index.js");

// Import functions from UserService that we want to test
const { userGET } = require("../../service/UserService.js");

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

// Test GET Users by keyword by calling the function
test("GET users by keyword | calling the function should work successfully", async (t) => {
  // Define parameters
  const keyword = "keyword";

  // Call the function
  const result = await userGET(keyword);

  // ASSERTIONS
  // Assert that we get the expected body
  const randUser = result[1];
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

// Test GET Users by keyword by sending a GET request to the server
test("GET users by keyword | endpoint should work successfully", async (t) => {
  // Define parameters
  const keyword = "keyword";

  // Send GET request to server
  const { body, statusCode } = await t.context.got.get(
    `user?keyword=${keyword}`,
  );

  // ASSERTIONS
  // Assert success status code
  t.is(statusCode, 200);
  // Assert that we get the expected body
  const randUser = body[0];
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

// Test GET Users by keyword by sending a GET request to the server with a null keyword
test("GET users by keyword | endpoint should error if keyword is null", async (t) => {
  // Define parameters
  const keyword = null; // keyword is integer instead of string

  // Send GET request to server
  const error = await t.throwsAsync(async () => {
    await t.context.got.get("user", {
      searchParams: {
        keyword: keyword,
      },
    }),
      { instanceof: got.HTTPError };
  });

  // ASSERTIONS
  // Assert that we we get the error code
  t.is(error.response.statusCode, 400);
  // Assert that we get the expected error message
  t.is(error.response.body.message, "Empty value found for query parameter 'keyword'");
});