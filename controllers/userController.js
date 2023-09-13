const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');

const JWT_SECRET =
  'hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe';

//Load User model
const User = require('../models/User');

// strong password
function isStrongPassword(password) {
  const minLength = 6; // Minimum length requirement
  const maxLength = 12; // Maximum length requirement
  const hasUpperCase = /[A-Z]/.test(password); // Upper case letters requirement
  const hasLowerCase = /[a-z]/.test(password); // Lower case letters requirement
  const hasNumber = /[0-9]/.test(password); // Numbers requirement
  const hasSpecialChar = /[$&+,:;=?@#|'<>.^*()%!-]/.test(password); // Special characters requirement

  if (password.length < minLength || password.length > maxLength) {
    return false;
  }

  if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
    return false;
  }

  return true;
}

//check valid email
function isEmail(email) {
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
    (email[4] == '0' && email[5] == '0') ||
    email[6] >= '6'
  ) {
    return false;
  }
  return true;
}

// Register handle
module.exports.register = (req, res) => {
  const { name, email, programe, batch, password, password2 } = req.body;
  let errors = [];

  //check required fields
  var emailcheck = email.substr(6, 3);
  emailcheck = parseInt(emailcheck);

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
  if (isEmail(email) == false) {
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
        // 4 round  159 days
        // 12 round > 3 years
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
                  subject: 'Congrats!! Welcome to Programming Club',
                  html:
                    '<h3>Hi,</h3><h1>Welcome to the Programming Club website.</h1><h3>You have created this account with the email: ' +
                    email +
                    '</h3><a href="https://programming-club-daiict.up.railway.app/users/login"><button style="appearance: none; border: none; font-size: inherit;border-radius: 2em;padding: 0.75em 1em;background: blue;color: white;display: inline-flex;align-items: center;">Login</button></a> <h3>Note: If not done by you, visit the website and proceed with the forgot password procedure.</h3><h3>Happy Coding!!</h3><h3>Team Programming Club</h3>',
                };

                transporter.sendMail(mailOptions, function (error, info) {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log('Email sent: ' + info.response);
                  }
                });
                res.redirect('/users/login');
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
};

// Login handle
module.exports.login = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true,
  })(req, res, next);
};

//logout handle
module.exports.logout = (req, res) => {
  req.logout(function (err) {
    req.flash('success_msg', 'You are logged out');
    res.redirect('/');
  });
};

//forgot password
module.exports.forgot = (req, res) => {
  const email = req.body.email;
  let errors = [];

  if (!email) {
    errors.push({ msg: 'Please enter all fields' });
  }

  //check email id of daiict
  if (isEmail(email) == false) {
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
          const link = `http://localhost:5000/users/reset/${user._id}/${token}`;

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
        errors.push({ msg: 'This email is not registered yet' });
        res.render('forgot', {
          errors,
          email,
        });
      }
    });
  }
};

//reset password page
module.exports.reset_page = (req, res) => {
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
};

//reset password submit
module.exports.reset_submit = (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  let errors = [];

  if (!isStrongPassword(password)) {
    errors.push({
      msg: 'Password must be at least 8 characters long and must contain at least one upper case letter, one lower case letter, one number and one special character',
    });
  }

  if (errors.length > 0) {
    res.render(`reset`, {
      errors,
    });
  }

  //res.send('pass');
  User.findOne({ _id: id }).then((user) => {
    if (!user) {
      errors.push({ msg: 'User not exists' });
      res.render('forget', {
        errors,
        email,
      });
    }

    try {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) throw err;
          var newpassword = hash;
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
      res.redirect('/users/login');
    } catch (error) {
      console.log(error);
      res.json({ status: 'Something went wrong' });
    }
  });
};
