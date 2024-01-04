"use strict";

// This is the controller for the User entity
// It is responsible for handling HTTP requests and responses
// It uses the User service to access the database
// It is also responsible for handling errors
// It is used by the router (see routes/User.js)
// It uses the writer.js utility for sending responses

var utils = require("../utils/writer.js");    // Import the writer.js utility so we can send responses
var User = require("../service/UserService"); // Import the User service so we can access the database

/**
 * Function to handle the HTTP GET request to the /user endpoint
 * @param {Object} req: The request object 
 * @param {Object} res: The response object 
 * @param {Function} next: The next middleware function 
 * @param {String} keyword: The keyword to search for in the user name 
 */
module.exports.userGET = function userGET(req, res, next, keyword) {
  // Call the User service function to handle the HTTP GET request
  User.userGET(keyword)
    // If the promise is resolved, send a 200 response with the users
    .then(function (response) {
      utils.writeJson(res, response);
    })
    // If the promise is rejected, send a 500 response with the error
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

/**
 * Function to handle the HTTP POST request to the /user endpoint
 * @param {Object} req: The request object 
 * @param {Object} res: The response object 
 * @param {Function} next: The next middleware function 
 * @param {Object} body: The request body 
 */
module.exports.userPOST = function userPOST(req, res, next, body) {
  // Call the User service function to handle the HTTP POST request
  User.userPOST(body)
    // If the promise is resolved, send a 201 response with the created user
    .then(function (response) {
      utils.writeJson(res, response);
    })
    // If the promise is rejected, send a 500 response with the error
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

/**
 * Function to handle the HTTP DELETE request to the /user/{userID} endpoint
 * @param {Object} req: The request object 
 * @param {Object} res: The response object 
 * @param {Function} next: The next middleware function 
 * @param {BigInteger} userID: The user ID to delete 
 */
module.exports.userUserIDDELETE = function userUserIDDELETE(req, res, next, userID) {
  // Call the User service function to handle the HTTP DELETE request
  User.userUserIDDELETE(userID)
    // If the promise is resolved, send a 200 response with the deleted user
    .then(function (response) {
      utils.writeJson(res, response);
    })
    // If the promise is rejected, send a 500 response with the error
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

/**
 * Function to handle the HTTP GET request to the /user/{userID} endpoint
 * @param {Object} req: The request object 
 * @param {Object} res: The response object 
 * @param {Function} next: The next middleware function 
 * @param {BigInteger} userID: The user ID to get 
 */
module.exports.userUserIDGET = function userUserIDGET(req, res, next, userID) {
  // Call the User service function to handle the HTTP GET request
  User.userUserIDGET(userID)
    // If the promise is resolved, send a 200 response with the user
    .then(function (response) {
      utils.writeJson(res, response);
    })
    // If the promise is rejected, send a 500 response with the error
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

/**
 * Function to handle the HTTP PUT request to the /user/{userID} endpoint
 * @param {Object} req: The request object 
 * @param {Object} res: The response object 
 * @param {Function} next: The next middleware function 
 * @param {Object} body: The request body 
 * @param {BigInteger} userID: The user ID to update 
 */
module.exports.userUserIDPUT = function userUserIDPUT(req, res, next, body, userID) {
  // Call the User service function to handle the HTTP PUT request
  User.userUserIDPUT(body, userID)
    // If the promise is resolved, send a 200 response with the updated user
    .then(function (response) {
      utils.writeJson(res, response);
    })
    // If the promise is rejected, send a 500 response with the error
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

/**
 * Function to handle the HTTP PUT request to the /user/{userID}/profile_picture endpoint
 * @param {Object} req: The request object 
 * @param {Object} res: The response object 
 * @param {Function} next: The next middleware function 
 * @param {BigInteger} userID: The user ID to update the profile picture 
 */
module.exports.userUserIDProfile_picturePUT = function userUserIDProfile_picturePUT(req, res, next, userID) {
  // Call the User service function to handle the HTTP PUT request
  User.userUserIDProfile_picturePUT(userID)
    // If the promise is resolved, send a 200 response with the updated user
    .then(function (response) {
      utils.writeJson(res, response);
    })
    // If the promise is rejected, send a 500 response with the error
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
