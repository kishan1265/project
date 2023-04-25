const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
router.use(express.static('public'));

const JWT_SECRET =
  'hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe';

//Load User model
const User = require('../models/User');
// const { forwardAuthenticated } = require("../config/auth");

// Login Page
router.get('/login', (req, res) => res.render('login'));

// Register Page
router.get('/register', (req, res) => res.render('register'));

// Forgot password page
router.get('/forgot', (req, res) => res.render('forgot'));

//router.get('/varify', (req, res) => res.render('emailvarify'));

//reset-password page
//router.get('/reset', (req, res) => res.render('reset'));

function isStrongPassword(password) {
  const minLength = 8; // Minimum length requirement
  const maxLength = 64; // Maximum length requirement
  const hasUpperCase = /[A-Z]/.test(password); // Upper case letters requirement
  const hasLowerCase = /[a-z]/.test(password); // Lower case letters requirement
  const hasNumber = /[0-9]/.test(password); // Numbers requirement
  const hasSpecialChar = /[$&+,:;=?@#|'<>.^*()%!-]/.test(password); // Special characters requirement
  const isCommonPassword = /password|123456|qwerty/i.test(password); // Common password check

  if (password.length < minLength || password.length > maxLength) {
    return false;
  }

  if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
    return false;
  }

  if (isCommonPassword) {
    return false;
  }

  return true;
}

// Register
router.post('/register', (req, res) => {
  //console.log(req.body);
  // res.send('hello');
  const { name, email, programe, batch, password, password2 } = req.body;
  let errors = [];

  //console.log(programe);
  //check required fields
  if (
    !name ||
    !email ||
    !password ||
    !password2 ||
    programe == '0' ||
    batch == '0'
  ) {
    errors.push({ msg: 'Please enter all fields' });
  }

  //check email id of daiict
  if (
    email.substr(-13, 13) != '@daiict.ac.in' ||
    email[1] != '0' ||
    email[0] != '2' ||
    !(email[4] == '0' || email[4] == '1' || email[4] == '2') ||
    !(
      email[5] == '0' ||
      email[5] == '1' ||
      email[5] == '2' ||
      email[5] == '3'
    ) ||
    email[6] >= '6'
  ) {
    errors.push({ msg: 'Please Register using correct daiict Id' });
  }

  if (!isStrongPassword(password)) {
    errors.push({
      msg: 'Password must be at least 8 characters long and must contain at least one upper case letter, one lower case letter, one number and one special character',
    });
  }

  if (password != password2) {
    //check passwords match
    errors.push({ msg: 'Passwords do not match' });
  }

  //check passwords match
  // if (password.length < 6) {
  //   errors.push({ msg: 'Password must be at least 6 characters' });
  // }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      programe,
      batch,
      password,
      password2,
    });
  } else {
    //res.send('pass');
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          programe,
          batch,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
          programe,
          batch,
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch((err) => console.log(err));
          });
        });
        // console.log(newUser);
        // res.send('hello');
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true,
  })(req, res, next);
});

//logout
router.get('/logout', (req, res) => {
  req.logout(function (err) {
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
  });
});

//forgot password

router.post('/forgot', (req, res) => {
  //console.log(req.body);
  // res.send('hello');
  const email = req.body.email;
  let errors = [];

  //console.log(programe);
  //check required fields
  if (!email) {
    errors.push({ msg: 'Please enter all fields' });
  }

  //check email id of daiict
  if (
    email.substr(-13, 13) != '@daiict.ac.in' ||
    email[1] != '0' ||
    email[0] != '2' ||
    !(email[4] == '0' || email[4] == '1' || email[4] == '2') ||
    !(
      email[5] == '0' ||
      email[5] == '1' ||
      email[5] == '2' ||
      email[5] == '3'
    ) ||
    email[6] >= '6'
  ) {
    errors.push({ msg: 'Please Register using correct daiict Id' });
  }

  if (errors.length > 0) {
    res.render('forgot', {
      errors,
      email,
    });
  } else {
    //res.send('pass');
    User.findOne({ email: email }).then((user) => {
      if (user) {
        try {
          const secret = JWT_SECRET + user.password;
          const token = jwt.sign({ email: user.email, id: user._id }, secret, {
            expiresIn: '5m',
          });
          const link = `https://programming-club-daiict.up.railway.app/users/reset/${user._id}/${token}`;

          var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'programming.club.daiict1@gmail.com',
              pass: 'eevoxrcznbpnupey',
            },
          });

          var mailOptions = {
            from: 'programming.club.daiict1@gmail.com',
            to: email,
            subject: 'Password Reset',
            text: link,
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });

          console.log(link);

          res.render('emailvarify', { email: user.email });
        } catch (error) {}
      } else {
        errors.push({ msg: 'Email not exists' });
        res.render('forgot', {
          errors,
          email,
        });
      }
    });
  }
});

router.get(`/reset/:id/:token`, (req, res) => {
  const { id, token } = req.params;
  //console.log(req.params);
  User.findOne({ _id: id }).then((user) => {
    if (!user) {
      errors.push({ msg: 'User not exists' });
      res.render('forget', {
        errors,
        email,
      });
    }
    const secret = JWT_SECRET + user.password;
    try {
      const verify = jwt.verify(token, secret);
      res.render('reset', { email: verify.email });
    } catch (error) {
      res.send('Not verified');
    }
  });
});

router.post(`/reset/:id/:token`, (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  let errors = [];
  // console.log(password);
  // console.log(req.params);

  //res.send('pass');
  User.findOne({ _id: id }).then((user) => {
    if (!user) {
      errors.push({ msg: 'User not exists' });
      res.render('forget', {
        errors,
        email,
      });
    }
    const secret = JWT_SECRET + user.password;

    try {
      const verify = jwt.verify(token, secret);
      //console.log(user.password + ' old');
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) throw err;
          var newpassword = hash;
          //console.log(newpassword + ' change');
          await User.updateOne(
            {
              _id: id,
            },
            {
              $set: {
                password: newpassword,
              },
            }
          );
        });
      });
      //console.log(user.password + ' change');
      //console.log(user.password + ' new');
      //res.json({ status: 'password updated' });
      //res.render('reset', { email: verify.email, status: 'verified' });
      //res.render('emailvarify', { email: verify.email });
      res.redirect('/users/login');
    } catch (error) {
      console.log(error);
      //res.send('Not verified');
      res.json({ status: 'Something went wrong' });
    }
  });
});

module.exports = router;
