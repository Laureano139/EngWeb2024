var mongoose = require("mongoose")

var ucSchema = new mongoose.Schema({
    _id : String, // Sigla
    designacao : String,
    link : String
}, { versionKey: false })

module.exports = mongoose.model('uc', ucSchema, 'uc')