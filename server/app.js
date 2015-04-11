/**
@fileOverview 

<p>Server initial file</p>

<p>Open up a port to listen for requests</p>

*/
var express = require('express');
var path = require('path');


var app = express();
var port = 8080;

app.set('views', path.join(__dirname, '../client/dist/'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '../client/dist')));

app.engine('html', require('ejs').renderFile);

app.listen(port);
console.log('Listening on port: ', port);
