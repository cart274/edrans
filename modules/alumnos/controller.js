model = require('./model');


exports.getAlumnos = function(cb){
    model.getAlumnos(cb);
}

exports.setAlumnos = function(data, cb){
    model.setAlumnos(data, cb);
}

exports.deleteAlumno = function(data, cb){
    model.deleteAlumno(data, cb);
}

exports.updateAlumno = function(data, cb){
    model.updateAlumno(data, cb);
}

