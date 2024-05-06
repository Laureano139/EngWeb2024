var mongoose = require("mongoose")

var membroSchema = new mongoose.Schema({
    _id: String, // Axxxxx ou Exxxxx ou PGxxxxx
    nome: String,
    foto: String, // path para a foto ou outro identificador da foto (esta terá de vir no pedido de POST juntamente com os metadados)
    obs: String
})

var equipaSchema = new mongoose.Schema({
    _id : String, // Sigla
    designacao : String, // Nome expandido
    membros: [membroSchema]
}, { versionKey: false })

module.exports = mongoose.model('equipa', equipaSchema, 'equipa')