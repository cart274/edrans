app.controller('carrerasCtrl', function($scope,$uibModal) {
    $scope.carreras = [];
    
    var getCarreras = function(){
        fetch('http://localhost:8080/carreras/getCarreras', {
            method: 'GET'
            }).then(res => res.json())
            .then(res => {$scope.carreras = res;
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
        $scope.carreraDetail = {'nombre':carrera.nombre,'_id':carrera._id,'materias':carrera.materias};
    }
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.save = function () {
        let materiasIncluidas = [];
        $scope.materias.forEach((item)=>{
            if(item.enabled){
                materiasIncluidas.push({'_id':item._id});
            }
        })
        if($scope.carreraDetail._id){
            updateCarrera(materiasIncluidas);
        }
        else{
            saveNew(materiasIncluidas);
        }
    }

    var saveNew = function(materiasIncluidas){
        data = $scope.carreraDetail;
        data.materias = materiasIncluidas;
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
                    $uibModalInstance.close("close");
                }                
            });
    }

    var updateCarrera = function(materiasIncluidas){
        data = $scope.carreraDetail ;
        data.materias = materiasIncluidas;
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
                    $uibModalInstance.close("close");
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
                    $uibModalInstance.close("close");
                }                
            });
    }

    let getMaterias = function(){
        fetch('http://localhost:8080/materias/getMaterias', {
            method: 'GET'
            }).then(res => res.json())
            .then(res => {$scope.materias = res;
                setMateriasIncluidas();
                $scope.$apply(); });
    }
    getMaterias();

    let setMateriasIncluidas = function(){
        if($scope.materias && $scope.carreraDetail.materias){
            $scope.materias.forEach((item)=>{
                $scope.carreraDetail.materias.forEach((subItem)=>{
                    if(item._id == subItem._id){
                        item.enabled = true;
                    }
                })
            })
        }
    }
});