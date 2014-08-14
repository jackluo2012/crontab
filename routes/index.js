/**
 * author jackluo
 * 1.将数据发送到NodeJS中
 * 2.加入计时
 * 3.回调接口数据
 */



var express = require('express'),
router = express.Router(),
Logs = require('../models/logs');
/* GET home page. */
router.get('/', function(req, res) {
	var logs = {
		comp_id:'12121212122112'
		};
	Logs.Save(logs,function(){
		console.log('log success!!!');
	}); 
	console.log(logs);
  res.render('index', { title: 'Express' });
});

router.post('/',function(req,res){
	console.log('hello world');
	res.write('hello world');
	res.end();
})

module.exports = router;
