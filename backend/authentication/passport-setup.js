const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')

const Account = require('../models/account')

const keys = require('../keys')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  Account.findById(id).then(user => {
    done(null, user)
  })
})

passport.use(new GoogleStrategy({
  callbackURL: 'http://localhost:3000/auth/google/redirect',
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret,
}, (accessToken, refreshToken, profile, done) => {
  Account.findOne({ googleId: profile.id }).then(currentAccount => {
    if (currentAccount) {
      console.log(currentAccount)
      done(null, currentAccount)
    } else {
      new Account({
        username: profile.displayName,
        password: null,
        googleID: profile.id,
      }).save().then(newAccount => {
        done(null, newAccount)
      })
    }
  })
  console.log('Done')
}))
