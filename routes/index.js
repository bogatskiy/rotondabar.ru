'use strict';

const router = require('express').Router()

router.get('/', async (req, res) => {

  let obj = {
    page: 'Главная',
    title: 'Кафе-бар у открытого подогреваемого бассейна.',
    description: '',
    className: 'menu.pug',
    user: req.user
  }
  
  res.render('pages/index', obj);
})

module.exports = router;



