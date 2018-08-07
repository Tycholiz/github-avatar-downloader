var request = require('request');
var secrets = require('./secrets');
var fs = require('fs');
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
    if (err) {
      cb(err);
      return;
    }


    var json = JSON.parse(body);
    cb(undefined, json);

  });


}



function downloadImageByURL(url, filePath) {
  console.log("sure boss, ima go get ", url, " and drop it in ", filePath)
  request.get(url)
          .on('error', function (err) {
             throw err;
          })
          .on('response', function (response) {
            console.log('Response Status Code: ', response.statusCode);
          })
          .pipe(fs.createWriteStream(filePath));

}



// downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg");

getRepoContributors("jquery", "jquery", function(err, result) {
  // console.log("Errors:", err);
  // console.log("Result:", result);

  for (var i in result) {
    var avatarURL = result[i].avatar_url;
    var login = result[i].login;
    downloadImageByURL(avatarURL, "./avatars/" + login + ".jpeg");
  }
});
