const mongoose = require('mongoose');

const connectdb = mongoose.createConnection(process.env.MONGO_URI);
const connectdb_k = mongoose.createConnection(process.env.MongoURI);
module.exports = { connectdb, connectdb_k };
