'use strict'

const express = require('express')
const app = express()

require('./mongoose')

const
	http = require('http'),
	path = require('path'),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
	server = http.createServer(app),
	config = require('./config.json'),
	favicon = require('serve-favicon'),
	csrf = require('csurf'),
	cookie = require('cookie-parser'),
	passport = require('passport'),
	expressSession = require('express-session'),
	initPassport = require('./passport/init'),
	flash = require('connect-flash'),
	routes = require('./routes/login')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.disable('x-powered-by')
app.use(favicon(path.join(__dirname, './public/assets/img', 'favicon.png')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookie(config.cookiepass))
app.use(express.static(path.join(__dirname, './public')))

// Configuring Passport
app.use(expressSession({resave: true, saveUninitialized: false, secret: config.cookiepass}))
app.use(passport.initialize())
app.use(passport.session())

app.use(flash());


initPassport(passport);

app.use(csrf())
app.use((req, res, next) => {
	res.locals._csrfToken = req.csrfToken()
	next()
})

// app.use('/', require('./routes/index'))
app.use('/', routes);
app.use('/menu', require('./routes/menu'))
app.use('/contact', require('./routes/contact'))
app.use('/pool', require('./routes/pool'))
app.use('/news', require('./routes/news'))


app.use((req, res, next) => res.status(404).render('404'))

app.use(function (err, req, res, next) {
	console.error(err.stack)
	res.status(500).render('500')
})

server.listen(config.server.port, config.server.ip)

server.on('listening', () => {
})