let model = require('./model');


exports.getCarreras = function(cb){
    model.getCarreras(cb);
}

exports.setCarrera = function(data, cb){
    model.setCarrera(data, cb);
}

exports.deleteCarrera = function(data, cb){
    model.deleteCarrera(data, cb);
}

exports.updateCarrera = function(data, cb){
    model.updateCarrera(data, cb);
}

exports.getMateriasInCarrera = function(data, cb){
    model.getMateriasInCarrera(data, cb);
}
