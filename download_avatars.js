var request = require('request');

console.log("Welcome to the GitHub Avatar Downloader!");

function getRepoContributors(repoOwner, repoName, cb) {

}

getRepoContributors("jquery", 'jquery', function(err, result) {
  console.error("Errors: ", err);
  console.log("Result: ", result);
})