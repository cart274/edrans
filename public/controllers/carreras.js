app.controller('carrerasCtrl', function($scope,$uibModal) {
    $scope.carreras = [];
    
    var getCarreras = function(){
        fetch('http://localhost:8080/carreras/getCarreras', {
            method: 'GET'
            }).then(res => res.json())
            .then(res => {$scope.carreras = res;
                console.log(res);
                $scope.$apply(); });
    }
    getCarreras();

    $scope.carrerasDetails = function (carrera){
        var modalInstance = $uibModal.open({
            animation: false,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/carreras/set.html',
            controller: 'carrerasDetailsCtrl',
            size: 'lg',
            resolve: {
                carrera: function () {
                    return carrera;
              }
            }
          });
      
          modalInstance.result.then(function () {
            getCarreras();
          });
    }

});

app.controller('carrerasDetailsCtrl', function($scope, $uibModalInstance, carrera) {
    $scope.carreraDetail = {};
    if(carrera){
        $scope.carreraDetail = {'nombre':carrera.nombre,'_id':carrera._id};
    }
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.save = function () {
        if($scope.carreraDetail._id){
            updateCarrera();
        }
        else{
            saveNew();
        }
    }

    var saveNew = function(){
        data = $scope.carreraDetail;
        console.log(data);
        fetch('http://localhost:8080/carreras/setCarrera', {
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
        data = $scope.carreraDetail ;
        fetch('http://localhost:8080/carreras/updateCarrera', {
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
        let data = {'_id':$scope.carreraDetail._id};
        fetch('http://localhost:8080/carreras/deleteCarrera', {
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