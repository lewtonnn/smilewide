require('dotenv').config({ path: '../.end' });
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
console.log(ExtractJwt.fromAuthHeaderAsBearerToken());
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  User.findById(jwt_payload.user_id, function(err, user) {
    if (!user) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
}));