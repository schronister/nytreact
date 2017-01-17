// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");
var querystring = require("querystring");

var authKey = "5682597b552e40c1b0bfff4f6939d89a";

// Based on the queryTerm we will create a queryURL 
var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=";

// Helper Functions (in this case the only one is runQuery)
var helpers = {

  runQuery: function(query) {
    //NYT api search
    var queryURL = queryURLBase + query.topic + "&begin_date=" + query.startYear + "0101&end_date=" + query.endYear + "0101";
    return axios.get(queryURL).then(function(response) {

      return response.data.response.docs;
    });

  },

  //save an article to the database
  saveToDB: function(title, date, url) {
    return axios.post("/api/saved", querystring.stringify({title: title, date:date, url:url}))
    .then(function(response) {
        console.log("Successfully saved article");
    });
  },

  getSavedFromDB: function() {
    return axios.get("/api/saved")
    .then(function(response) {
      return response.data;
    });
  },

  deleteFromDB: function(title){
    return axios({
      method: 'post',
      url: "/api/saved/delete",
      data: querystring.stringify({
        title:title
      })
    }).then(function(response){
      console.log("Deleted article");
    });
  }

};

// We export the helpers function (which contains getGithubInfo)
module.exports = helpers;
