'use strict';

var url = require('url');


var Properties = require('./PropertiesService');


module.exports.propertiesGET = function propertiesGET (req, res, next) {
  Properties.propertiesGET(req.swagger.params, res, next);
};
