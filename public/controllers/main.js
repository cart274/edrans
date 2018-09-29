var app = angular.module('main', []);

app.controller('mainCtrl', function($scope) {
    $scope.mainCtrl = {};
    $scope.mainCtrl.alumno = 'Carlos';

    $scope.mainCtrl.save = function(){
        var data = {'Name': $scope.mainCtrl.Name, 'date': $scope.mainCtrl.date, 'address': $scope.mainCtrl.address};
        console.log("save", data);
       /* fetch('http://localhost:8080/students/setStudent', {
            method: 'POST',
            body: JSON.stringify(data), 
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())*/
    }

    var loadStudents = function(){
        var data = {'data':'La data'};
        fetch('http://localhost:8080/students/getStudents', {
            method: 'GET'
          }).then(res => res.json())
          .then(res => {$scope.mainCtrl.students = res; console.log(res);});
    }
    loadStudents();
});