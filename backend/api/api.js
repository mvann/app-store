const api = require('express').Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./user/userModel');
require('./package/packageModel');
const userRouter = require('./user/userRoutes');
const packageRouter = require('./package/packageRoutes');
const db = require('./db')

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(err) {
  console.log('Mongoose connected...')
})

api.get('/', (req, res) => {
  res.send('api yo')
});

api.use(bodyParser.json());
api.use('/users', userRouter);
api.use('/packages', packageRouter);

module.exports = api;
