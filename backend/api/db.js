const mongoose = require('mongoose');
const username = 'my-user';
const password = 'hackathon';
const uri = 'mongodb+srv://'+
`${username}:${password}`+
'@app-store-hackathon-lf3sk.gcp.mongodb.net/test?retryWrites=true';

mongoose.connect(uri);

module.exports = mongoose.connection;
