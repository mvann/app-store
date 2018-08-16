const api = require('express').Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const authRouter = require('./auth/auth');
require('./user/userModel');
// require('./auth/authModel');
const userRouter = require('./user/userRoutes');
const db = require('./db')

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(err) {
  console.log('Mongoose connected...')
})

api.get('/', (req, res) => {
  res.send('api yo')
});

api.use(bodyParser.json());
// api.use('/auth', authRouter);
api.use('/users', userRouter);

module.exports = api;
