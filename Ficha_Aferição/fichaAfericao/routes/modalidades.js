var express = require('express');
var router = express.Router();
var Modalidade = require('../controllers/modalidade');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Modalidade.list()
    .then(dados =>
      res.jsonp(dados)
    )
    .catch(erro => res.jsonp(erro))
});

module.exports = router;