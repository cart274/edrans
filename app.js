const express = require('express'),
app = express(),
bodyParser = require('body-parser');
students = require('./modules/students/router.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':true}));
app.use(express.static('./public'));

app.get('/',(req,res,next)=>{
	console.log('Inicio');
	res.sendFile('./public/index.html');
});

app.use('/students', students);
app.listen(8080);