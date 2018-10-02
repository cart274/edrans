const express = require('express'),
router = express.Router();
let controller = require('./controller');

router.get('/getCarreras',(req,res,next)=>{
	controller.getCarreras(function(error,data){
		if(error){
			res.send(JSON.stringify(error));
		}
		else{
			res.send(JSON.stringify(data));
		}
	});
});

router.post('/setCarrera',(req,res,next)=>{
	controller.setCarrera(req.body,function(error){
		res.send(JSON.stringify(error));
	});
});

router.delete('/deleteCarrera',(req,res,next)=>{
	controller.deleteCarrera(req.body,function(error){
		res.send(JSON.stringify(error));
	});
});

router.put('/updateCarrera',(req,res,next)=>{
	controller.updateCarrera(req.body,function(error){
		res.send(JSON.stringify(error));
	});
});

router.post('/getMateriasInCarrera',(req,res,next)=>{
	console.log('router',req.body);
	controller.getMateriasInCarrera(req.body,function(error,data){
		if(error){
			res.send(JSON.stringify(error));
		}
		else{
			res.send(JSON.stringify(data));
		}
	});
});

module.exports = router;
