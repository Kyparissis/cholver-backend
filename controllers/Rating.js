"use strict";

// This is the controller for the Rating entity
// It is responsible for handling HTTP requests and responses
// It uses the Rating service to access the database
// It is also responsible for handling errors
// It is used by the router (see routes/Rating.js)
// It uses the writer.js utility for sending responses

var utils = require("../utils/writer.js");        // Import the writer.js utility so we can send responses
var Rating = require("../service/RatingService"); // Import the Rating service so we can access the database

/**
 * Function to handle the HTTP PUT request to the /user/{userID}/rate endpoint
 * @param {*} req: The request object 
 * @param {*} res: The response object 
 * @param {*} next: The next middleware function 
 * @param {*} body: The request body 
 * @param {*} userID: The user ID to rate 
 */
module.exports.userUserIDRatePUT = function userUserIDRatePUT(req, res, next, body, userID) {
  // Call the Rating service function to handle the HTTP PUT request
  Rating.userUserIDRatePUT(body, userID)
    // If the promise is resolved, send a 200 response with the updated rating
    .then(function (response) {
      utils.writeJson(res, response);
    })
    // If the promise is rejected, send a 500 response with the error
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
