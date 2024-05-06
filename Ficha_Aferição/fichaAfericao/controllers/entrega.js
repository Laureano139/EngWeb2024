const mongoose = require('mongoose')
var Entrega = require("../models/entrega")

module.exports.list = () => {
    return Entrega
        .find()
        .sort({designacao : 1})
        .exec()
}

module.exports.findById = id => {
    return Entrega
        .findOne({_id : id})
        .exec()
}

module.exports.findByProject = ent => {
    return Entrega
        .findOne({projectID : ent})
        .sort({designacao : 1})
        .exec()
}

module.exports.findByProject = ent => {
    return Entrega
        .findOne({projectID : ent})
        .sort({designacao : 1})
        .exec()
}

module.exports.countProjects = projectId => {
    return Entrega
        .countDocuments({projectID : projectId})
        .exec()
}

module.exports.findByEquipa = idEquipa => {
    return Entrega
        .findOne({idEquipa : idEquipa})
        .sort({designacao : 1})
        .exec()
}

module.exports.insert = ent => {
    if((Entrega.find({_id : ent._id}).exec()).length != 1){
        var newEntrega = new Entrega(ent)
        return newEntrega.save()
    }
}

module.exports.update = (id, ent) => {
    return Entrega
        .findByIdAndUpdate(id, ent, {new : true})
        .exec()
}

module.exports.remove = id => {
    return Entrega
        .findByIdAndDelete({_id : id})
        .exec()
}