const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const http = require('http')
const cookieSession = require('cookie-session')
const passport = require('passport')

const AuthRouter = require('./routes/auth')
const AccountRouter = require('./routes/account')
const GamestateRouter = require('./routes/gamestate')

const PassportSetup = require('./authentication/passport-setup')

const keys = require('./keys')

const MONGO_URI = process.env.MONGO_URI || keys.mongoDB.database

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const app = express()
const server = http.createServer(app)
const io = new http.Server(server)

io.on('connection', socket => {
  console.log('a user is connected')
  socket.on('update', data => {
    io.emit('update', data)
  })
})

app.use(cookieSession({
  keys: [keys.session.cookieKey],
  maxAge: 60 * 60 * 1000,
}))

app.use(express.json())
app.use(express.static('dist'))
app.use(cors())

app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', AuthRouter)
app.use('/account', AccountRouter)
app.use('/gamestate', GamestateRouter)

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
