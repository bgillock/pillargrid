'use strict';

exports.bricksGET = function(args, res, next) {
  /**
   * parameters expected in the args:
  * propertyId (String)
  * geohashes (List)
  **/
    console.log("args.propertyID=" + args.propertyId.value);
    console.log("args.geohashes=" + args.geohashes.value)
    var filenames = [];
    var fs = require('fs');
    var gcloud = require('gcloud')({
            projectId: 'first-ascent'
    });
    var gcs = gcloud.storage();
    var seismic = gcs.bucket('bitrate27seismic');
    seismic.getFiles({ prefix: args.propertyId })
    .on('error', function(err) {})
    .on('data', function(d){ filenames.push({'name':d.name}); })
    .on('end', function(){
        if(Object.keys(filenames).length > 0) {
            res.setHeader('Content-Type', 'application/json');
            console.log("args.geohashes.length" + args.geohashes.value.length)
            if (args.geohashes.value.length > 0)
            {
                // Comment
                var newArray = [];
                for(var i = 0; i < filenames.length; i++) {
                    for(var j = 0; j < args.geohashes.value.length; j++) {
                        if (filenames[i].name.indexOf(args.geohashes.value[j]) > -1) {
                            if (newArray.indexOf(filenames[i]) == -1)
                                newArray.push(filenames[i]);
                        }
                    }
                }
                res.end(JSON.stringify(newArray,null,2));
            }
            else
            {
                res.end(JSON.stringify(filenames,null,2));
            }
        }
        else {
            res.end();
        }
    });
}

