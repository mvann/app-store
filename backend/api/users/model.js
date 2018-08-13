const mongoose = require('mongoose')
const Schema = mongoose.Schema

var UserSchema = new Schema({
    name: {
      type: String,
      required: 'A name is required.'
    },
    Created_at: {
      type: Date,
      default: Date.now
    }
})

module.exports = mongoose.model('Users', UserSchema)
