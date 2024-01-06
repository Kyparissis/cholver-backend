"use strict";

// Import the fixtures that will be used to mock responses from the database
const { sampleUserList } = require('../fixtures/sampleUserList');
const { sampleUser } = require('../fixtures/sampleUser');

/**
 * Function to handle the HTTP GET request to the /user endpoint
 * FR1 - The user must be able to edit their personal info.
 * @returns 
 */
exports.userGET = function () {
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
 * Function to handle the HTTP POST request to the /user endpoint
 * FR1 - The user must be able to edit their personal info.
 * @returns resolved promise with the response message
 */
exports.userPOST = function () {
  return new Promise(function (resolve) {
    resolve();
  });
};

/**
 * Function to handle the HTTP DELETE request to the /user/{userID} endpoint
 * FR3 - The user must be able to delete their own profile.
 * @returns resolved promise with the response message
 */
exports.userUserIDDELETE = function () {
  return new Promise(function (resolve) {
    var examples = {};
    examples['application/json'] = sampleUser;
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Function to handle the HTTP GET request to the /user/{userID} endpoint
 * FR1 - The user must be able to edit their personal info.
 * @returns resolved promise with the response message
 */
exports.userUserIDGET = function () {
  return new Promise(function (resolve) {
    var examples = {};
    examples['application/json'] = sampleUser;
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Function to handle the HTTP PUT request to the /user/{userID} endpoint
 * FR1 - The user must be able to edit their personal info.
 * @returns resolved promise with the response message
 */
exports.userUserIDPUT = function () {
  return new Promise(function (resolve) {
    var examples = {};
    examples['application/json'] = sampleUser;
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Function to handle the HTTP PUT request to the /user/{userID}/profile_picture endpoint
 * FR2 - The user must be able to edit their profile picture.
 * @returns resolved promise with the response message
 */
exports.userUserIDProfile_picturePUT = function () {
  return new Promise(function (resolve) {
    var examples = {};
    examples["application/json"] = {
      message: "Picture uploaded successfully",
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};
