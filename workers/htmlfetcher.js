var worker = require('../helpers/archive-helpers');

// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.



//Read List of URLs from sites.txt
//Use Callback on ReadListofURLs which downloads that array of URLs
//Callback above should only be run if the URL is not yet archived
//Run cron job