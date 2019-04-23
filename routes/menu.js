'use strict';

const router = require('express').Router()
const mongoose = require('mongoose')
const Menu = mongoose.model('menu')
const Item = mongoose.model('menuItem')

async function getMenu(req, res) {
	const menu = await Menu.find().populate('items').sort({position: 1})

	return {
		page: "Меню",
		title: 'Rotonda - menu',
		menu: menu,
		user: req.user,
		className: 'menu'
	}
}

router.get('/', async (req, res) => {

	let data = await getMenu(req, res)

	let item = await Item.findOne({_id: req.query.itemId})

	if (req.query.itemId)
		res.render('pages/menu/editMenuItem', {
			page: "Меню",
			title: `Редактирование: ${item.title}`,
			i: item,
			user: req.user,
			className: 'menu',
			edit: true
		})
	else
		res.render('pages/menu/index', data);

})

router.post('/addSection', async (req, res) => {

	let newSection = await new Menu()

	newSection.section = req.body.section
	newSection.position = req.body.position

	await newSection.save()

	res.redirect('/menu')
})

router.post('/addItem', async (req, res) => {

	let menu = await Menu.findOne({_id: req.body.id})

	let item = await new Item({
		img: req.body.img,
		title: req.body.title,
		desc: req.body.desc,
		weight: req.body.weight,
		price: req.body.price,
		section: req.body.id
	})

	menu.items.push(item)

	await item.save()
	await menu.save()


	res.redirect('/menu')
})

router.post('/itemEdit', async (req, res) => {

	let item = await Item.findOne({_id: req.body.itemId})

	item.img = req.body.img
	item.title = req.body.title
	item.desc = req.body.desc
	item.weight = req.body.weight
	item.price = req.body.price

	await item.save()
	res.redirect('/menu')

})

router.post('/delItem', async (req, res) => {

	const id = req.body._id
	let item = await Item.findOne({_id: id})
	let menu = await Menu.findOne({_id: item.section})

	let menuArray = menu.items.indexOf(id)
	menu.items.splice(menuArray,1)


	menu.save()
	item.remove()
	res.redirect('/menu')
})

module.exports = router;


