//
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Collection = 'test-app1';

var Test1Schema   = new Schema({
    name: String,
    lastName: String
});

module.exports = mongoose.model(Collection, Test1Schema);
