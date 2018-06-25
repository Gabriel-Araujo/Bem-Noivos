const { Strategy, ExtractJwt } = require('passport-jwt');
const mongoose = require('mongoose');
const Keys = require('../config/keys');

const User = mongoose.model('users');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = Keys.secretJWT;

module.exports = passport => {
  passport.use(
    new Strategy(opts, (jwtPayload, done) => {
      User.findById(jwtPayload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    }),
  );
};
