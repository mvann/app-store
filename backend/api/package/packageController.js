const mongoose = require('mongoose');
const Package = mongoose.model('Packages');
const repo = require('../../flask-communication');
const conn = mongoose.connection;
const Grid = require('gridfs-stream');

let gfs;

conn.once('open', (err) => {
  console.log('in package controller...');
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
  // removeAllPackages();
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
  // gfs.files.find().toArray((err, files) => {
  //   // Check if files
  //   if (!files || files.length === 0) {
  //     res.render('index', { files: false });
  //   } else {
  //     // files.map(file => {
  //     //   if (
  //     //     file.contentType === 'image/jpeg' ||
  //     //     file.contentType === 'image/png'
  //     //   ) {
  //     //     file.isImage = true;
  //     //   } else {
  //     //     file.isImage = false;
  //     //   }
  //     // });
  //     res.json({ files: files });
  //   }
  // });
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
      // res.json(file);
    }
  });
}

module.exports.handleUpload = function(req, res, next) {
  console.log("handlingUpload");
  console.log(req.body);
  console.log(req.file);
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
