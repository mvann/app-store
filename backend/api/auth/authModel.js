const mongoose = require('mongoose')
const Schema = mongoose.Schema

var TokenSchema = new Schema({
    name: {
      type: String,
      required: 'A name is required.'
    },
    token: {
      type: String,
      required: 'A token is required.'
    }
    Created_at: {
      type: Date,
      default: Date.now
    }
})

module.exports = mongoose.model('Tokens', UserSchema)
