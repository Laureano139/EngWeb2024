var mongoose = require("mongoose")

var entregaRemovidaSchema = new mongoose.Schema({
    _id : String, // Sigla
    deleteDate : Date,
    uc: String,
    projectID: String,
    idEquipa: String,
    justificacao: String
}, { versionKey: false })

module.exports = mongoose.model('entregaRemovida', entregaRemovidaSchema)