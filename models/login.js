var Login = function(){},
Common = require('./common');
Login.author = function(req){
	var comp_id = req.body.comp_id,
		ans_key = req.body.ans_key;
	var hash = Common.getSign(comp_id);		
	console.log(hash);
	if( hash != ans_key){
		return -1;//
	}
	return 1;
}
module.exports = Login;