var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var urlParser = require('url');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.fetchFile = function(url, response) {
  fs.readFile(url, 'utf8', function(error, data) {
    if (error) {
      response.writeHead(404, exports.headers);
      return response.end(error.toString());
    }
    response.end(data);
  });
};

exports.actions = {
  'GET': function(request, response) {
    var statusCode = 200;
    response.writeHead(statusCode, exports.headers);
    var prefix;

    if (request.url === '/') {
      request.url = '/index.html';
    }

    if (request.url.includes('www.')) {
      prefix = archive.paths.archivedSites;
    } else {
      prefix = archive.paths.siteAssets;
    }
    exports.fetchFile(prefix + request.url, response);
  },

  'POST': function(request, response){

    var statusCode = 302;
    response.writeHead(statusCode, exports.headers);
    var path = archive.paths.list;
    var data = "";
    request.on('data', function(chunk) {
      data += chunk;
    });

    var writeHeadAndRedirect = function(){
      response.writeHead(statusCode, exports.headers);
      exports.fetchFile(archive.paths.siteAssets + '/loading.html', response);
    };
    
    request.on('end', function() {
      var params = urlParser.parse(data).pathname;
      data = params.substr(4);
      archive.addUrlToList(data, writeHeadAndRedirect);
    });
 

    

  }
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
};



// As you progress, keep thinking about what helper functions you can put here!
