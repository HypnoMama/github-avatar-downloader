var request = require('request');
var secrets = require('./secrets');
var fs = require('fs');


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

function downloadImagebyURL(url, filePath){

  request.get(url)
  .on('error', function(err){
    console.error(err);
  })
  .pipe(fs.createWriteStream(filePath));

}



downloadImagebyURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")

// getRepoContributors("jquery", 'jquery', function(err, result) {
//   console.error("Errors: ", err);
//   console.log("Result: ", result);
// })
//