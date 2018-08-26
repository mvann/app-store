const mongoose = require('mongoose')
const Schema = mongoose.Schema

var PackageSchema = new Schema({
    name: {
      type: String,
      required: 'A name is required.'
    },
    fileName: {
      type: String,
      required: 'A fileName is required.'
    },
    storedFileName: {
      type: String,
      required: 'A storedFileName is required.'
    },
    fileId: {
      type: String,
      require: 'A fileId is required.'
    },
    // fileBuffer: {
    //   type: Buffer,
    //   require: 'A fileBuffer is required.'
    // },
    status: {
      type: String,
      default: 'pending'
    },
    mimetype: {
      type: String
    },
    Created_at: {
      type: Date,
      default: Date.now
    }
})

module.exports = mongoose.model('Packages', PackageSchema);
