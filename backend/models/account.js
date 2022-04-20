const mongoose = require('mongoose')

const { Schema, model } = mongoose

const accountSchema = new Schema({
  username: { type: String },
  googleID: { type: String },
})

const Account = model('Account', accountSchema)

module.exports = Account
