'use strict';

var url = require('url');


var Brick = require('./BrickService');


module.exports.brickPropertyIdPOST = function brickPropertyIdPOST (req, res, next) {
  Brick.brickPropertyIdPOST(req.swagger.params, res, next);
};
