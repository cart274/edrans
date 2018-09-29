class security{

	constructor(){
		this.users = [{'name':'Carlos', 'user':'cart274','password':'cart'}];
	}
	getAccess(data){
		console.log(data);
		let acceso = false;
		this.users.forEach((user)=>{
			if(user.user === data.user && user.password === data.password){
				acceso = true;
			}
		});
		return acceso;
	}
}
module.exports = security;