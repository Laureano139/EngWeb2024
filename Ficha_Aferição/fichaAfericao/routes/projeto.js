/* Operações CRUD sobre Projeto 
   2024-04-21 @jcr
   ----------------------- */
   var express = require('express');
   var router = express.Router();
   var Projeto = require('../controllers/projeto')
   var Entrega = require('../controllers/entrega')
   
   /* Listar as Projeto (R) */
   router.get('/', function(req, res) {
    if(req.query.uc){
        Projeto.findByUC(req.query.uc)
            .then(data => res.jsonp(data))
            .catch(erro => res.jsonp(erro))
    }
    else{
        Projeto.list()
           .then(data => res.jsonp(data))
           .catch(erro => res.jsonp(erro))
    }
   });
   
   /* Consultar uma Projeto (R) */
   router.get('/:id', function(req, res) {
       Projeto.findById(req.params.id)
          .then(info => {
            Entrega.countProjects(req.params.id)
              .then(nProjects => {
                info["Número de projetos"] = nProjects
                res.jsonp(info)
              })
          })
         .catch(erro => res.jsonp(erro))
     });
   
   /* Criar uma Projeto (C) */
   router.post('/', function(req, res) {
     Projeto.insert(req.body)
       .then(data => res.jsonp(data))
       .catch(erro => res.jsonp(erro))
   });
   
   /* Alterar uma Projeto (U) */
   router.put('/:id', function(req, res) {
    Entrega.countProjects(req.params.id)
    .then(nProj => {
      if(nProj == 0){
        Projeto.update(req.params.id, req.body)
         .then(data => res.jsonp(data))
         .catch(erro => res.jsonp(erro))
      }
    })
    .catch(erro => res.jsonp(erro))
    });
   
   /* Remover uma Projeto (D ) */
   router.delete('/:id', function(req, res) {
    Entrega.countProjects(req.params.id)
    .then(nProj => {
      if(nProj == 0){
        Projeto.remove(req.params.id, req.body)
         .then(data => res.jsonp(data))
         .catch(erro => res.jsonp(erro))
      }
    })
    .catch(erro => res.jsonp(erro))
    });
   
   module.exports = router;
   