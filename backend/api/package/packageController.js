const mongoose = require('mongoose');
const Package = mongoose.model('Packages');
const repo = require('../../flask-communication');

module.exports.getAllPackages = function(req, res) {
  Package.find({}, function(err, Packages) {
    res.json(Packages)
  });
};

module.exports.handleUpload = function(req, res, next) {
  console.log("handlingUpload");
  console.log(req.body);
  console.log(req.file);
  let new_package = new Package({
    name: req.body.packageName,
    fileName: req.file.originalname,
    fileBuffer: req.file.buffer,
    mimetype: req.file.mimetype
  });
  new_package.save((err, package) => {
    if (err)
      res.send(err);
    res.json(package);
  });
};

module.exports.approve = function(req, res) {
  Package.findByIdAndUpdate(req.body.id, {status: 'approved'}, (err, pack) => {
    if (pack) {
      repo.uploadFileToRepo(pack.fileBuffer);
    } else
      res.send(err);
  });
  res.send('suh');
};

module.exports.reject = function(req, res) {
  Package.findByIdAndUpdate(req.body.id, {status: 'reject'}, (err, pack) => {
    console.log(pack);
  });
  res.send('rej');
};

module.exports.reset = function(req, res) {
  Package.findByIdAndUpdate(req.body.id, {status: 'pending'}, (err, pack) => {
    console.log(pack);
  });
  res.send('pending');
};
