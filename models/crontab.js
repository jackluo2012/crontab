var listlink = {}
,Crontab = {};
module.exports=Crontab;
//insert;
Crontab.Insert = function(cron,callFunc){
	var CronIndex = Crontab.GetIndex(cron);
	Crontab.Remove(cron.comp_id,cron.cmc_id); //remove 
	listlink[CronIndex] = setTimeout(function(){
				                	callFunc(cron)
						},cron.countdown);
//	console.log(listlink);
}
Crontab.Remove = function(cron){
	var CronIndex = Crontab.GetIndex(cron);
	if(listlink[CronIndex]){
		clearTimeout(listlink[CronIndex]);
	}
//	console.log(listlink);
};
Crontab.GetIndex = function(cron){
	return 'crontab_' + cron.comp_id + '_' + cron.cmc_id;
};
