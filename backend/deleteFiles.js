const db = require('./api/db').connect;
const mongoose = require('mongoose');
require('./api/package/packageModel');
const Package = mongoose.model('Packages');

db.once('open', function(){
  Package.deleteMany({}, (err) => {
    if (err)
      console.log('delete many err:', err);
    else
      console.log('deleted packages');
  });
});
