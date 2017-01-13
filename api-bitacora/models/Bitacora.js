var mongoose = require('mongoose');
var BitacoraSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  completada: Boolean,
  responsable: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Bitacora', BitacoraSchema);
//estos nombres son incluidos en app.js

//> use api-bitacora
//switched to db api-bitacora
//> show collections
//bitacoras
