//este archivo habilita las respuestas en la API
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Bitacora = require('../models/Bitacora.js');
//lo busca como bitacora
/* GET /todos listing. */
router.get('/', function(req, res, next) {
  Bitacora.find(function (err, bitacora) {
    if (err) return next(err);
    res.json(bitacora);
  });
});

/* POST /todos */
router.post('/', function(req, res, next) {
  console.log('post');
  Bitacora.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /bitacora/id */
router.get('/:id', function(req, res, next) {
  Bitacora.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });});

/* PUT /todos/:id */
router.put('/:id', function(req, res, next) {
  Bitacora.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /todos/:id */
router.delete('/:id', function(req, res, next) {
  Bitacora.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// Carga una vista HTML simple donde irá nuestra Single App Page
// Angular Manejará el Frontend
router.get('*', function(req, res) {
    res.sendfile('./public/index.html');
});

module.exports = router;
