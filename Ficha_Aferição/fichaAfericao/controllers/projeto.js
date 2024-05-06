const mongoose = require('mongoose')
var Projeto = require("../models/projeto")

module.exports.list = () => {
    return Projeto
        .find()
        .sort({designacao : 1})
        .exec()
}

module.exports.findById = id => {
    return Projeto
        .findOne({_id : id})
        .exec()
}

module.exports.findByUC = uc => {
    return Projeto
        .findOne({uc : uc})
        .sort({designacao : 1})
        .exec()
}

module.exports.insert = prj => {
    if((Projeto.find({_id : prj._id}).exec()).length != 1){
        var newProjeto = new Projeto(prj)
        return newProjeto.save()
    }
}

module.exports.update = (id, prj) => {
    return Projeto
        .findByIdAndUpdate(id, prj, {new : true})
        .exec()
}

module.exports.remove = id => {
    Projeto
        .find({_id : id})
        .deleteOne()
        .exec()
}