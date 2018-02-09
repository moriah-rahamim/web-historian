var helpers = require('../helpers/archive-helpers');
var _ = require('underscore');

// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
exports.worker = function() {
  helpers.readListOfUrls((urls) => {
    _.forEach(urls, (url) => {
      helpers.isUrlArchived(url, (exists) => {
        if (!exists) {
          helpers.downloadUrls(url);
        }
      });
    });
  });
};

exports.worker();

// read list of urls
// check which urls are not yet archived
// download them

//Read List of URLs from sites.txt
//Use Callback on ReadListofURLs which downloads that array of URLs
//Callback above should only be run if the URL is not yet archived
//Run cron job