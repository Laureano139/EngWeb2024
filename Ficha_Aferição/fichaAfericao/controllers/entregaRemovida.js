const mongoose = require('mongoose')
var EntregaRemovida = require("../models/entregaRemovida")

module.exports.list = () => {
    return EntregaRemovida
        .find()
        .exec()
}

module.exports.findById = id => {
    return EntregaRemovida
        .findOne({_id : id})
        .exec()
}

module.exports.findByProject = ent => {
    return EntregaRemovida
        .findOne({projectID : ent})
        .exec()
}

module.exports.findByProject = ent => {
    return EntregaRemovida
        .findOne({projectID : ent})
        .exec()
}

module.exports.countProjects = projectId => {
    return EntregaRemovida
        .countDocuments({projectID : projectId})
        .exec()
}

module.exports.findByEquipa = idEquipa => {
    return EntregaRemovida
        .findOne({idEquipa : idEquipa})
        .exec()
}

module.exports.insert = ent => {
    if((EntregaRemovida.find({_id : ent._id}).exec()).length != 1){
        var newEntregaRemovida = new EntregaRemovida(ent)
        return newEntregaRemovida.save()
    }
}

module.exports.update = (id, ent) => {
    return EntregaRemovida
        .findByIdAndUpdate(id, ent, {new : true})
        .exec()
}

module.exports.remove = id => {
    EntregaRemovida
        .find({_id : id})
        .deleteOne()
        .exec()
}