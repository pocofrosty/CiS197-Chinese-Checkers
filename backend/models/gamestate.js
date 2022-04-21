const mongoose = require('mongoose')

const { Schema, model } = mongoose

const gamestateSchema = new Schema({
  name: { type: String, unique: true },
  board: { type: Object },
  turn: { type: Number },
})

const Gamestate = model('Gamestate', gamestateSchema)

module.exports = Gamestate
