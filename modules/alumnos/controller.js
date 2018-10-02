let model = require('./model');


exports.getAlumnos = function(cb){
    model.getAlumnos(cb);
}

exports.setAlumno = function(data, cb){
    model.setAlumno(data, cb);
}

exports.deleteAlumno = function(data, cb){
    model.deleteAlumno(data, cb);
}

exports.updateAlumno = function(data, cb){
    model.updateAlumno(data, cb);
}

exports.updateAlumnoMateria = function(data, cb){
    model.updateAlumnoMateria(data, cb);
}
