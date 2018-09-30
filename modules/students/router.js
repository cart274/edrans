const express = require('express'),
router = express.Router(),
controller = require('./controller');

router.get('/getStudents',(req,res,next)=>{
	controller.getStudents(function(error,data){
		if(error){
			res.send(JSON.stringify(error));
		}
		else{
			res.send(JSON.stringify(data));
		}
	});
});

router.post('setStudents',(req,res,next)=>{
	controller.setStudents(req.body,function(error,data){
		if(error){
			res.send(JSON.stringify(error));
		}
		else{
			res.send(JSON.stringify(data));
		}
	});
});
module.exports = router;