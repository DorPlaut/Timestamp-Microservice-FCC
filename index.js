// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
// empty input
app.get('/api', (req, res) => {
  date = new Date();
  const unixKey = date.getTime();
  var dateString = date.toString().split(' ').slice(0, 6).join(' ');
  res.json({ unix: unixKey, utc: dateString });
});

// Date input
app.get('/api/:date', (req, res) => {
  const input = req.params.date;
  let date = new Date(input);
  // unix input
  if (input.toString().length === 13) {
    date = new Date(input * 1);
    // invalid input
  } else if (date == 'Invalid Date') {
    res.json({ error: 'Invalid Date' });
  }

  const unixKey = date.getTime();
  var dateString = date.toUTCString();
  res.json({ unix: unixKey, utc: dateString });
});

// listen for requests :)
// cange port to - process.env.PORT - in the end
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
