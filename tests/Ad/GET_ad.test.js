// Import the dependencies for testing
const http = require("http");
const test = require("ava");
const listen = require("test-listen");
const got = require("got");

// Import the server
const app = require("../../index.js");

// Import functions from AdService that we want to test
const {
  adGET,
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



// -------GET /ad---------

// Test GET all ads by calling the function
test("GET all ads | calling the function should work successfully", async (t) => {
  // Call the function adGET without a keyword
  const result = await adGET();

  // ASSERTIONS
  // Assert that the result is an array
  t.true(Array.isArray(result));
  // Assert that we get two entries
  t.is(result.length, 2);
  // Get the second of the entries
  const ad = result[1];
  // Make necessary checks for the body by comparing with the expected values
  t.is(ad.adDescription, "adDescription");
  t.is(ad.date, "date");
  t.is(ad.adID, 0);
  t.is(ad.city, "city");
  t.is(ad.title, "title");
  t.is(ad.userID, 6);
  t.is(ad.user.fullname, "fullname");
});

// Test GET search for ads by keyword by calling the function
test("GET search for ads by keyword | calling the function should work successfully", async (t) => {
  // define a keyword for searching ads
  const keyword = "title"; //dumm keyword cause doesn't exist a database, just to run true
  
  // call the function adGET with the keyword
  const result = await adGET(keyword);

  // ASSERTIONS
  // Assert that the result is an array
  t.true(Array.isArray(result));
  // Assert that all ads in the result match the keyword (customize based on your ad structure)
  t.true(
    result.every(
      (ad) => ad.title.includes(keyword) || ad.adDescription.includes(keyword),
    ),
  );
  // Assert that we get two entries
  t.is(result.length, 2);
  // Get the second of the entries
  const ad = result[1];
  // Make necessary checks for the body by comparing with the expected values
  t.is(ad.adDescription, "adDescription");
  t.is(ad.date, "date");
  t.is(ad.adID, 0);
  t.is(ad.city, "city");
  t.is(ad.title, "title");
  t.is(ad.userID, 6);
  t.is(ad.user.fullname, "fullname");
});

// Test GET all ads by sending a GET request to the server
test("GET all ads | endpoint should work successfully", async (t) => {
  // call server without keyword
  const { body, statusCode } = await t.context.got.get(`ad`);

  // ASSERTIONS
  // Assert success status code
  t.is(statusCode, 200);
  // Assert that we get two entries (body must be an array)
  t.is(body.length, 2);
  // Get the first of the entries of the body
  const firstAd = body[0];
  // Assert that we get the expected body
  t.is(firstAd.adDescription, "adDescription");
  t.is(firstAd.date, "date");
  t.is(firstAd.adID, 0);
  t.is(firstAd.city, "city");
  t.is(firstAd.title, "title");
  t.is(firstAd.userID, 6);
});

// Test GET search ad by keyword by sending a GET request to the server
test("GET search for ads by keyword | endpoint should work successfully", async (t) => {
  // Define parameter
  const keyword = "title";

  // Call server with keyword
  const { body, statusCode } = await t.context.got.get(`ad?keyword=${keyword}`);

  // ASSERTIONS
  // Assert success status code
  t.is(statusCode, 200);
  // Assert that we get two entries (body must be an array)
  t.is(body.length, 2);
  // Get the first of the entries of the body
  const firstAd = body[0];
  // Assert that we get the expected body
  t.is(firstAd.adDescription, "adDescription");
  t.is(firstAd.date, "date");
  t.is(firstAd.adID, 0);
  t.is(firstAd.city, "city");
  t.is(firstAd.title, "title");
  t.is(firstAd.userID, 6);
});

// Test case for searching ads by keyword with null keyword (by sending a HTTP request to the server)
// The keyword should not be null and should be a string always
test("GET search for ads | endpoint should error if keyword is null", async (t) => {
  // define parameter
  const keyword = null;

  // Send GET request to server
  const error = await t.throwsAsync(async () => {
    await t.context.got.get("ad", {
      searchParams: {
        keyword: keyword,
      },
    }),
      { instanceof: got.HTTPError };
  });

  // ASSERTIONS
  // Assert error status code
  t.is(error.response.statusCode, 400);
  // Assert error message
  t.is(error.response.body.message, "Empty value found for query parameter 'keyword'");
});
