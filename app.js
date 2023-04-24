const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
// const marked = require("marked");
// const MongoStore = require('connect-mongo')(new session);

const app = express();
// config .env file
require('dotenv').config();
// DB Config
const db = require('./config/keys').MongoURI;

// Passport Config
require('./config/passport')(passport);

// // Connect to MongoDB
// mongoose
//   .connect(db, { useNewUrlParser: true })
//   .then(() => console.log('MongoDB Connected'))
//   .catch((err) => console.log(err));
// Connect to MongoDB
// mongoose
//   .createConnection(db, { useNewUrlParser: true },()=>
//     {console.log('MongoDB Connected')});

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
// set async option for EJS rendering
// app.locals.async = true;

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);
// session store in mongo db
// const sessionstore = new MongoStore({
//   mongooseConnection: mongoose.connection,
//   collection: 'sessions',
// });
// // Express session
// app.use(
//   session({
//     secret: 'secret',
//     // resave: true,
//     resave: false,
//     saveUninitialized: true,
//     store: sessionstore,
//     cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24 hours
//   })
// );

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  //console.log(req.session);
  //console.log('req.user', req.user);
  next();
});
// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
app.use('/admin', require('./routes/admin.js'));
app.use('/resource', require('./routes/resource.js'));
app.use('/admin/resource', require('./routes/admin_resource.js'));
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on  ${PORT}`));

// error middleware for custom error to help find the error
app.use((err, req, res, next) => {
  const errorStatus = err.statusCode || 500;
  const errorMessages = err.message || 'Something went wrong';
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessages,
    stack: err.stack,
  });
});
module.exports = app;
