const mongoose = require('mongoose');
const User = mongoose.model('Users');

function createFakeToken() {
  return Math.floor(Math.random() * 1000000);
};

module.exports.deleteAllUsers = function() {
  User.deleteMany({}, (err) => {
    if (err)
      console.log('delete many users err:', err);
  });
};

module.exports.getUser = function(req, res) {
  console.log('getting user...');
  User.findOne({ 'name': req.params.username }, function(err, User) {
    if (err)
      res.status(500).send(err);
    res.json(User)
  })
};

module.exports.getAllUsers = function(req, res) {
  User.find({}, function(err, Users) {
    if (err)
      res.status(500).send(err);
    res.json(Users)
  })
};

module.exports.createUser = function(req, res) {
  console.log("creating user...");
  User.findOne({ 'name': req.body.name }, (err, user) => {
    if (!user) {
      let new_user = new User(req.body);
      new_user.save(function(err, user) {
        if (err)
        res.send(err);
        res.json(user);
      });
    } else {
      res.status(500);
      res.json({err: 'Create user error.'});
    }
  });
};

module.exports.userLogin = function(req, res) {
  console.log("Logging in...");
  User.findOne({ 'name': req.body.name })
  .then((user) => {
    console.log('notuser', !user);
    if (!user) {
      res.status(404);
      console.log("didn't find user");
    } else if (user.password === req.body.password) {
      user.token = createFakeToken();
      user.save();
      res.json({token: user.token});
    }
  }).catch(err => console.log(err));
};
