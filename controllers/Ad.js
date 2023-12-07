'use strict';

var utils = require('../utils/writer.js');
var Ad = require('../service/AdService');

module.exports.adAdIDPUT = function adAdIDPUT (req, res, next, body, adID) {
  Ad.adAdIDPUT(body, adID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.adGET = function adGET (req, res, next, keyword) {
  Ad.adGET(keyword)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userUserIDAdAdIDDELETE = function userUserIDAdAdIDDELETE (req, res, next, userID, adID) {
  Ad.userUserIDAdAdIDDELETE(userID, adID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userUserIDAdAdIDGET = function userUserIDAdAdIDGET (req, res, next, userID, adID) {
  Ad.userUserIDAdAdIDGET(userID, adID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userUserIDAdGET = function userUserIDAdGET (req, res, next, userID) {
  Ad.userUserIDAdGET(userID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userUserIDAdPOST = function userUserIDAdPOST (req, res, next, body, userID) {
  Ad.userUserIDAdPOST(body, userID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
