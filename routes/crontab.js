/**
 * author jackluo
 * 1.将数据发送到NodeJS中
 * 2.加入计时
 * 3.回调接口数据
 */

var express = require('express'),
router = express.Router(),
Settings = require('../config/settings'),
Curl = require('../models/curl'),
CompCron = require('../models/compcron'),
Crontab = require('../models/crontab'),
Common  = require("../models/common"),
Logs = require('../models/logs'),
Redis = require('../models/redis'),
Login = require('../models/login');
router.get('/', function(req, res) {
	var content = {
		'comp_id':'123456789',
		'aaa':''
	}
//	console.log(Redis);

//传入当前时间
//
var EndTime= new Date('2014/08/13 16:02'); // orgin
var NowTime = new Date();
//var t =EndTime.getTime() - NowTime.getTime(); //now
//
var str = '{"2014/08/13":{"28800":"43200","46800":"64800"},"2014/08/14":{"28800":"43200","46800":"64800"},"2014/08/15":{"28800":"64800"}}';
var lists  = JSON.parse(str);
for(var date in lists){
	var items = lists[date];
	//获取当前的

	for(var item in items){
		console.log(item);
		console.log('----------------');
		console.log(items[item]);
	}
}

/*	
	Redis.lpush('list','key_0');
	Redis.lpush('list','key_1');
//	Redis.end();	
	Redis.lrange('list','0','-1',function(error,res){
				if(error){
					console.log(error);
				}else{
					console.log(res);
				}
			});
//*/


/*
	Redis.select('0',function(error){
		if(error){
			console.log(error);
		}else{
			//lpush
			Redis.lpush('list','key_0');
			Redis.lpush('list','key_1');
			Redis.end();
		}
	});

	Redis.select('0',function(error){
		if(error){
			console.log(error);
		}else{
			Redis.lrange('list','0','-1',function(error,res){
				if(error){
					console.log(error);
				}else{
					console.log(res);
				}
			});

		}

	});
//*/
/* 
var EndTime= new Date('2014/08/13 16:02'); // orgin
var NowTime = new Date();
var t =EndTime.getTime() - NowTime.getTime(); //now

console.log(t);

setTimeout(function(){
    console.log(121212);
}, t);
*/


res.write('Hello World');
res.end();

/*
var d = new Date();	

console.log(d.getTime() / 1000);


res.render('index', { title: 'Express' });*/


//	console.log(Settings.remote.send_ivr);
//

//	JSON.parse();


/*
	Curl.Post(Settings.remote.send_ivr,null,content,function(res){
		res.on('data',function(data){
			console.log( data);
		});
	});
*/

/*
   var status = Login.author(req);
   console.log(status);
   
*/
});
router.post('/test',function(req,res){
	// add 
	res.end();
/*
	var compcron = {
		cmc_id:req.body.cmc_id,
		comp_id:req.body.comp_id,
		status:1,
		cron_time:req.body.cron_time
	};
	CompCron.Save(compcron,function(error,compcron){
		if(error){
			console.log(error);
		}
		console.log(compcron);
	});
*/
/*
	var cron_time = req.body.cron_time;
	var calcu = Common.Calculation(cron_time);
	if(calcu){
		var compcron = {
			cmc_id:req.body.cmc_id,
			comp_id:req.body.comp_id,
			type:calcu.type,
			countdown:calcu.countdown
		};
//		Crontab.Insert(compcron,Curl.SendCompCron);
		Curl.SendCompCron(compcron);
	}
//*/
	var cron_time = req.body.cron_time;
	var calcu = Common.Calculation(cron_time);
	if(calcu){
		var compcron = {
			cmc_id:req.body.cmc_id,
			comp_id:req.body.comp_id,
			type:calcu.type,
			countdown:5000
		};
		var n =2000;
		Crontab.Insert(compcron,Curl.Start,n);
	}

//	Curl.SendCompCron();
//	console.log(req.body);
/*
	var compcron = {cmc_id:'22222222222222222222'};

	CompCron.Get(compcron,function(error,compcron){
		console.log(compcron);
	});
	CompCron.Remove(compcron,function(err){
		console.log(err);
	});

	var compcron = {
			cmc_id:req.body.cmc_id,
			comp_id:req.body.comp_id,
			status:1,
			cron_time:req.body.cron_time
		};
	CompCron.Save(compcron,function(error,compcron){
		if(error){
			console.log(error);
		}
//		53ec3174b5f9435a115a1f76,
		console.log(compcron);
	});
/*
	CompCron.Update(compcron,function(error,compcron){
		if(error){
			console.log(error);
		}
		console.log(compcron);		
	});


*/
//	console.log('write');

/*
	res.write("{status:'1'}");

	res.end();
	*/

});
//execute
router.post('/execute', function(req, res) {
    //secutfiy
    var status = Login.author(req);
    if(status != '1'){
   		res.write("{status:'1001'}");//'sorry Permission denied'
	   	res.end();
    }
    // add mongodb
   	var getpost = {
		cmc_id:req.body.cmc_id,
		comp_id:req.body.comp_id,   		
   	};
   	var compcron= getpost,
   		logs = getpost,
   		cron = getpost,
   		cron_time = req.body.cron_time;
   	compcron['status'] = 1;
   	compcron['cron_time'] = cron_time;
   	// only once first remove
   	CompCron.Update({cmc_id:compcron.cmc_id},compcron,function(err){
   		if(err){
   			logs['content'] = err;
   			res.write("{status:'27017'}");//
	   		res.end();
   		}
		Logs.Save(logs);
   	});
   	// add execute 
   	compcron['status'] = 0;
	CompCron.Save(compcron,function(error,compcron){
		if(error){
   			logs['content'] = error;
   			res.write("{status:'27017'}");//
	   		res.end();
   		}
		Logs.Save(logs);
	});
	// add Crontab
	var calcu = Common.Calculation(cron_time);
	if(calcu == null){
		res.write("{status:'1002'}");//
   		res.end();
	   	compcron['status'] = 1;
	   	CompCron.Update({comp_id:compcron.comp_id},compcron,function(err){});
	   	logs['content'] = {err:'cron time is null'};
	   	Logs.Save(logs);
	}else{
		cron['type'] = calcu.type;
		cron['countdown'] = calcu.countdown; //add
		//if you execute time 
		if(calcu.type == 'stop'){
			cron['type'] = 'begin';
			Curl.SendCompCron(cron);
		}else{
			Crontab.Remove(cron);//delete remove
			Crontab.Insert(cron,Curl.SendCompCron);//add 
		}
	}
    res.write("{status:'1111'}");//'sorry Permission denied'
	res.end();
});
// stop 
router.post('/stop', function(req, res) {
    //secutfiy
    var status = Login.author(req);
    if(status != '1'){
   		res.write("{status:'1111'}");//'sorry Permission denied'
	   	res.end();
    }
    // add mongodb
   	var getpost = {
		cmc_id:req.body.cmc_id,
		comp_id:req.body.comp_id,   		
   	};
   	var compcron= getpost,
   		logs = getpost,
   		cron = getpost,
   		cron_time = req.body.cron_time;
   	compcron['status'] = 1;
   	compcron['cron_time'] = cron_time;
   	// only once first remove
   	CompCron.Update({cmc_id:compcron.cmc_id},compcron,function(err){
   		if(err){
   			logs['content'] = err;
   			res.write("{status:'27017'}");//'sorry Permission denied'
	   		res.end();
   		}
		Logs.Save(logs);
   	});	
   	Crontab.Remove(getpost);//delete remove
   	cron['type'] = 'stop';
   	// notice php
   	Curl.SendCompCron(cron);
   	res.write("{status:'1111'}");//'sorry Permission denied'
	res.end();
});

module.exports = router;