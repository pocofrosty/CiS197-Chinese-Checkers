const mongoose = require('mongoose')

const { Schema, model } = mongoose

const gamestateSchema = new Schema({
  board: { type: Object, required: true },
  turn: { type: Number, required: true},
})

const Gamestate = model('Gamestate', gamestateSchema)

module.exports = Gamestate
