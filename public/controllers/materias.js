app.controller('materiasCtrl', function($scope,$uibModal) {
    $scope.alumnos = [{'Name':'Carlos', 'date': '21/12/1982','address':'Paraguay 5500'},
    {'Name':'Sol', 'date': '1/1/1992','address':'Bompland'},
    {'Name':'Amalia', 'date': '14/4/1972','address':'Cabildo'}];
    console.log($uibModal);
    
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

app.controller('materiasDetailsCtrl', function($scope, $uibModalInstance, alumno) {
    $scope.alumnoDetail = {};
    $scope.alumnoDetail.Name = 'aaaa';
    $scope.alumnoDetail.birthdate = '12/02/1982';
    $scope.alumnoDetail.address = 'aaaa';
    
    console.log($scope.alumnoDetail);
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});