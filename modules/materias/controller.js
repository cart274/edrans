let model = require('./model');


exports.getMaterias = function(cb){
    model.getMaterias(cb);
}

exports.setMateria = function(data, cb){
    model.setMateria(data, cb);
}

exports.deleteMateria = function(data, cb){
    model.deleteMateria(data, cb);
}

exports.updateMateria = function(data, cb){
    model.updateMateria(data, cb);
}

