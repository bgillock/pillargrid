'use strict';

exports.propertiesGET = function(args, res, next) {
  /**
   * parameters expected in the args:
  **/ 
    var properties = [];
    var fs = require('fs');
    var gcloud = require('gcloud')({
            projectId: 'first-ascent'
    });
    var gcs = gcloud.storage();
    var seismic = gcs.bucket('bitrate27seismic');
    seismic.getFiles({delimiter: "#"})
    .on('error', function(err) {})
    .on('data', function(d){ properties.push(d.name); })
    .on('end', function(){
        if(Object.keys(properties).length > 0) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(properties,null,2));
        }
        else {
            res.end();
        }
    });  
}

