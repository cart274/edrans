exports.getStudents = function(cb){
    data = [{'Name':'Carlos', 'date': '21/12/1982','address':'Paraguay 5500'},
    {'Name':'Sol', 'date': '1/1/1992','address':'Bompland'},
    {'Name':'Amalia', 'date': '14/4/1972','address':'Cabildo'}];
    cb('',data);
}

exports.setStudents = function(data, cb){
    model.setStudents(data, cb);
}