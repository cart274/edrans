mongoose = require("mongoose");
let Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost/alumnos");

let alumnosSchemaJSON = {
    nombre:String,
    fNacimiento:Date,
    domicilio:String
};

let alumnos_schema = new Schema(alumnosSchemaJSON);
let Alumnos = mongoose.model("Alumnos",alumnos_schema);

exports.getAlumnos = function(cb){
    Alumnos.find(function(error,data){
        cb(error,data)
    });
}

exports.setAlumno = function(data, cb){
    let alumnos = new Alumnos({'nombre':data.nombre, 'fNacimiento':data.fNacimiento,
        'domicilio':data.domicilio});
    alumnos.save(cb);
}

exports.deleteAlumno = function(data, cb){
    Alumnos.deleteOne({'_id':data._id},function(error){
        cb(error);
    })
}

exports.updateAlumno = function(data, cb){
    Alumnos.updateOne({'_id':data._id},{'nombre':data.nombre, 'fNacimiento':data.fNacimiento,
    'domicilio':data.domicilio},function(error){
        cb(error);
    })
}