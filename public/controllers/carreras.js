app.controller('CarrerasCtrl', function($scope,$uibModal) {
    $scope.Carreras = [];
    
    var getCarreras = function(){
        fetch('http://localhost:8080/Carreras/getCarreras', {
            method: 'GET'
            }).then(res => res.json())
            .then(res => {$scope.Carreras = res;
                $scope.$apply(); });
    }
    getCarreras();

    $scope.CarrerasDetails = function (Carrera){
        var modalInstance = $uibModal.open({
            animation: false,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/Carreras/set.html',
            controller: 'CarrerasDetailsCtrl',
            size: 'lg',
            resolve: {
                Carrera: function () {
                    return Carrera;
              }
            }
          });
      
          modalInstance.result.then(function () {
            getCarreras();
          });
    }

});

app.controller('CarrerasDetailsCtrl', function($scope, $uibModalInstance, Carrera) {
    $scope.CarreraDetail = {};
    if(Carrera){
        var newDate = new Date(Carrera.fNacimiento);
        $scope.CarreraDetail = {'nombre':Carrera.nombre,'domicilio':Carrera.domicilio,
        'fNacimiento':newDate,'_id':Carrera._id};
    }
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.save = function () {
        if($scope.CarreraDetail._id){
            updateCarrera();
        }
        else{
            saveNew();
        }
    }

    var saveNew = function(){
        data = $scope.CarreraDetail ;
        fetch('http://localhost:8080/Carreras/setCarrera', {
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

    var updateCarrera = function(){
        data = $scope.CarreraDetail ;
        fetch('http://localhost:8080/Carreras/updateCarrera', {
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
        let data = {'_id':$scope.CarreraDetail._id};
        fetch('http://localhost:8080/Carreras/deleteCarrera', {
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