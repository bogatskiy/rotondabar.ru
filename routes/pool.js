'use strict';

const router = require('express').Router()

router.get('/', async (req, res) => {

  let obj = {
    page: "Бассейн",
    title: 'Открытый бассейн красная поляна',
    className: 'pool',
    user: req.user
  }

  res.render('pages/pool', obj);
})

module.exports = router;