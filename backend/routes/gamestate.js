const express = require('express')

const Gamestate = require('../models/gamestate')

const router = express.Router()

router.post('/find', async (req, res, next) => {
  try {
    const { body: { name: name2 } } = req
    console.log(name2)
    const gamestate = await Gamestate.findOne({ name: name2 })
    res.json(gamestate)
  } catch (err) {
    next(err)
  }
})

router.post('/add', async (req, res, next) => {
  try {
    const { body: { name, board, turn } } = req
    await Gamestate.create({ name, board, turn })
    res.send('Gamestate sucessfully added')
  } catch (err) {
    next(err)
  }
})

router.post('/update', async (req, res, next) => {
  try {
    const { body: { board, name } } = req
    await Gamestate.updateOne({ name }, { board })
    res.send('Gamestate Updated')
  } catch (err) {
    next(err)
  }
})

module.exports = router
