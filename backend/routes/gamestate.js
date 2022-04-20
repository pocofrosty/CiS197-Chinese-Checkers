const express = require('express')

const Gamestate = require('../models/gamestate')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const { body: { _id } } = req
    const gamestate = await Gamestate.findById(_id)
    res.json(gamestate)
  } catch (err) {
    next(err)
  }
})

router.post('/add', async (req, res, next) => {
  try {
    const { board, turn } = req
    await Gamestate.create({ board, turn })
    res.send('Gamestate sucessfully added')
  } catch (err) {
    next(err)
  }
})

router.post('/update', async (req, res, next) => {
  try {
    const { body: { board, _id } } = req
    await Gamestate.updateOne({ _id }, { board })
    res.send('Gamestate Updated')
  } catch (err) {
    next(err)
  }
})

module.exports = router
