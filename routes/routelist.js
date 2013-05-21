/*
 * GET/Post home page.
 */
var mongoose = require('mongoose');
var Account = require('../models/account');
var Service = require('../models/service');
var Project = require('../models/project');
var config     = require ('../config.json');

// mongoose.connect(MONGOOSE URL)

// GET home page.
exports.index = function(req, res){
  res.render('index', { title: 'RedSyS' });
};

//sign out- delete session variables
exports.signOut = function (req, res) {
	 // delete the session variable
    delete req.session.userid;
    delete req.session.adminid;
    // redirect user to homepage
    res.redirect('/');
}

exports.getAdminPage = function (req, res) {
	//check if some admin is logged in
	if (req.session.adminid) {
		res.render('admin', { title: 'RedSyS' });
	}
	else {
		res.render('index', { title: 'RedSyS' });
	}
};

exports.getUserPage = function (req, res) {
	//very that a 'user' role is logged in - 
	if (req.session.userid) {
		res.render('user', { title: 'RedSyS' });
	}
	else {
		res.render('index', { title: 'RedSyS' });		
	}

};

/* post '/authenticate' */
exports.authenticate = function (req, res)	{
	Account.findOne({name: req.body.username}, function(err,docs){
		//username found
		if (docs !== null) {
			//correct password
			if (req.body.password === docs.password) {
				//check role of the account is user 
				if (docs.role === 1) {
					// store the username as a session variable
    				req.session.userid = docs._id;
					res.redirect('/user');
				}
				//else role is admin
				else {
					// store the username as a session variable
    				req.session.adminid = docs._id;
					res.redirect('/admin');
				}
			}
			//incorrect password
			else {
				res.render('index', { title: 'RedSyS' });
			}
		}
		//no such user found
		else {
		 	res.render('index', { title: 'RedSyS' });
		}
	});
}

//Admin related pages - 
exports.getServices = function (req, res) {
	//check if some admin is logged in
	if (!req.session.adminid) {
		res.render('index', { title: 'RedSyS' });
	}

	Service.find({}, function(err,docs){
		//if 1 or more service is found
		if (docs !== null) {
			console.log (docs);
			res.render('service', {title: 'RedSyS',
				services : docs});
		}
	});
}

exports.getUsers    = function (req, res) {
	//check if some admin is logged in
	if (!req.session.adminid) {
		res.render('index', { title: 'RedSyS' });
	}

	Account.find({}, function(err,docs){
		//if 1 or more service is found
		if (docs !== null) {
			console.log (docs);
			res.render('admin-userList', {title: 'RedSyS',
				users : docs});
		}
	});
}

exports.getProjects = function (req, res) {
	//check if some admin is logged in
	if (!req.session.adminid) {
		res.render('index', { title: 'RedSyS' });
	}
	Project.find({}, function(err,docs){
		//if 1 or more service is found
		if (docs !== null) {
			console.log (docs);
			res.render('project', {title: 'RedSyS',
				projects : docs});
		}
	});
	console.log ('getting projects');
}