'use strict'

const config = require('../config')

const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect(`mongodb://${config.db.user}:${config.db.pass}@${config.db.host}/${config.db.name}`, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false
})
	.catch(e => {
		console.error(e)
		throw e
	})

require('../models/user')
require('../models/trip')
require('../models/news')
require('../models/menu')

module.exports = mongoose