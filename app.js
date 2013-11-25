var express = require('express');
var app = express();

var util = require('util'),
    Twitter = require('simple-twitter');
var twit = new Twitter (
    'vAvRzrCmshfICyWhyAQ7A',
    'iuCANhrLz7clvzxY1joRgmBLbbJdEjSWpdIUKKWInyA',
    '21275387-BSZ5NfXy3ynR3kshliD2iuQ2beZFAfGCrxSRLoG95',
    'oQgoESuB4cJwi7kzlBZq5N4GaVgWluickbwAx9jbA6GF6'
);

app.set('title', 'CNN Skills Test');
app.set("views", __dirname + "/views");
app.set("view engine", "jade");

app.get('/cnnbrk-tweets', function (req, res) {

  twit.get('search/tweets.json?q=from%3Acnnbrk&src=typd&f=realtime&count=10', function (error,data) {

    var statusUpdates = JSON.parse(data).statuses;
    statusUpdates.forEach(function(update){
      update = parseStatus(update);
    });

    res.render("tweets", {updates: statusUpdates});
  });
});

app.use("/", express.static(__dirname));

app.listen(30000);
console.log('Listening on port 30000');

var parseStatus = function (statusUpdate) {
  // Fix truncated retweet text
  if (statusUpdate.retweeted_status) {
    statusUpdate.text =  "RT @";
    statusUpdate.text += statusUpdate.retweeted_status.user.screen_name + ": ";
    statusUpdate.text += statusUpdate.retweeted_status.text;
  }

  // Make URLs clickable
  var newStatusText = statusUpdate.text.replace(/(https?:\/\/.*)\b/i,'<a href="$1" target="_blank">$1</a>');
  statusUpdate.text = newStatusText;
  return statusUpdate;
};