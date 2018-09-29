app.controller('menuCtrl', function($scope) {
    $scope.mainMenu = [{'Name':'Alumnos','url':'/alumnos'},
    {'Name':'Carreras','url':'/materias'},
    {'Name':'Materias','url':'/carreras'}];
    
});
