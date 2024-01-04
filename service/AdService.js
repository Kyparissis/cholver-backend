'use strict';

// Import the fixtures that will be used to mock responses from the database
const { sampleUserList } = require('../fixtures/sampleUserList'); 
const { sampleAdList } = require('../fixtures/sampleAdList');       
const { sampleAdListWithUsers } = require('../fixtures/sampleAdListWithUsers'); 
const { sampleAd } = require('../fixtures/sampleAd');          

/**
 * Function to handle the HTTP PUT request to the /ad/{adID} endpoint
 * FR6 - The user must be able to show interest in an ad.
 * @returns resolved promise with the response message
 **/
exports.adAdIDPUT = function () {
  return new Promise(function (resolve) {
    var examples = {};
    examples['application/json'] = sampleAd;
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Function to handle the HTTP GET request to the /ad endpoint
 * FR5 - The user must be able to view ads posted by other users.| FR10 - The user must be able to search for ads by keyword.
 * @returns resolved promise with the ads
 */
exports.adGET = function () {
  return new Promise(function (resolve) {
    var examples = {};
    examples['application/json'] = sampleAdListWithUsers;
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Function to handle the HTTP DELETE request to the /user/{userID}/ad/{adID} endpoint
 * FR4 - The user must be able to delete their own ads.
 * @returns resolved promise with the response message
 */
exports.userUserIDAdAdIDDELETE = function () {
  return new Promise(function (resolve) {
    resolve();
  });
};

/**
 * Function to handle the HTTP GET request to the /user/{userID}/ad endpoint
 * FR7 - The user must be able to view their own ads.
 * @returns resolved promise with the response message
 */
exports.userUserIDAdAdIDGET = function () {
  return new Promise(function (resolve) {
    var examples = {};
    examples['application/json'] = sampleUserList;
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Function to handle the HTTP GET request to the /user/{userID}/ad endpoint
 * FR8 - The user must be able to view their own ads.
 * @returns resolved promise with the response message
 */
exports.userUserIDAdGET = function () {
  return new Promise(function (resolve) {
    var examples = {};
    examples['application/json'] = sampleAdList;
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Function to handle the HTTP POST request to the /user/{userID}/ad endpoint
 * FR3 - The user must be able to create ads.
 * @returns resolved promise with the response message
 */
exports.userUserIDAdPOST = function () {
  return new Promise(function (resolve) {
    var examples = {};
    examples['application/json'] = {
      message: 'message',
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};
