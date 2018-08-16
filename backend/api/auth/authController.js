const mongoose = require('mongoose')
const Token = mongoose.model('Tokens');
const crypto = require('crypto');
const hash = crypto.createHash('sha256');

module.exports.handleLogin = function(req, res) {

}
