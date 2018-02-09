var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var fs = require('fs');
var http = require('http');

// require more modules/folders here!

exports.handleRequest = function (req, res) {

  var action = httpHelpers.actions[req.method];

  if (action) {
    action(req, res);
  }

  //user to give a URL in index.html
  //submit a POST request from index.html w/URL
  //Client sends POST request with data
  //Server interprets POST request, send 201 Status Code
  //Server appends data from POST request into Sites.text file 
  // Write file using (fs.open(path, 'a', func(err,fd){ fs.write(fd,URL)}))

};
