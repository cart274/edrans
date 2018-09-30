const express = require('express'),
router = express.Router(),
controller = require('./controller');

router.get('/getAlumnos',(req,res,next)=>{
	controller.getAlumnos(function(error,data){
		if(error){
			res.send(JSON.stringify(error));
		}
		else{
			res.send(JSON.stringify(data));
		}
	});
});

router.post('/setAlumnos',(req,res,next)=>{
	controller.setAlumnos(req.body,function(error){
		res.send(JSON.stringify(error));
	});
});

router.delete('/deleteAlumno',(req,res,next)=>{
	controller.deleteAlumno(req.body,function(error){
		res.send(JSON.stringify(error));
	});
});

router.put('/updateAlumno',(req,res,next)=>{
	controller.updateAlumno(req.body,function(error){
		res.send(JSON.stringify(error));
	});
});

module.exports = router;
