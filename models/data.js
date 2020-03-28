const mongoose = require('mongoose');
const config = require('../config/database');

//UserSchema
const DataSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    data: {
        type: Number,
        required: true
    },
    time: {
        type: Date,
        required: true
    }
});

const Data = module.exports = mongoose.model('Data', DataSchema);

module.exports.getUserById = function(id,callback){
    Data.findById(id,callback);
    console.log('2');
}

module.exports.addData = function(newData, callback){
    newData.save(callback); 
}