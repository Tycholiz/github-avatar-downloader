var request = require('request');
var secrets = require('./secrets');
console.log('Welcome to the GitHub Avatar Downloader!');
//Node-style callback functions expect their first argument to be a placeholder for any errors that may have occurred, and the subsequent argument(s) are results being passed to the callback.
function getRepoContributors(repoOwner, repoName, cb) { //need callback to handle the asynchronous nature of results that are to be returned from getRepoContributors.
  var options = {
    url:  "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': secrets.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    // cb(err, body);
    var json = JSON.parse(body);
    cb(err, json);


    for (var i in json) {
      console.log(json[i]["avatar_url"])
    }
  });

}

getRepoContributors("jquery", "jquery", function(err, result) {
  // console.log("Errors:", err);
  // console.log("Result:", result);
});