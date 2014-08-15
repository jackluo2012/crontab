var mongodb = require('./mongodb');
var logsSchema = mongodb.Schema({
	cmc_id:Number,
	comp_id:Number,
	content:String,
	date:{type:Date,default:Date.now}
});
var Logs = function(){},
	LogsDao = mongodb.model('logs',logsSchema);
Logs.Save = function(logs){
	var logs = new LogsDao({
			cmc_id:logs.cmc_id,
			comp_id:logs.comp_id,
			content:logs.content
		});
	logs.save(function(err,logs){
		if(err){
			console.log(err);
		}		
		/*
		console.log(crotab);
		if(err){
			callback(err);
		}
		callback(err,crotab)
		*/
	});
}
module.exports = Logs;