const mongoose = require('mongoose')
var Equipa = require("../models/equipa")

module.exports.list = () => {
    return Equipa
        .find()
        .sort({designacao : 1})
        .exec()
}

module.exports.findById = id => {
    return Equipa
        .findOne({_id : id})
        .exec()
}

module.exports.insert = equipa => {
    if((Equipa.find({_id : equipa._id}).exec()).length != 1){
        var newEquipa = new Equipa(equipa)
        return newEquipa.save()
    }
}

module.exports.update = (id, uc) => {
    return Equipa
        .findByIdAndUpdate(id, uc, {new : true})
}

module.exports.remove = id => {
    return Equipa
        .findOneAndDelete({_id : id})
}