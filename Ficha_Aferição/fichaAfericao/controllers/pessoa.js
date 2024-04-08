var mongoose = require("mongoose")
const { modelName } = require("../model/pessoa")
var Pessoa = require("../model/pessoa")

module.exports.list = () => {
    return Pessoa
        .find()
        .sort({nome:1})
        .exec()
}

module.exports.insert = (p) => {
    if((Pessoa.find({_id : p._id}).exec()).length != 1){
        var novo = new Pessoa(p)
        return novo.save()
    }
}

module.exports.delete = (id) => {
    return Pessoa
        .findOneAndDelete({_id : id})
        .exec()
}

module.exports.update = (id, Pessoa) => {
    return Pessoa
        .findByIdAndUpdate(id, Pessoa, {new : true})
        .exec()
}