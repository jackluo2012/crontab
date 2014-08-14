var databases = require('../config/databases'),
redis = require('redis');
var client = redis.createClient(databases.REDIS.PORT,databases.REDIS.HOST);
client.on('error',function(error){
	console.log('Redis Connect Error!');
});
module.exports = client;
