// Import the dependencies for testing
const http = require('http');
const test = require('ava');
const listen = require('test-listen');
const got = require('got');

// Import the server
const app = require('../index.js');

// Import functions from AdService that we want to test
const { userUserIDAdGET, userUserIDAdAdIDGET, userUserIDAdPOST,
        adGET, userUserIDAdAdIDDELETE, adAdIDPUT } = require("../service/AdService.js");

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


// -=-=-=-=-=-=-=-=-= GET user/{userID}/ad -=-=-=-=-=-=-=-=-=


// Test GET all ads from specific user (by calling the function)
test("GET all ads from specific user by function", async t => {
    // Define path parameters
    const userID = 6; 
    // Call the function 
    const result = await userUserIDAdGET(userID);
    // Assert that we get two entries
    t.is(result.length, 2);
    // Get the first of the entries
    const firstAd = result[0];
    // Make necessary checks for the body by comparing with the expected values
    t.is(firstAd.adDescription, "adDescription");
    t.is(firstAd.date, "date");
    t.is(firstAd.adID, 0);
    t.is(firstAd.city, "city");
    t.is(firstAd.title, "title");
    t.is(firstAd.userID, 6);
});

// Test GET all ads from specific user (by sending a GET request to the server)
test("GET all ads from specific user", async t => {
    // Define path parameters
    const userID = 6;
    // Make GET request to server
    const { body, statusCode } = await t.context.got.get(`user/${userID}/ad`);
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


// -=-=-=-=-=-=-=-=-= GET user/{userID}/ad/{adID} -=-=-=-=-=-=-=-=-=


// Test GET the interested users for an ad (by calling the function)
test("GET the interested users for an ad by function", async t => {
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
test("GET the interested users for an ad", async t => {
    // Define path parameters
    const userID = 6;
    const adID = 1;
    // Make GET request to server
    const { body, statusCode } = await t.context.got.get(`user/${userID}/ad/${adID}`);
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


// -=-=-=-=-=-=-=-=-= POST user/{userID}/ad -=-=-=-=-=-=-=-=-=


// Test POST a new ad (by calling the function)
test("POST a new ad by function", async t => {
    // Define path parameters
    const userID = 6;
    const body = {
        "title": "string",
        "adDescription": "string"
    };
    // Call the function
    const result = await userUserIDAdPOST(body, userID);
    // Assert that we get the expected body length
    t.is(Object.keys(result).length, 1);
    // Assert that we get the expected body
    t.is(result.message, "message"); 
});

// Test POST a new ad (by sending a POST request to the server)
test("POST a new ad", async t => {
    // Define path parameters
    const userID = 6;
    const postBody = {
        "title": "string",
        "adDescription": "string"
    };
    // Send POST request to server
    const { body, statusCode } = await t.context.got.post(`user/${userID}/ad`, {json: postBody});
    // Assert success status code
    t.is(statusCode, 200);
    // Assert that we get the expected body length
    t.is(Object.keys(body).length, 1);
    // Assert that we get the expected body
    t.is(body.message, "message");
});

// Test POST a new ad | Integer in title in request body (by sending a POST request to the server)
test("POST a new ad | Integer in title in request body", async t => {
    // Define path parameters
    const userID = 6;
    const postBody = {
        "title": 313131231,
        "adDescription": "string"
    };
    // Send POST request to server
    const error = await t.throwsAsync(async () => {
        await t.context.got.post(`user/${userID}/ad`, {json: postBody}),
        { instanceof: got.HTTPError }
    });
    // Assert error status code
    t.is(error.response.statusCode, 400);
    // Assert error message
    t.is(error.response.body.message, "request.body.title should be string");
});

// Test POST a new ad | Integer in adDescription in request body (by sending a POST request to the server)
test("POST a new ad | Integer in adDescription in request body", async t => {
    // Define path parameters
    const userID = 6;
    const postBody = {
        "title": "string",
        "adDescription": 31313123131
    };
    // Send POST request to server
    const error = await t.throwsAsync(async () => {
        await t.context.got.post(`user/${userID}/ad`, {json: postBody}),
        { instanceof: got.HTTPError }
    });
    // Assert error status code
    t.is(error.response.statusCode, 400);
    // Assert error message
    t.is(error.response.body.message, "request.body.adDescription should be string");
});

// Test POST a new ad | Integer in adDescription,title in request body (by sending a POST request to the server)
test("POST a new ad | Integer in adDescription,title in request body", async t => {
    // Define path parameters
    const userID = 6;
    const postBody = {
        "title": 131312313131,
        "adDescription": 31313123131
    };
    // Send POST request to server
    const error = await t.throwsAsync(async () => {
        await t.context.got.post(`user/${userID}/ad`, {json: postBody}),
        { instanceof: got.HTTPError }
    });
    // Assert error status code
    t.is(error.response.statusCode, 400);
    // Assert error message
    t.is(error.response.body.message, "request.body.title should be string, request.body.adDescription should be string");
});

// Test POST a new ad | Integer in adDescription,title in request body (by sending a POST request to the server)
test("POST a new ad | Request body isn't JSON", async t => {
    // Define path parameters
    const userID = 6;
    const postBody = {
        "title": "string",
        "adDescription": "string"
    };
    // Send POST request to server
    const error = await t.throwsAsync(async () => {
        await t.context.got.post(`user/${userID}/ad`, {postBody}),
        { instanceof: got.HTTPError }
    });
    // Assert error status code
    t.is(error.response.statusCode, 415);
    // Assert error message
    t.is(error.response.body.message, "unsupported media type undefined");
});

// Test POST a new ad | Multiple titles in request body (by sending a POST request to the server)
test("POST a new ad | Multiple titles in request body", async t => {
    // Define path parameters
    const userID = 6;
    const postBody = {
        "title": ["string", "string2"],
        "adDescription": "string",
    };
    // Send POST request to server
    const error = await t.throwsAsync(async () => {
        await t.context.got.post(`user/${userID}/ad`, {json: postBody}),
        { instanceof: got.HTTPError }
    });
    // Assert error status code
    t.is(error.response.statusCode, 400);
    // Assert error message
    t.is(error.response.body.message, "request.body.title should be string");
});

// Test POST a new ad | Multiple titles, adDescriptions in request body (by sending a POST request to the server)
test("POST a new ad | Multiple titles, adDescriptions in request body", async t => {
    // Define path parameters
    const userID = 6;
    const postBody = {
        "title": ["string", "string2"],
        "adDescription": ["string", "string2"],
    };
    // Send POST request to server
    const error = await t.throwsAsync(async () => {
        await t.context.got.post(`user/${userID}/ad`, {json: postBody}),
        { instanceof: got.HTTPError }
    });
    // Assert error status code
    t.is(error.response.statusCode, 400);
    // Assert error message
    t.is(error.response.body.message, "request.body.title should be string, request.body.adDescription should be string");
});

// Test POST a new ad | Multiple adDescriptions in request body (by sending a POST request to the server)
test("POST a new ad | Multiple adDescriptions in request body", async t => {
    // Define path parameters
    const userID = 6;
    const postBody = {
        "title": "string",
        "adDescription": ["string", "string2"],
    };
    // Send POST request to server
    const error = await t.throwsAsync(async () => {
        await t.context.got.post(`user/${userID}/ad`, {json: postBody}),
        { instanceof: got.HTTPError }
    });
    // Assert error status code
    t.is(error.response.statusCode, 400);
    // Assert error message
    t.is(error.response.body.message, "request.body.adDescription should be string");
});

// Test POST a new ad | Multiple adDescriptions in request body (by sending a POST request to the server)
test("POST a new ad | No request body", async t => {
    // Define path parameters
    const userID = 6;
    // Send POST request to server
    const error = await t.throwsAsync(async () => {
        await t.context.got.post(`user/${userID}/ad`),
        { instanceof: got.HTTPError }
    });
    // Assert error status code
    t.is(error.response.statusCode, 415);
    // Assert error message
    t.is(error.response.body.message, "unsupported media type undefined");
});

// Test POST a new ad | No request body (by sending a POST request to the server)
test("POST a new ad | Undefined as request body", async t => {
    // Define path parameters
    const userID = 6;
    // Send POST request to server
    const error = await t.throwsAsync(async () => {
        await t.context.got.post(`user/${userID}/ad`, {json: undefined}),
        { instanceof: got.HTTPError }
    });
    // Assert error status code
    t.is(error.response.statusCode, 415);
    // Assert error message
    t.is(error.response.body.message, "unsupported media type undefined");
});

// Test POST a new ad | No request body (by sending a POST request to the server)
test("POST a new ad | Null title in request body", async t => {
    // Define path parameters
    const userID = 6;
    const postBody = {
        "title": null,
        "adDescription": "string"
    };
    // Send POST request to server
    const error = await t.throwsAsync(async () => {
        await t.context.got.post(`user/${userID}/ad`, {json: postBody}),
        { instanceof: got.HTTPError }
    });
    // Assert error status code
    t.is(error.response.statusCode, 400);
    // Assert error message
    t.is(error.response.body.message, "request.body.title should be string");
});

// Test POST a new ad | Null adDescription in request body (by sending a POST request to the server)
test("POST a new ad | Array of correct bodies request body", async t => {
    // Define path parameters
    const userID = 6;
    const postBody = [{
        "title": "string",
        "adDescription": "string"
    },{
        "title": "string",
        "adDescription": "string"
    }];
    // Send POST request to server
    const error = await t.throwsAsync(async () => {
        await t.context.got.post(`user/${userID}/ad`, {json: postBody}),
        { instanceof: got.HTTPError }
    });
    // Assert error status code
    t.is(error.response.statusCode, 400);
    // Assert error message
    t.is(error.response.body.message, "request.body should be object");
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
test("GET all ads by sending a HTTP request", async t =>{
    //call server without keyword
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

//Test GET search ad by keyword by sending a GET request to the server
test("GET searching ads by keyword by sending a HTTP request", async t =>{
    //define parameter
    const keyword = 'title'; 
    //call server with keyword
    const { body, statusCode } = await t.context.got.get(`ad?keyword=${keyword}`);
    
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

//Test case for searching ads by keyword with null keyword (by sending a HTTP request to the server)
test("GET searching ads by null keyword by sending a HTTP request", async t =>{
    //define parameter
    const keyword = null;
    
    // Send GET request to server
    const error = await t.throwsAsync(async () => {
        await t.context.got.get("ad", { searchParams: {
            keyword: keyword
        } }),
        { instanceof: got.HTTPError }
    });
    // Assert error status code
    t.is(error.response.statusCode, 400);
    // Assert error message
    t.is(error.response.body.message, "Empty value found for query parameter \'keyword\'");
});

//---------PUT /ad/{adid}----------
//Show interest in an ad
// Test case for showing interest in an ad by calling the function
test('PUT interest in an ad', async (t) => {

    //define parameters
    const adId = 0; 

    // define request body for showing interest in an ad
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

// Test case for show interest in ad with string request body (by sending a HTTP request to the server)
test("PUT show interest in an ad with string request body", async t => {
    // Define path parameters
    const adId = 0;
    const requestBody ={
        "userID": 'userID1'
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

// Test case for show interest in ad with request body / string values in an array (by sending a HTTP request to the server)
test("PUT show interest in an ad with request body  / string values in an array ", async t => {
    // Define path parameters
    const adId = 0;
    const requestBody ={
        "userID": ['userID1', 'userID2']
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

// Test case for show interest in ad with request body / integer values in an array (by sending a HTTP request to the server)
test("PUT show interest in an ad with request body / integer values in an array ", async t => {
    // Define path parameters
    const adId = 0;
    const requestBody ={
        "userID": [2, 3]
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

// Test case for show interest in ad with request body (integer and null values in an array) (by sending a HTTP request to the server)
test("PUT show interest in an ad with request body (integer and null values in an array)", async t => {
    // Define path parameters
    const adId = 0;
    const requestBody ={
        "userID": ['userID1', null]
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

// Test case for show interest in ad with array request body (by sending a HTTP request to the server)
test("PUT show interest in an ad with array request body ", async t => {
    // Define path parameters
    const adId = 0;
    const requestBody =[{
        "userID": 9}, 
        {
        "userID": 2
        }];
    // Send PUT request to server
    const error = await t.throwsAsync(async () => {
        await t.context.got.put(`ad/${adId}`, {json: requestBody}),
        { instanceof: got.HTTPError }
    });
    // Assert error status code
    t.is(error.response.statusCode, 400);
    // Assert error message
    t.is(error.response.body.message, "request.body should be object");
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
    
  });