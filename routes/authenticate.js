
/*
 * Part of passport.js used for authentication.
 */

var mongoose   = require('mongoose');
var Project    = require('../models/project');
var Service    = require('../models/service');
var User       = require('../models/user');
var Repository = require('../models/repository');
var config     = require ('../config.json');

var passport  = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , flash = require ('connect-flash');

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});


var user = mongoose.model('user');

// user.find({}, function(err,todos) {
//   todos.forEach(function(todo) {
//     console.log(todo);
    
//   })    
// });
// Use the LocalStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.  In the real world, this would query a database;
//   however, in this example we are using a baked-in set of users.
passport.use(new LocalStrategy(
  function(username, password, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      user.findOne({name: username}, function(err,doc){
        //chek if such user exists
        if (doc !== null) {
          if (doc.password == password) {
            return done (null, doc, doc.role);
          }
          else {
            return done (null, false, {message : 'Invalid Password'});
          }
        }
        else {
          return done (null, null, {message : 'Invalid User'});
        }
      });
    });
  }
));