const express = require('express'),
router = express.Router(),
controller = require('./controller');

router.get('/getMaterias',(req,res,next)=>{
	controller.getMaterias(function(error,data){
		if(error){
			res.send(JSON.stringify(error));
		}
		else{
			res.send(JSON.stringify(data));
		}
	});
});

router.post('/setMateria',(req,res,next)=>{
	controller.setMateria(req.body,function(error){
		res.send(JSON.stringify(error));
	});
});

router.delete('/deleteMateria',(req,res,next)=>{
	controller.deleteMateria(req.body,function(error){
		res.send(JSON.stringify(error));
	});
});

router.put('/updateMateria',(req,res,next)=>{
	controller.updateMateria(req.body,function(error){
		res.send(JSON.stringify(error));
	});
});

module.exports = router;
