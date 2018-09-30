app.controller('alumnosCtrl', function($scope,$uibModal) {
    $scope.alumnos = [];
    console.log($uibModal);
    
    var loadStudents = function(){
        fetch('http://localhost:8080/students/getStudents', {
            method: 'GET'
            }).then(res => res.json())
            .then(res => {$scope.alumnos = res;
                $scope.$apply(); });
    }
    loadStudents();

    $scope.alumnosDetails = function (alumno){
        var modalInstance = $uibModal.open({
            animation: false,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/alumnos/set.html',
            controller: 'alumnosDetailsCtrl',
            size: 'lg',
            resolve: {
                alumno: function () {
                    return alumno;
              }
            }
          });
      
          modalInstance.result.then(function () {
            alert("now I'll close the modal");
          });
    }

});

app.controller('alumnosDetailsCtrl', function($scope, $uibModalInstance, alumno) {
    $scope.alumnoDetail = {};
    $scope.alumnoDetail.Name = 'aaaa';
    $scope.alumnoDetail.birthdate = '12/02/1982';
    $scope.alumnoDetail.address = 'aaaa';
    
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.save = function () {
        data = alumnoDetail;
        console.log(data);
        fetch('http://localhost:8080/students/setStudent', {
                method: 'POST',
                body: JSON.stringify(data), 
                headers:{
                'Content-Type': 'application/json'
                }
            }).then(res => res.json())
            .then($scope.error = res);
    }


});