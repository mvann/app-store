const mongoose = require('mongoose')
const User = mongoose.model('Users')

module.exports.getUser = function(req, res) {
  User.findOne({ 'name': req.params.username }, function(err, User) {
    res.json(User)
  })
}

module.exports.getAllUsers = function(req, res) {
  User.find({}, function(err, Users) {
    res.json(Users)
  })
}

module.exports.createUser = function(req, res) {
  console.log("creating user...");
  User.findOneAndUpdate({ 'name': req.params.username })
  let new_user = new User(req.body);
  new_user.save(function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  })
}
