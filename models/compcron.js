var mongodb = require('./mongodb');
var compCronSchema = mongodb.Schema({
	cmc_id:String,
	comp_id:String,
	date:{type:Date,default:Date.now},
	status:Number,
	cron_time:String
});
var compCronDao = mongodb.model('crontab',compCronSchema);
CompCron = function(){};
module.exports = CompCron;
CompCron.Save = function(comp_cron,callback){
	var compcron = new compCronDao({
					cmc_id:comp_cron.cmc_id,
					comp_id:comp_cron.comp_id,
					status:comp_cron.status,
					cron_time:comp_cron.cron_time
			});
	compcron.save(function(err,comp_cron){
		callback(err,comp_cron);
	});
}
// find get 
CompCron.GetRow = function(comp_cron,callback){
	compCronDao.findOne(comp_cron,function(error,docs){
		callback(error,docs);
	});
};
//dele
CompCron.Remove = function(comp_cron,callback){
	compCronDao.remove(comp_cron,function(err){
		callback(err);
	})
}
//update 
CompCron.Update = function(comp_cron,callback){
	compCronDao.findOneAndUpdate({cmc_id: comp_cron.cmc_id},comp_cron,function(err,comp_cron){
	callback(err,comp_cron);
/*

		if(err){
			callback(err,comp_cron);	
		}else{
//			compCronDao.findByIdAndUpdate(id, { name: 'jason borne' }, options, callback);
		}
		callback(err);*/
	});
}
