const mongoose = require('mongoose');
const conn = mongoose.connection;
const Package = mongoose.model('Packages');
const repo = require('../../flask-communication');
const Grid = require('gridfs-stream');

let gfs;

conn.once('open', (err) => {
  console.log('in package controller...');
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

function removeAllPackages() {
  Package.deleteMany({}, (err) => {
    if (err)
      console.log('delete many err:', err);
  });
};

module.exports.getAllPackages = function(req, res) {
  Package.find({}, function(err, Packages) {
    res.json(Packages);
  });
};

module.exports.getFile = function(req, res) {
  console.log(req.body);
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file) {
      console.log('file not found');
      res.status(404).json({ err: 'File not found.' });
    } else {
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    }
  });
}

module.exports.handleUpload = function(req, res, next) {
  console.log("handlingUpload");
  let new_package = new Package({
    name: req.body.packageName,
    fileName: req.file.originalname,
    storedFileName: req.file.filename,
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
      let readstream = gfs.createReadStream({
        filename: pack.storedFileName
      });
      repo.uploadFileToRepo(readstream, res);
    } else
      res.send(err);
  });
};

module.exports.reject = function(req, res) {
  Package.findByIdAndUpdate(req.body.id, {status: 'reject'}, (err, pack) => {
    console.log('Changed pack status to reject.');
  });
  res.send('rej');
};

module.exports.reset = function(req, res) {
  Package.findByIdAndUpdate(req.body.id, {status: 'pending'}, (err, pack) => {
    console.log('resetting pack');
  });
  res.send('pending');
};
