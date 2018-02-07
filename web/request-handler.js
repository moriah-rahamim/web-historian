var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  var action = httpHelpers.actions[req.method];

  if (action) {
    action(req, res);
  }

};
