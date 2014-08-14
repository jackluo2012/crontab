var http = require('http'),
url = require('url'),
querystring = require('querystring'),
Settings = require('../config/settings'),
Logs = require('./logs'),
Crontab = require('./crontab'),
Compcron = require('./compcron'),
Common 	 = require('./common'),
Curl = {};
module.exports  = Curl;
Curl.Post = function post(path,cookies,body,callback) {

	//no header 
	var options = url.parse(path);
	options['headers']  = {  
	        "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",  
	        "Accept":"application/json, text/javascript, */*; q=0.01",  
	        "Accept-Language":"zh-cn",  
	        "Cache-Control":"no-cache",  
	        "Connection":"Keep-Alive",    
	        "User-Agent":"Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0; BOIE9;ZHCN)",  
	        "X-Requested-With":"XMLHttpRequest"  
	    }
	if(cookies) options.headers['Cookie'] = cookies;

     options.method = 'POST';
     if(!body)options.method = 'GET';
     if(body){
        body = querystring.stringify(body);
        options.headers['Content-Length'] = Buffer.byteLength(body);
     }
	var req=http.request(options,function(res){  
		res.setEncoding("utf8");  
		/*  pop  send 
		res.on("data",function(data){
			console.log(data);
		});
		*/
		return callback(res);
	});  
	if(body){
		req.write(body);  
	}
	req.end();  
}
Curl.Get = function (path,cookies,contents,callback){
	Curl.Post(path,cookies,contents,callback);
}
Curl.Start = function(cron,n){
		Crontab.Remove(cron);
		n +=2000;
		var compcron = {
			cmc_id:'22222222222222222222',
			comp_id:'121212121212112',
			countdown:n
		};
		Crontab.Insert(compcron,Curl.Start,n);
		if(n > 10000){
			Crontab.Remove(cron);
			console.log('the games is over');
			return ;
		}
		console.log('start ....');
}
//
Curl.SendCompCron = function(cron){
	//comp_id,cmc_id,type
	//sign 
	var ans_key = Common.getSign(cron.comp_id);
	var contents = {
		comp_id:cron.comp_id,
		cmc_id:cron.cmc_id,
		type:cron.type,
		ans_key:ans_key
	};
/*	console.log(contents);
	return ;
*/
	Curl.Post(Settings.remote.send_ivr,null,contents,function(res){
			//
			res.on('data',function(data){
				var data = JSON.parse(data);
				console.log(data);
			});
/*			console.log('--|---|--');
			return ;*/
			// clear setTimeOut
//			Crontab.Remove(cron);
			// from mongodb
			Compcron.GetRow({cmc_id:cron.cmc_id,status:'1'},function(error,compcron){
				if(error){
					console.log(error);
					return ;
				}
				console.log(compcron);
				if(compcron == null) {
					console.log('date empty');
					return;
				};
				var calcu = Common.Calculation(compcron.cron_time);	
				if(calcu){
					var comp_cron = {
						cmc_id:compcron.cmc_id,
						comp_id:compcron.comp_id,
						type:calcu.type,
						countdown:calcu.countdown
					};
//					console.log(calcu);
//					Crontab.Insert(comp_cron,Curl.SendCompCron);
//					console.log('----^_^!!-----');
				}
//				console.log('----ok-----');
				return ;
			});
	});
};
/*
Curl.Login = function(serverid,callback){
	var contents={  
		  username:settings.remote.username,
  		  password:settings.remote.password,
  		  server_id:serverid,
  		  submit:'true'
  	};
	Curl.Post(settings.remote.login_path,null,contents,function(res){
		if(res.statusCode == 302 && res.headers.location=='/admin/index'){
			callback({status:1});
			console.log('login success !!!');		
		}else{
			callback({status:1});
			console.log('login error !!!');		
		}
	});
};

Curl.SendNotice = function (serverid,noticeid){
	var contents={  
		  username:settings.remote.username,
  		  password:settings.remote.password,
  		  server_id:serverid,
  		  submit:'true'
  	};
	Curl.Post(settings.remote.login_path,null,contents,function(res){
		if(res.statusCode == 302 && res.headers.location=='/admin/index'){
			//
			var cookies = null;
			if(res.headers['set-cookie']){
				var cookies = res.headers['set-cookie'];
			}
			var contents = {
				noticeid:noticeid,
				send_notice_key:settings.remote.send_notice_key
			}
			//console.log(cookies);	
			Curl.Get(settings.remote.send_notice_path,cookies,contents, function(res){
				res.on("data",function(data){
					var data = 	eval("(" + data +")"); //covie
					console.log(data);  
					console.log(data.status);  
						//success
		        	if(data.status==1){
		        		//remove	
		        		Notice.Remove({id:noticeid,serverid:serverid},function(){});	
		        	}
		        	var logs = {
						id:noticeid,
						serverid:serverid,
						status:data.status
					};
					console.log(data.status);
					console.log(logs);
					Logs.Save(logs,function(){
						console.log('log success!!!');
					}); 
		    	});
			});
//			callback({status:1});
//			console.log('login success !!!');		
		}else{
//			callback({status:-1});
//			console.log('login error !!!');		
		}
	});
};
*/



