const mongoose = require('mongoose');
const conn_k = require('../db/connectdb.js').connectdb_k;
const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Admin = conn_k.model('Admin', adminSchema);
//const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
