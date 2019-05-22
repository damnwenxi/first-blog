const crypto = require('crypto');
const {SALT}  = require('../config');

module.exports=(buffer)=>{
    const obj = crypto.createHash('md5');
    obj.update(buffer+SALT);
    return obj.digest('hex');
};