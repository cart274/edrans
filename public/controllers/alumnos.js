app.controller('alumnosCtrl', function($scope,$uibModal) {
    $scope.alumnos = [];
    console.log($uibModal);
    
    var getAlumnos = function(){
        fetch('http://localhost:8080/alumnos/getAlumnos', {
            method: 'GET'
            }).then(res => res.json())
            .then(res => {$scope.alumnos = res;
                console.log(res);
                $scope.$apply(); });
    }
    getAlumnos();

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
            getAlumnos();
          });
    }

});

app.controller('alumnosDetailsCtrl', function($scope, $uibModalInstance, alumno) {
    $scope.alumnoDetail = {};
    if(alumno){
        var newDate = new Date(alumno.fNacimiento);
        $scope.alumnoDetail = {'nombre':alumno.nombre,'domicilio':alumno.domicilio,
        'fNacimiento':newDate,'_id':alumno._id};
    }
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.save = function () {
        if($scope.alumnoDetail._id){
            updateAlumno();
        }
        else{
            saveNew();
        }
    }

    var saveNew = function(){
        data = $scope.alumnoDetail ;
        fetch('http://localhost:8080/alumnos/setAlumnos', {
                method: 'POST',
                body: JSON.stringify(data), 
                headers:{
                'Content-Type': 'application/json'
                }
            }).then(res => res.json())
            .then(res=>{
                if(res){
                    $scope.error = res;
                }
                else{
                    $uibModalInstance.close();
                }                
            });
    }

    var updateAlumno = function(){
        data = $scope.alumnoDetail ;
        fetch('http://localhost:8080/alumnos/updateAlumno', {
                method: 'PUT',
                body: JSON.stringify(data), 
                headers:{
                'Content-Type': 'application/json'
                }
            }).then(res => res.json())
            .then(res=>{
                if(res){
                    $scope.error = res;
                }
                else{
                    $uibModalInstance.close();
                }                
            });
    }

    $scope.delete = function(){
        let data = {'_id':$scope.alumnoDetail._id};
        fetch('http://localhost:8080/alumnos/deleteAlumno', {
                method: 'DELETE',
                body: JSON.stringify(data), 
                headers:{
                'Content-Type': 'application/json'
                }
            }).then(res => res.json())
            .then(res=>{
                if(res){
                    $scope.error = res;
                }
                else{
                    $uibModalInstance.close();
                }                
            });
    }

});