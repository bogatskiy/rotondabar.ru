'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MenuItemSchema = new Schema({
	img: {type: String, default: ''},
	title: {type: String},
	desc: String,
	weight: String,
	price: {type: Number},
	section: { type: Schema.Types.ObjectId, ref: 'menu' }
})

const MenuSchema = new Schema({
	section: {
		type: String,
		required: true,
		unique: true
	},
	position: {type: Number, default: 1},
	items: [{ type: Schema.Types.ObjectId, ref: 'menuItem' }]
})

mongoose.model('menu', MenuSchema)
mongoose.model('menuItem', MenuItemSchema)