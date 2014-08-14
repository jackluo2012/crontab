var mongodb = require('./mongodb');
var logsSchema = mongodb.Schema({
	id:Number,
	comp_id:Number,
	status:String,
	date:{type:Date,default:Date.now}
});
var Logs = function(){},
	LogsDao = mongodb.model('logs',logsSchema);
Logs.Save = function(logs,callback){
	var logs = new LogsDao({
			comp_id:logs.comp_id,
		});
	logs.save(function(err,crotab){
		console.log(crotab);
		if(err){
			callback(err);
		}
		callback(err,crotab)
	});
}
module.exports = Logs;