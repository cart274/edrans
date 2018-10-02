var app = angular.module('main', ["ngRoute",'ui.bootstrap']);

app.controller('mainCtrl', function($scope,$location) {
    $scope.main = {};
    $scope.mainMenu = [{'Name':'Alumnos','url':'alumnos'},
    {'Name':'Carreras','url':'carreras'},
    {'Name':'Materias','url':'materias'}];

    $scope.menuClass = function(page) {
        var current = $location.path().substring(1);
        return page === current || (page === 'alumnos' && !current) ? "active" : "";
    };

});
