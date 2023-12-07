'use strict';

var utils = require('../utils/writer.js');
var Rating = require('../service/RatingService');

module.exports.userUserIDRatePUT = function userUserIDRatePUT (req, res, next, body, userID) {
  Rating.userUserIDRatePUT(body, userID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
