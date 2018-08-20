const mongoose = require('mongoose');
const Package = mongoose.model('Packages');

module.exports.getAllPackages = function(req, res) {
  Package.find({}, function(err, Packages) {
    res.json(Packages)
  })
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
