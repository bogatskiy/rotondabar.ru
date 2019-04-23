'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const News = new Schema({
	title: {type: String, required: true},
	date: Date,
	desc: {type: String},
	img: {type: String},
})

mongoose.model('news', News)