let express = require('express')
let router = express.Router()

let isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated())
		return next()
	res.redirect('/')
}

module.exports = function(passport){

	router.get('/', function(req, res) {
		let obj = {
			page: 'Главная',
			title: 'Кафе-бар у открытого подогреваемого бассейна.',
			description: '',
			className: 'menu.pug',
			user: req.user,
			message: req.flash('message'),
		}
		res.render('pages/index', obj)
	})

	router.get('/login', function(req, res){
		res.render('pages/login/login',{message: req.flash('message'), className: 'login'})
	})

	router.post('/login', passport.authenticate('login', {
		successRedirect: '/',
		failureRedirect: '/',
		failureFlash : true
	}))

	router.get('/signup', function(req, res){
		res.render('pages/login/register',{message: req.flash('message'), className: 'signup'})
	})

	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/',
		failureRedirect: '/',
		failureFlash : true
	}))

	router.get('/home', isAuthenticated, function(req, res){
		res.render('pages/login/dashboard', { user: req.user })
	})

	router.get('/signout', function(req, res) {
		req.logout()
		res.redirect('/')
	})

	return router
}