var express = require('express');
var router = express.Router();
var Pessoa = require('../controllers/pessoa');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Pessoa.list()
    .then(dados =>
      res.jsonp(dados)
    )
    .catch(erro => res.jsonp(erro))
});

router.post('/', function(req, res, next) {
  Pessoa.insert(req.body)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.jsonp(erro))
});

router.put('/:id', function(req, res, next) {
  Pessoa.update(req.params.id, req.body)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.jsonp(erro))
});

router.delete('/:id', function(req, res, next) {
  Pessoa.delete(req.params.id, req.body)
  .then(dados => res.jsonp(dados))
    // .then(console.log("Deleted " + req.params.id))
    // .catch(erro => res.jsonp(erro))
});

module.exports = router;