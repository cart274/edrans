const express = require('express'),
app = express(),
bodyParser = require('body-parser');
alumnos = require('./modules/alumnos/router.js');
materias = require('./modules/materias/router.js');
carreras = require('./modules/carreras/router.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':true}));
app.use(express.static('./public'));

app.get('/',(req,res,next)=>{
	console.log('Inicio');
	res.sendFile('./public/index.html');
});

app.use('/alumnos', alumnos);
app.use('/materias', materias);
app.use('/carreras', carreras);
app.listen(8080);