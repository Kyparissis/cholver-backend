"use strict";

var utils = require("../utils/writer.js");
var User = require("../service/UserService");

module.exports.userGET = function userGET(req, res, next, keyword) {
  User.userGET(keyword)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userPOST = function userPOST(req, res, next, body) {
  User.userPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userUserIDDELETE = function userUserIDDELETE(
  req,
  res,
  next,
  userID,
) {
  User.userUserIDDELETE(userID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userUserIDGET = function userUserIDGET(req, res, next, userID) {
  User.userUserIDGET(userID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userUserIDPUT = function userUserIDPUT(
  req,
  res,
  next,
  body,
  userID,
) {
  User.userUserIDPUT(body, userID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userUserIDProfile_picturePUT =
  function userUserIDProfile_picturePUT(req, res, next, userID) {
    User.userUserIDProfile_picturePUT(userID)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  };
