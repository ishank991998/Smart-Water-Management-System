const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//UserSchema
data = Number;
time = Date;
username = String;

const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNum: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    /*
    waterData:{
        type: Array,
        items: {
            type: Object,
            properties: {
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
            }
        },
        required : true
    }*/
    
    waterData:{
        type: [{
            data: {
                type: Number,
                required: true
            },
            time: {
                type: Date,
                required: true
            }
        }],
        required : true
    }
    /*
    waterData: {
        type: Array,
        items: {$ref : '#/definitions/modelData'}
    },
    definitions:{
        modelData:{
            type: Object,
            properties: {
                username:{
                    type: String
                },
                data: {
                    type: Number
                },
                time: {
                    type: Date
                }
            },
            required:[username,data,time]
        }
    }*/
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id,callback){
    User.findById(id,callback);
}

module.exports.getUserByUsername = function(username,callback){
    const query = {username:username}
    
    User.findOne(query,callback)

    /*User.findOne(query,function(err, doc) {
        if (err) throw err
          if (doc) {
            console.log(doc.username);
            return JSON.parse(JSON.stringify(doc));
        }
        });
    //console.log(callback);
*/
}

module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10,(err,salt) => {
        bcrypt.hash(newUser.password,salt, (err,hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword,hash, (err, isMatch) => {
        if(err)throw err;
        callback(null, isMatch);
    });    
}


module.exports.addData = function(newData, callback){
    user1 = JSON;
    //console.log(newData.time);
    let date1 = new Date(newData.time);
    //date1 = date1 + 19800000;
    console.log(date1);
    const userN = newData.username;
    const query = {username:userN}
    User.findOne(query,function(err, doc) {
        if (err) throw err
          if (doc) {
            user1 = {
                data : newData.data,
                time : date1
            }
            console.log(user1);
            //doc.waterData.data = newData.data;
            //doc.waterData.time = newData.time;
            doc.waterData.push(user1);
            doc.save(callback);
        }
        });
    //user1 = User.getUserByUsername(userN);
    //console.log(user1.type);
    //console.log(user1);
    //user1.waterData = newData;
    //user1.save(callback);
    
}
