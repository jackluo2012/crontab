var express = require('express');
var router = express.Router();
var redis = require("redis");
db = redis.createClient();
db.on("error",function(err){
	console.log("Error " + err);
});
/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});
router.get('/add', function(req, res) {
	db.set("name","jackluo");
	console.log(db.get("name"));
  res.render('index', { title: '语音任务计划开始了' });
});

module.exports = router;
