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






   /* $scope.main.save = function(){
        var data = {'Name': $scope.mainCtrl.Name, 'date': $scope.mainCtrl.date, 'address': $scope.mainCtrl.address};
        console.log("save", data);
       /* fetch('http://localhost:8080/students/setStudent', {
            method: 'POST',
            body: JSON.stringify(data), 
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())*/
    /*}

    var loadStudents = function(){
        var data = {'data':'La data'};
        fetch('http://localhost:8080/students/getStudents', {
            method: 'GET'
          }).then(res => res.json())
          .then(res => {$scope.mainCtrl.students = res; console.log(res);});
    }
    loadStudents();*/
});
