const crypto = require('crypto');

exports.generateUsername = () => {
    var random = crypto.randomBytes(4).toString('hex');
    return `user_${random}`;
}