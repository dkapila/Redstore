
/*
 * List of routes.
 */

var mongoose   = require('mongoose');
var Project    = require('../models/project');
var Service    = require('../models/service');
var User       = require('../models/user');
var Repository = require('../models/repository');
var config     = require ('../config.json');

mongoose.connect(config.url);

exports.authenticate = function (req, res) {
    if (req.user.role == 'Admin') {
      res.render('admin', {title : 'RedStore Dashboard'});
    }
    else {
      res.render('user', {title : 'RedStore Dashboard'});
    }
}

exports.signOut = function (req, res) {
  req.logout();
  res.redirect('/');
}