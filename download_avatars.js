var request = require('request');
var secrets = require('./secrets');


console.log("Welcome to the GitHub Avatar Downloader!");

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + '/contributors',
    headers: {
      'User-Agent': 'request',
      'Authorization': secrets.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body){
    var contributors = JSON.parse(body);
    // console.log(contributors)

      var avatar_urls = contributors.map((contributor)=>
        contributor.avatar_url
      );

     cb(err, avatar_urls)

  })
}

getRepoContributors("jquery", 'jquery', function(err, result) {
  console.error("Errors: ", err);
  console.log("Result: ", result);
})
//