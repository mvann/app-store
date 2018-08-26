const mongoose = require('mongoose');
const conn = mongoose.connection;
const Package = mongoose.model('Packages');
const repo = require('../../flask-communication');
const Grid = require('gridfs-stream');
eval(`Grid.prototype.findOne = ${Grid.prototype.findOne.toString().replace('nextObject', 'next')}`);

let gfs;

conn.once('open', (err) => {
  console.log('in package controller...');
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

module.exports.removeFile = function(req, res) {
  gfs.remove({_id: req.params.id }, (err, gridStore) => {
    if (err)
      console.log(err);
    else
      console.log('Removed:', req.params.id);
  });
  res.send('attempted deletion');
}

module.exports.deleteAllPackages = function(req, res) {
  Package.deleteMany({}, (err) => {
    if (err)
      console.log('delete many err:', err);
  });
  res.send('deleted all package documents')
};

module.exports.getAllPackages = function(req, res) {
  Package.find({}, function(err, Packages) {
    res.json(Packages);
  });
};

module.exports.getAllFiles = function(req, res) {
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist'
      });
    }

    // Files exist
    return res.json(files);
  });
};

module.exports.getFile = function(req, res) {
  console.log(req.params);
  gfs.findOne({ _id: req.params.id }, (err, file) => {
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
    fileId: req.file.id,
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
      repo.uploadFileToRepo(readstream, pack.fileName, res);
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
