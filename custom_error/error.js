// This file contains the custom error class
module.exports.createError = (status, message) => {
    const err= new Error(message);
    err.statusCode = status;
    err.message=message;
    return err;
};
