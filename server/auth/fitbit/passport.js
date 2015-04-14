'use strict';

var passport = require('passport');
var OAuthStrategy = require('passport-oauth').OAuthStrategy;

var facebookAuth = {
  setup: function (User, config) {
    passport.use('fitbit', new OAuthStrategy({
        requestTokenURL: config.fitbit.requestTokenURL,
        accessTokenURL: config.fitbit.accessTokenURL,
        userAuthorizationURL: config.fitbit.userAuthorizationURL,
        consumerKey: config.fitbit.consumerKey,
        consumerSecret: config.fitbit.consumerSecret,
        callbackURL: config.fitbit.callbackURL,
        passReqToCallback: true
      },
      function(req, accessToken, tokenSecret, profile, done) {
        User.findOne({
          '_id': req.user._id
        },
        function(err, user) {
          if(err){
            return done(err);
          }
          if(user){
            user.fitnessDevice.token = accessToken;
            user.fitnessDevice.tokenSecret = tokenSecret; 
            user.save(function(err) {
              if(err){
                return done(err, user);
              }
            });
          } else {
            return done(err, user);
          }
        });
      }
    ));
  }
};

module.exports = facebookAuth;
