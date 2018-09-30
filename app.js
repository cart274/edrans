const express = require('express'),
app = express(),
bodyParser = require('body-parser');
alumnos = require('./modules/alumnos/router.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':true}));
app.use(express.static('./public'));

app.get('/',(req,res,next)=>{
	console.log('Inicio');
	res.sendFile('./public/index.html');
});

app.use('/alumnos', alumnos);
app.listen(8080);