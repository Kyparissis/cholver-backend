// Import the dependencies for testing
const http = require('http');
const test = require('ava');
const listen = require('test-listen');
const got = require('got');

// Import the server
const app = require('../index.js');

// Import functions from AdService that we want to test
const { adGET, userUserIDAdAdIDDELETE, adAdIDPUT } = require("../service/AdService.js");

// Before each test, start the server and save the connection information  (host/port).
// Also, create a `got` instance with the server URL already set.
test.before(async (t) => {
    t.context.server = http.createServer(app);
    t.context.prefixUrl = await listen(t.context.server);
    t.context.got = got.extend({ prefixUrl: t.context.prefixUrl, responseType: 'json' });
});

// After each test, close the server connection.
test.after.always((t) => {
    t.context.server.close();
});

//-------GET /ad---------

//Test GET all ads by calling the function
test("GET all ads by function", async t=> {

    //call the function adGET without a keyword
    const result = await adGET();

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
    t.is(ad.user.fullname, "fullname")
});

//Test GET search for ads by keyword by calling the function
test("GET search for ads by keyword by function", async (t) => {

    //define a keyword for searching ads
    const keyword = 'title'; //dumm keyword cause doesn't exist a database, just to run true

    //call the function adGET with the keyword
    const result = await adGET(keyword);

    // Assert that the result is an array
    t.true(Array.isArray(result));

    // Assert that all ads in the result match the keyword (customize based on your ad structure)
    t.true(result.every(ad => ad.title.includes(keyword) || ad.adDescription.includes(keyword)));
   
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
    t.is(ad.user.fullname, "fullname")

});

//Test GET all ads by sending a GET request to the server
test("GET all ads or searching ads by keyword by sending a request", async t =>{
    const { body, statusCode } = await t.context.got.get(`ad`);
    
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

//---------PUT /ad/{adid}----------
//Show interest in an ad
// Test case for showing interest in an ad y calling the function
test('PUT interest in an ad', async (t) => {

    //define parameters
    const adId = 0; 

    // define request body for showing interest in an ad
    //const requestBody = 0; //userId
     const requestBody = {
       "userID": 0
     };

    // Call adAdIDPUT function to show interest in an ad
    const result = await adAdIDPUT(requestBody, adId);

    // Assert that the result is an object
    t.true(typeof result === 'object');

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

//Test case for making a HTTP request
test('PUT interest in an ad - HTTP request', async (t) => {
    //define parameters
    const adId = 0; 

    // define request body for showing interest in an ad
    const requestBody = {
      "userID": 6
    };
    
    //PUT request
    const { body, statusCode } = await t.context.got.put(`ad/${adId}`, {json: requestBody});

    // Assert success status code
    t.is(statusCode, 200);
    // Assert that we get the expected body length
    t.is(Object.keys(body).length, 6); //6???

    // Assert that we get the expected body
    t.is(body.adDescription, "adDescription");
    t.is(body.date, "date");
    t.is(body.adID, adId);
    t.is(body.city, "city");
    t.is(body.title, "title");
    t.is(body.userID, 6);
});

// Test case for show interest in ad with undefined request body (by sending a HTTP request to the server)
test("PUT show interest in an ad with undefined request body", async t => {
    // Define path parameters
    const adId = 0;
    // Send PUT request to server
    const error = await t.throwsAsync(async () => {
        await t.context.got.put(`ad/${adId}`, {json: undefined}),
        { instanceof: got.HTTPError }
    });
    // Assert error status code
    t.is(error.response.statusCode, 415);
    // Assert error message
    t.is(error.response.body.message, "unsupported media type undefined");
});

// Test case for show interest in ad with null request body (by sending a HTTP request to the server)
test("PUT show interest in an ad with null request body", async t => {
    // Define path parameters
    const adId = 0;
    const requestBody ={
        "userID":null
    };
    // Send PUT request to server
    const error = await t.throwsAsync(async () => {
        await t.context.got.put(`ad/${adId}`, {json: requestBody}),
        { instanceof: got.HTTPError }
    });
    // Assert error status code
    t.is(error.response.statusCode, 400);
    // Assert error message
    t.is(error.response.body.message, "request.body.userID should be integer");
});

//---------DELETE /user/{userid}/ad/{adid}---------
// Test case for deleting an ad from user account
test('DELETE an ad from user account', async (t) => {
    //define parameters
    const userID = 6;
    const adID = 0;
    
    // Call userUserIDAdAdIDDELETE function to delete an ad from user account
    await userUserIDAdAdIDDELETE(userID, adID);
  
    // If the function is called successfully, the test passes
    t.pass();
  });
  
// Test case for making a HTTP request 
test('DELETE an ad from user account - HTTP request', async (t) => {
    //define parameters
    const userID = 6;
    const adID = 0;
    
    //Send DELETE request to server
    const { body, statusCode } = await t.context.got.delete(`user/${userID}/ad/${adID}`);
    
    // Assert success status code
    t.is(statusCode, 200);
    // Assert that we get the expected body length
    t.is(Object.keys(body).length, 0);
     
    // If the request is successful, the test passes
    t.pass();
  });