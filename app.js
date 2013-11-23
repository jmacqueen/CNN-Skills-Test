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

app.get('/cnnbrk-tweets', function (req, res) {
  var body = '<head>';
  body += '<link rel="stylesheet" href="/static/style.css">';
  body += '</head><body>';
  // body += '<table><tbody>';
  twit.get('search/tweets.json?q=from%3Acnnbrk&src=typd&f=realtime&count=10', function (error,data) {

    var statusUpdates = JSON.parse(data).statuses;

    body += '<div class="col1">';
      body += sliceStatuses(statusUpdates, 0, 4);
    body += '</div>';

    body += '<div class="col2">';
      body += sliceStatuses(statusUpdates, 5, 9);
    body += '</div>';

    body += '</body>';
    res.send(body);
  });
});

app.use("/", express.static(__dirname));

app.listen(30000);
console.log('Listening on port 30000');

var sliceStatuses = function (statuses, fromIndex, toIndex) {
  var body="";
  var i;
  for (i = fromIndex; i < toIndex + 1; i++) {
    if (statuses[i]) {
      var status = statuses[i].text;
      var newstatus = status.replace(/(https?:\/\/.*)\b/i,'<a href="$1" target="_blank">$1</a>');
      body += '<p>' + newstatus + '</p>';
    }
  }
  return body;
};