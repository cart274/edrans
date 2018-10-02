let mongoose = require("mongoose");
let Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost/carreras", { useNewUrlParser: true });

let carrerasSchemaJSON = {
    nombre:String,
    materias:Array,
};

let carreras_schema = new Schema(carrerasSchemaJSON);
let Carreras = mongoose.model("Carreras",carreras_schema);

exports.getCarreras = function(cb){
    Carreras.find(function(error,data){
        cb(error,data)
    });
}

exports.setCarrera = function(data, cb){
    let carreras = new Carreras({'nombre':data.nombre, 'fNacimiento':data.fNacimiento,
        'domicilio':data.domicilio,'materias':data.materias});
    carreras.save(function(error){
        console.log(error);
        cb(error);
    });
}

exports.deleteCarrera = function(data, cb){
    Carreras.deleteOne({'_id':data._id},function(error){
        cb(error);
    })
}

exports.updateCarrera = function(data, cb){
    Carreras.updateOne({'_id':data._id},{'nombre':data.nombre, 'fNacimiento':data.fNacimiento,
    'domicilio':data.domicilio,'materias':data.materias},function(error){
        cb(error);
    })
}

exports.getMateriasInCarrera = function(data,cb){
    console.log(data);
    Carreras.findOne({'_id':data._id},function(error,data){
        cb(error,data)
    });
}