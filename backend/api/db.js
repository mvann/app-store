const mongoose = require('mongoose');
const username = 'my-user';
const password = 'hackathon';
const uri = 'mongodb+srv://'+
`${username}:${password}`+
'@app-store-hackathon-lf3sk.gcp.mongodb.net/test?retryWrites=true';

module.exports.connect = (function () {
  mongoose.connect(uri);

  return mongoose.connection;
})();

module.exports.uri = uri;
