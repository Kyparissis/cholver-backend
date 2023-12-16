"use strict";

/**
 * Search for users by keyword
 * FR9 - The user must be able to search for other users' profiles.
 *
 * keyword String
 * returns List
 **/
exports.userGET = function (keyword) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = [
      {
        userDescription: "userDescription",
        gender: "gender",
        city: "city",
        phone: "phone",
        profilePic: "",
        rating: 1,
        fullname: "fullname",
        userID: 0,
        email: "email",
        age: 6,
      },
      {
        userDescription: "userDescription",
        gender: "gender",
        city: "city",
        phone: "phone",
        profilePic: "",
        rating: 1,
        fullname: "fullname",
        userID: 0,
        email: "email",
        age: 6,
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
 * Create user
 * FR1 - The user must be able to edit their personal info.
 *
 * body UserCreate Information needed to create a new user profile
 * no response value expected for this operation
 **/
exports.userPOST = function (body) {
  return new Promise(function (resolve, reject) {
    resolve();
  });
};

/**
 * Delete user profile by ID
 * FR1 - The user must be able to edit their personal info.
 *
 * userID String User that should be deleted
 * returns User
 **/
exports.userUserIDDELETE = function (userID) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {
      userDescription: "userDescription",
      gender: "gender",
      city: "city",
      phone: "phone",
      profilePic: "",
      rating: 1,
      fullname: "fullname",
      userID: 0,
      email: "email",
      age: 6,
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Get user profile by ID
 * FR1 - The user must be able to edit their personal info. | FR2 - The user must be able to edit their profile picture.
 *
 * userID String User that should be returned
 * returns User
 **/
exports.userUserIDGET = function (userID) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {
      userDescription: "userDescription",
      gender: "gender",
      city: "city",
      phone: "phone",
      profilePic: "",
      rating: 1,
      fullname: "fullname",
      userID: 0,
      email: "email",
      age: 6,
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Update user information
 * FR1 - The user must be able to edit their personal info.
 *
 * body User User model
 * userID String User that needs to be updated
 * returns User
 **/
exports.userUserIDPUT = function (body, userID) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {
      userDescription: "userDescription",
      gender: "gender",
      city: "city",
      phone: "phone",
      profilePic: "",
      rating: 1,
      fullname: "fullname",
      userID: 0,
      email: "email",
      age: 6,
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Upload a picture
 *
 * userID String
 * returns inline_response_200
 **/
exports.userUserIDProfile_picturePUT = function (userID) {
  return new Promise(function (resolve, reject) {
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
