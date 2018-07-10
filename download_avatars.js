var request = require("request");
var secrets = require("./secrets");
var fs = require("fs");

var project = process.argv[2];
var repo = process.argv[3];

if (!project || !repo){
  console.log("Please specify a project name and a repository");
}

console.log("Welcome to the GitHub Avatar Downloader!");

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      "User-Agent": "request",
      "Authorization": secrets.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body){
    var contributors = JSON.parse(body);
    cb(err, contributors);

  });
}

function downloadImagebyURL(url, filePath){
  request.get(url)
  .on("error", function(err){
    console.error(err);
  });
  .pipe(fs.createWriteStream(filePath));
}



getRepoContributors(project, repo, function(err, contributors) {
  if (err) {
    console.error(err);
  }
  contributors.forEach(function(contributor){
    downloadImagebyURL(contributor.avatar_url, "avatars/" + contributor.login + ".jpg");
  });
});
