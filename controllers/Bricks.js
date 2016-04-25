'use strict';

var url = require('url');


var Bricks = require('./BricksService');


module.exports.bricksGET = function bricksGET (req, res, next) {
  Bricks.bricksGET(req.swagger.params, res, next);
};
