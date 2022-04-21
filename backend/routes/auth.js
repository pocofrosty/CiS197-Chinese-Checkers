const express = require('express')
const passport = require('passport')

const router = express.Router()

router.get('/google', passport.authenticate('google', {
  scope: ['profile'],
}))

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('http://localhost:1234/gameboard')
})

module.exports = router
