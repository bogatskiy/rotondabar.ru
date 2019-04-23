'use strict';

const router = require('express').Router()

router.get('/', async (req, res) => {

  let obj = {
    page: "Контакты",
    title: 'Rotonda - контакты'
  }

  res.render('pages/contact', obj);
})

module.exports = router;