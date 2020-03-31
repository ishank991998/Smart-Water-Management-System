const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

// Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    phoneNum: req.body.phoneNum,
    address: req.body.address
  });

  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({ success: false, msg: 'Failed to register user' });
    } else {
      res.json({ success: true, msg: 'User registered' });
    }
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  //console.log(username);
  //console.log('in users.auth');
  User.getUserByUsername(username, (err, user) => {
    if (err) {
      console.log(err);
      throw err;
    }
    if (!user) {
      console.log('user not found');
      return res.json({ success: false, msg: 'User not found' });
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        console.log('matched Pwd');
        const token = jwt.sign({ data: user }, config.secret, {
          expiresIn: 604800 // 1 week
        });

        console.log('inside comparePwd');
        res.json({
          success: true,
          token: ' jwt ' + token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            phoneNum : user.phoneNum,
            address: user.address
          }
        });
      } else {
        console.log('wrong pwd');
        return res.json({ success: false, msg: 'Wrong password' });
      }
    });
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  res.json({ 
    user: {
      id: req.user._id,
      name: req.user.name,
      username: req.user.username,
      email: req.user.email,
    }
  });
  //Console.post(user);
});

router.post('/dashboard',(req,res,next) => {
  let newData = ({
    username: req.body.username,
    data: req.body.data,
    time: Date.now()
  });

  console.log(newData);
  console.log(newData + '  : inside backend dashboard');

  User.addData(newData, (err, data) => {
    if (err) {
      console.log(err);
      res.json({ success: false, msg: 'Failed to store data' });
    } else {
      console.log('stored data')
      res.json({ success: true, msg: 'Data stored' });
    }
  });
  

});



module.exports = router;
