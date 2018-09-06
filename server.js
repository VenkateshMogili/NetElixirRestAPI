var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var tasks = require('./routes/tasks');
var port = 4000;
var app = express();
var cors = require('cors');
//View Engine
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(cors());
//set static folder
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/api',tasks);

app.listen(port, function(){
	console.log('Server is running on port: '+port);
});