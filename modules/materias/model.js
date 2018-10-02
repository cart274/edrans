let mongoose = require("mongoose");
let Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost/materias", { useNewUrlParser: true });

let materiasSchemaJSON = {
    nombre:String
};

let materias_schema = new Schema(materiasSchemaJSON);
let Materias = mongoose.model("materias",materias_schema);

exports.getMaterias = function(cb){
    Materias.find(function(error,data){
        cb(error,data)
    });
}

exports.setMateria = function(data, cb){
    let materias = new Materias({'nombre':data.nombre});
    materias.save(function(error){
        cb(error);
    });
}

exports.deleteMateria = function(data, cb){
    Materias.deleteOne({'_id':data._id},function(error){
        cb(error);
    })
}

exports.updateMateria = function(data, cb){
    Materias.updateOne({'_id':data._id},{'nombre':data.nombre},function(error){
        cb(error);
    })
}