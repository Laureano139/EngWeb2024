/* Operações CRUD sobre UC 
   2024-04-21 @jcr
   ----------------------- */
var express = require('express');
var router = express.Router();
var Equipa = require('../controllers/equipa')
var multer = require('multer')
const upload = multer({ dest: 'uploads/' })
var fs = require('fs')

/* Listar as Equipa (R) */
router.get('/', function(req, res) {
  Equipa.list()
        .then(data => res.jsonp(data))
        .catch(erro => res.jsonp(erro))
});

/* Consultar uma UC (R) */
router.get('/:id', function(req, res) {
  Equipa.findById(req.params.id)
      .then(data => res.jsonp(data))
      .catch(erro => res.jsonp(erro))
  });

/* Criar uma Equipa (C) */
router.post('/', upload.array('foto'), function(req, res) {
  var equipa = {
    _id: req.body._id,
    designacao: req.body.designacao,
    membros:[]
  }
  for( let i=0; i < req.body.membrosId.length; i++){
    equipa.membros.push({
      _id: req.body.membrosId[i],
      nome: req.body.membrosNome[i],
      foto: req.body.membrosId[i] + '.' + req.files[i].mimetype.split('/')[1]
    })
  }
  Equipa.insert(equipa)
    .then(data => {
      fs.mkdir( __dirname + "/../FileStore/" + equipa._id, { recursive: true }, (err) => {
        if (err) {
          console.error('Error creating folder:', err);
        } else {
          console.log('Folder created successfully: ' + equipa._id);
          for(let i=0; i < req.files.length; i++){
            let oldPath = __dirname + '/../' + req.files[i].path 
            let newPath = __dirname + '/../FileStore/' + equipa._id + '/' + equipa.membros[i].foto

            fs.rename(oldPath, newPath, function(error){
              if(error) throw error
            })

          }
        }
      });
      res.status(201).jsonp(data)
    })
    .catch(erro => res.jsonp(erro))
});

/* Alterar uma UC (U) */
router.put('/:id', upload.array('foto'), function(req, res) {
  var equipa = {}
  if(req.body.designacao){
    equipa["designacao"] = req.body.designacao
  }
  if(req.body.membrosId){
    equipa["membros"] = []

    var membrosId = null
    var membrosNome = null
    if(!Array.isArray(req.body.membrosId)){
      membrosId = [req.body.membrosId]
      membrosNome = [req.body.membrosNome]
    } else {
      membrosId = req.body.membrosId
      membrosNome = req.body.membrosNome
    }

    for(let i=0; i<membrosId.length; i++){
      var singleMembro = {_id: membrosId[i]}

      if(membrosNome[i]){
        singleMembro["nome"] = membrosNome[i]
      }

      console.log(req.files)
      if(req.files[i]){
        singleMembro["foto"] = membrosId[i] + '.' + req.files[i].originalname.split('.')[1]
      }

      equipa.membros.push(singleMembro)
    }
  }
  console.log(equipa)
  Equipa.update(req.params.id, equipa)
    .then(data => {
      for(let i=0; i < req.files.length; i++){
        let oldPath = __dirname + '/../' + req.files[i].path 
        let newPath = __dirname + '/../FileStore/' + data._id + '/' + equipa.membros[i].foto
        equipa.membros[i].foto

        fs.rename(oldPath, newPath, function(error){
          if(error) throw error
        })

      }
      res.jsonp(data)
    })
    .catch(err => res.jsonp(err))
})
    

/* Remover uma UC (D ) */
router.delete('/:id', function(req, res) {
    return Equipa.remove(req.params.id)
      .then(data => {
        var folder = __dirname + '/../FileStore/' + req.params.id
        fs.rmSync(folder, {recursive: true, force: true})
        res.jsonp(data)
      })
      .catch(erro => res.jsonp(erro))
  });

module.exports = router;
