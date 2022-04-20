const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const cookieSession = require('cookie-session')
const passport = require('passport')

const keys = require('./keys')

const MONGO_URI = process.env.MONGO_URI || keys.mongoDB.database

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const app = express()

app.use(cookieSession({
  keys: [keys.session.cookieKey],
  maxAge: 60 * 60 * 1000,
}))

app.use(express.json())
app.use(express.static('dist'))
app.use(cors())

app.use(passport.initialize())
app.use(passport.session())

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send(err.message)
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(3000, () => {
  console.log('listening on 3000')
})
