const mongoose = require('mongoose')
const Schema = mongoose.Schema

var UserSchema = new Schema({
    name: {
      type: String,
      required: 'A name is required.'
    },
    password: {
      type: String,
      required: 'A password is required.'
    },
    token: {
      type: String
    },
    Created_at: {
      type: Date,
      default: Date.now
    }
})

module.exports = mongoose.model('Users', UserSchema)
