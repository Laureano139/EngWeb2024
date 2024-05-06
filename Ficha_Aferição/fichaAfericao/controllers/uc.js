const mongoose = require('mongoose')
var UC = require("../models/uc")

module.exports.list = () => {
    return UC
        .find()
        .sort({designacao : 1})
        .exec()
}

module.exports.findById = id => {
    return UC
        .findOne({_id : id})
        .exec()
}

module.exports.insert = uc => {
    if((UC.find({_id : uc._id}).exec()).length != 1){
        var newUC = new UC(uc)
        return newUC.save()
    }
}

module.exports.update = (id, uc) => {
    return UC
        .findByIdAndUpdate(id, uc, {new : true})
}

module.exports.remove = id => {
    return UC
        .findOneAndDelete({_id : id})
}