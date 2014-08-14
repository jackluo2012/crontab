var databases = require('../config/databases'),
mongoose = require('mongoose');
mongoose.connect('mongodb://'+databases.Mongodb.host+'/' +databases.Mongodb.db);
module.exports = mongoose;
