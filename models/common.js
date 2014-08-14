var Common = {},
settings = require('../config/settings'),
crypto = require('crypto');//md5加密的东西
module.exports=Common;
/**
 * 将时间拿入队列进行计算
 * 返回就有的状态 和计时秒数
 */
Common.Calculation = function(lists){
	var lists = JSON.parse(lists);//conver 
	//获取当前的时间
	var now  = new Date().getTime();
	for(var date in lists){
		var items = lists[date];
		//获取当前的时间的秒数
		var days_milli_second = new Date(date).getTime();
		for(var item in items){
			var starttime = days_milli_second + item * 1000;//开始
			var endtime   = days_milli_second + items[item] * 1000;//结束
			if( now < starttime ){
				return {'type':'begin','countdown':(starttime - now) };
			}else if( now < endtime){
//				console.log(endtime);
				return {'type':'stop','countdown':(endtime - now) };
			}
			/*
				console.log(item);
				console.log('----------------');
				console.log(items[item]);
			*/
		}
	}
	return null;
};
/***
 *	md5 
 */
Common.getSign = function(comp_id){
	var hash_key = comp_id + settings.HASH_KEY;
	var md5 = crypto.createHash('md5');
	return md5.update(hash_key).digest('hex');	
}

