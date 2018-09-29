const express = require('express'),
router = express.Router(),
security = require('./module/index.ts'),
security2 = new security();

console.log('security');
router.post('/getAccess',(req,res,next)=>{
	console.log(req.body,'body');
	let acceso = security2.getAccess(req.body);
	res.send(acceso);
	console.log("getAccess");
});

module.exports = router;