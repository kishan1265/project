const mongoose = require('mongoose');

// const connectdb = (url) => {
//     return mongoose.connect(url);
// }



// module.exports=connectdb;
const connectdb = mongoose
    .createConnection(process.env.MONGO_URI);
const connectdb_k= mongoose
    .createConnection(process.env.MongoURI);
module.exports = {connectdb,connectdb_k};
