"use strict";

const { sampleUserList } = require('../fixtures/sampleUserList');

/**
 * Show interest in an ad
 * FR6 - The user must be able to show interest in an ad.
 *
 * body Ad_adID_body
 * adID String
 * returns Ad
 **/
exports.adAdIDPUT = function (body, adID) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {
      adDescription: "adDescription",
      date: "date",
      adID: 0,
      city: "city",
      title: "title",
      userID: 6,
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Get all ads or search for ads by keyword
 * FR5 - The user must be able to view ads posted by other users.| FR10 - The user must be able to search for ads by keyword.
 *
 * keyword String  (optional)
 * returns List
 **/
exports.adGET = function (keyword) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = [
      {
        adDescription: "adDescription",
        date: "date",
        adID: 0,
        city: "city",
        title: "title",
        userID: 6,
        user: {
          profilePic: "",
          rating: 5.962133916683182,
          fullname: "fullname",
          userID: 1,
        },
      },
      {
        adDescription: "adDescription",
        date: "date",
        adID: 0,
        city: "city",
        title: "title",
        userID: 6,
        user: {
          profilePic: "",
          rating: 5.962133916683182,
          fullname: "fullname",
          userID: 1,
        },
      },
    ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Delete an ad from user account
 * FR4 - The user must be able to delete their post.
 *
 * userID String the user that deletes an ad
 * adID String the ad that gets deleted
 * no response value expected for this operation
 **/
exports.userUserIDAdAdIDDELETE = function (userID, adID) {
  return new Promise(function (resolve, reject) {
    resolve();
  });
};

/**
 * Get the interested users for an ad
 * FR8 - The user must be able to view the list of interested users for one of their own ads.
 *
 * userID String the user that posted the ad
 * adID String the ad whose interested users should be returned
 * returns List
 **/
exports.userUserIDAdAdIDGET = function (userID, adID) {
  return new Promise(function (resolve, reject) {
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
 * Get all ads from specific user
 * FR7 - The user must be able to view their own ads.
 *
 * userID String the user whose ads should be returned
 * returns List
 **/
exports.userUserIDAdGET = function (userID) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = [
      {
        adDescription: "adDescription",
        date: "date",
        adID: 0,
        city: "city",
        title: "title",
        userID: 6,
      },
      {
        adDescription: "adDescription",
        date: "date",
        adID: 0,
        city: "city",
        title: "title",
        userID: 6,
      },
    ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Create a new ad
 * FR3 - The user must be able to post a new ad.
 *
 * body UserID_Ad_body
 * userID String user that posts the ad
 * returns response_message
 **/
exports.userUserIDAdPOST = function (body, userID) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {
      message: "message",
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};
