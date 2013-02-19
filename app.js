
/**
 * Module dependencies.
 */

var express   = require('express')
  , routes    = require('./routes')
  , user      = require('./routes/user')
  , routelist = require('./routes/routelist')
  , http      = require('http')
  , path      = require('path')
  , flash = require('connect-flash')
  , passport  = require('passport')
  , LocalStrategy = require('passport-local').Strategy;


var app = express();
app.configure(function(){
  app.set('port', process.env.PORT || 5000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(flash());
  // Initialize Passport!  Also use passport.session() middleware, to support
  // persistent login sessions (recommended).
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);


app.get('/login', routelist.login);

app.post('/welcome', 
  passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
  function(req, res) {
    if (req.user.role == 'Admin')
      res.redirect('/adim');
    else 
      res.redirect('/user');
  });

app.get('/admin', ensureAuthenticated, function(req, res){
  if (req.user.role == 'Admin')
    res.render('/account');
  else 
    res.render('/user');
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
