"use strict";

// This is the controller for the Ad entity
// It is responsible for handling HTTP requests and responses
// It uses the Ad service to access the database
// It is also responsible for handling errors
// It is used by the router (see routes/Ad.js)
// It uses the writer.js utility for sending responses

var utils = require("../utils/writer.js");  // Import the writer.js utility so we can send responses
var Ad = require("../service/AdService");   // Import the Ad service so we can access the database

/**
 * Function to handle the HTTP PUT request to the /ad/{adID} endpoint
 * @param {Object} req: The request object 
 * @param {Object} res: The response object 
 * @param {Function} next: The next middleware function 
 * @param {Object} body: The request body 
 * @param {BigInteger} adID: The ad ID to update 
 */
module.exports.adAdIDPUT = function adAdIDPUT(req, res, next) {
  if (!req) {  // Check if the request is null
    return null;
  }

  // Call the Ad service function to handle the HTTP PUT request
  Ad.adAdIDPUT()
    // If the promise is resolved, send a 200 response with the updated ad
    .then(function (response) {
      utils.writeJson(res, response);

      // Call the next middleware function
      next();
    })
    // If the promise is rejected, send a 500 response with the error
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

/**
 * Function to handle the HTTP GET request to the /ad with query endpoint
 * @param {Object} req: The request object
 * @param {Object} res: The response object
 * @param {Function} next: The next middleware function
 * @param {String} keyword: The keyword to search for in the ad title
 */
module.exports.adGET = function adGET(req, res, next, keyword) {
  if (!req) {  // Check if the request is null
    return null;
  }

  // Call the Ad service function to handle the HTTP GET request
  Ad.adGET(keyword)
    // If the promise is resolved, send a 200 response with the ads
    .then(function (response) {
      utils.writeJson(res, response);

      // Call the next middleware function
      next();
    })
    // If the promise is rejected, send a 500 response with the error
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

/**
 * Function to handle the HTTP DELETE request to the /user/{userID}/ad/{adID} endpoint
 * @param {Object} req: The request object 
 * @param {Object} res: The response object 
 * @param {Function} next: The next middleware function 
 * @param {BigInt} userID: The user ID to delete the ad from 
 * @param {BigInteger} adID: The ad ID to delete from the user 
 */
module.exports.userUserIDAdAdIDDELETE = function userUserIDAdAdIDDELETE(req, res, next) {
  if (!req) {  // Check if the request is null
    return null;
  }

  // Call the Ad service function to handle the HTTP DELETE request
  Ad.userUserIDAdAdIDDELETE()
    // If the promise is resolved, send a 200 response with the deleted ad
    .then(function (response) {
      utils.writeJson(res, response);

      // Call the next middleware function
      next();
    })
    // If the promise is rejected, send a 500 response with the error
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

/**
 * Function to handle the HTTP GET request to the /user/{userID}/ad/{adID} endpoint
 * @param {Object} req: The request object 
 * @param {Object} res: The response object 
 * @param {Function} next: The next middleware function 
 * @param {BigInteger} userID: The user ID to get the ad from 
 * @param {BigInteger} adID: The ad ID to get from the user 
 */
module.exports.userUserIDAdAdIDGET = function userUserIDAdAdIDGET(req, res, next) {
  if (!req) {  // Check if the request is null
    return null;
  }

  // Call the Ad service function to handle the HTTP GET request
  Ad.userUserIDAdAdIDGET()
    // If the promise is resolved, send a 200 response with the ad
    .then(function (response) {
      utils.writeJson(res, response);

      // Call the next middleware function
      next();
    })
    // If the promise is rejected, send a 500 response with the error
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

/**
 * Function to handle the HTTP GET request to the /user/{userID}/ad endpoint
 * @param {Object} req: The request object 
 * @param {Object} res: The response object
 * @param {Function} next: The next middleware function
 * @param {BigInteger} userID: The user ID to get the ads from
 */
module.exports.userUserIDAdGET = function userUserIDAdGET(req, res, next, userID) {
  if (!req) {  // Check if the request is null
    return null;
  }

  // Call the Ad service function to handle the HTTP GET request
  Ad.userUserIDAdGET(userID)
    // If the promise is resolved, send a 200 response with the ads
    .then(function (response) {
      utils.writeJson(res, response);

      // Call the next middleware function
      next();
    })
    // If the promise is rejected, send a 500 response with the error
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

/**
 * Function to handle the HTTP POST request to the /user/{userID}/ad endpoint
 * @param {Object} req: The request object 
 * @param {Object} res: The response object 
 * @param {Function} next: The next middleware function 
 * @param {Object} body: The request body 
 * @param {BigInteger} userID: The user ID to create the ad for 
 */
module.exports.userUserIDAdPOST = function userUserIDAdPOST(req, res, next) {
  if (!req) {  // Check if the request is null
    return null;
  }

  // Call the Ad service function to handle the HTTP POST request
  Ad.userUserIDAdPOST()
    // If the promise is resolved, send a 200 response with the created ad
    .then(function (response) {
      utils.writeJson(res, response);

      // Call the next middleware function
      next();
    })
    // If the promise is rejected, send a 500 response with the error
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};