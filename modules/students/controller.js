model = require('./model');


exports.getStudents = function(cb){
    model.getStudents(cb);
}

exports.setStudents = function(data, cb){
    model.setStudents(data, cb);
}