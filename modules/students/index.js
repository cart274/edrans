const express = require('express'),
router = express.Router();

router.get('/getStudents',(req,res,next)=>{
	console.log('Api module');
	var response = {'resp':'asd asd asd'};
	res.send(JSON.stringify(response));
});

module.exports = router;