var server = require('express');
var path = require('path');

const PORT = 8000;
const PUBLIC = __dirname + '/public';
const app = server();

app.all('/bundle.js', function(req, res) {
  res.sendFile(path.resolve(PUBLIC, 'bundle.js'));
});

app.all('*', function(req, res) {
  res.sendFile(path.resolve(PUBLIC, 'index.html'));
});

app.listen(PORT, function() {
  console.log('Listening on port ' + PORT + '...')
})
