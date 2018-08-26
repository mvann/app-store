const api = require('express').Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./user/userModel');
require('./package/packageModel');
const db = require('./db').connect;
const userRouter = require('./user/userRoutes');
const packageRouter = require('./package/packageRoutes');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(err) {
  if (err)
    console.log(err);
  else
    console.log('Mongoose connected...');
});

api.get('/', (req, res) => {
  res.send("There's nothing to get at this route.");
});

api.use(bodyParser.json());
api.use('/users', userRouter);
api.use('/packages', packageRouter);

module.exports = api;
