var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var https = require('https');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  var path = exports.paths.list;
  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
      throw new Error('file not read');
      return;
    }
   
    var urls = data.split('\n');
    callback(urls);
  }); 

};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls((urls) => {
    var exists = urls.indexOf(url) !== -1;
    callback(exists);
  });
};

exports.addUrlToList = function(url, callback) {
  fs.open(exports.paths.list, 'a', (err, fd) => {
    if(err) throw new Error('error');
    fs.write(fd, url + '\n', callback);
  });
};

exports.isUrlArchived = function(url, callback) {
  fs.open(exports.paths.archivedSites + '/' + url, 'r', (err,fd)=>{
    var exists = true;
    if (err) {
      exists = false;      
    } 
    callback(exists);
  });
};

exports.downloadUrls = function(urls) {
//For each URL in array, create a file in the archived/sites folder
  if (!Array.isArray(urls)) {
    urls = [urls];
  }

  _.forEach(urls, (url)=> {
    var httpsUrl = url;
    if (!url.includes('https://')) {
      httpsUrl = 'https://' + url;
    }

    https.get(httpsUrl, (response) => {
      var data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        // write text into file
        fs.open(exports.paths.archivedSites + '/' + url, 'w', (err, fd) => {
          fs.write(fd, data);
        });
      });

    });
  });
};
