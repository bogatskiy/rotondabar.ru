'use strict';

const router = require('express').Router()
const mongoose = require('mongoose')
const News = mongoose.model('news')

async function getNews(req, res) {
	const news = await News.find()
	let obj = {
		page: "Новости и Акции",
		title: 'Rotonda - Новости',
		news: news,
		className: 'news',
		user: req.user
	}
	return obj
}


router.get('/', async (req, res) => {
	res.render('pages/news', await getNews(req, res))
})


router.post('/', async (req, res) => {

  if (!req.body.title || !req.body.img || !req.body.desc) {
    return res.json({status: 'no data'})
  }

	let item = new News({
		date: Date(),
		title: req.body.title,
    img: req.body.img,
    city: req.body.date,
    desc: req.body.desc
  })
  item.save().then(
    // i => {
    //   return res.json({status: 'saved'});
    // },
		res.render('pages/news', await getNews(req, res))
		,
    e => {
      const error = Object
        .keys(e.error)
        .map(key => e.errors[key].message)
        .join(', ')
      res.json(error)
    }
  )
});

module.exports = router;