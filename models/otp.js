const mongoose = require('mongoose');
//const conn = require('../config/db')
const conn_k = require('../db/connectdb.js').connectdb_k;
const OtpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    expirein: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const otp = conn_k.model('otp', OtpSchema);

module.exports = otp;
