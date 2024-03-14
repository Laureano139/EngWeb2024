var express = require('express');
var router = express.Router();
var axios = require('axios')

router.get('/', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get("http://localhost:3000/compositores?_sort=nome")
  .then(resp => {
    var compositores = resp.data
    res.status(200).render("composersListPage", {"clist" : compositores, "data" : d})
  })
  .catch(erro => {
    res.status(501).render("error", {"error" : erro})
  })
});
module.exports = router;

// ----------------------------------------------------------------//
// ----------------------------------------------------------------//
// ------------------------    REGISTO    -------------------------//
// ----------------------------------------------------------------//
// ----------------------------------------------------------------//

router.get('/registo', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  res.status(200).render("composersFormPage", {"data" : d})
});

router.post('/registo', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  var result = req.body
  console.log(result)

  axios.post("http://localhost:3000/compositores", result)
  .then(resp => {
      res.status(201).redirect('/compositores')
  })
  .catch(erro => {
    res.status(502).render("error", {"error" : erro})
  })
});

// ----------------------------------------------------------------//
// ----------------------------------------------------------------//
// ------------------------    EDIT    ----------------------------//
// ----------------------------------------------------------------//
// ----------------------------------------------------------------//

router.get('/edit/:idCompositor', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get("http://localhost:3000/compositores/" + req.params.idCompositor)
  .then(resp => {
    var compositor = resp.data[0]
    console.log("GET - Edit -> Compositor: " + compositor)
    res.status(200).render("composerFormEditPage", {"c" : compositor, "data" : d})
  })
  .catch(erro => {
    res.status(503).render("error", {"error" : erro})
  })
});

router.post('/edit/:idCompositor', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  var compositor = req.body
  console.log("POST - EDIT -> Compositor: " + compositor)
  axios.put("http://localhost:3000/compositores/" + req.params.idCompositor, compositor)
  .then(resp => {
    res.status(202).redirect("/")
  })
  .catch(erro => {
      res.status(504).render("error", {"error" : erro})
  })
});

// ----------------------------------------------------------------//
// ----------------------------------------------------------------//
// -----------------------    DELETE    ---------------------------//
// ----------------------------------------------------------------//
// ----------------------------------------------------------------//

router.get('/delete/:idCompositor', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.delete("http://localhost:3000/compositores/" + req.params.idCompositor)
  .then(resp => {
      res.redirect("/")
  })
  .catch(erro => {
      res.status(505).render("error", {"error" : erro})
  })
});

// ----------------------------------------------------------------//
// ----------------------------------------------------------------//
// --------------------    COMPOSER PAGE    -----------------------//
// ----------------------------------------------------------------//
// ----------------------------------------------------------------//

router.get('/:idCompositor', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get("http://localhost:3000/compositores/" + req.params.idCompositor)
  .then(resp => {
      var compositor = resp.data
      res.status(200).render("composerPage", {"compositor" : compositor, "data" : d})
  })
  .catch(erro => {
      res.status(506).render("error", {"error" : erro})
  })
});