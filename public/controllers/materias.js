app.controller('materiasCtrl', function($scope,$uibModal) {
    $scope.materias = [];
    
    var getMaterias = function(){
        fetch('http://localhost:8080/materias/getMaterias', {
            method: 'GET'
            }).then(res => res.json())
            .then(res => {$scope.materias = res;
                console.log(res);
                $scope.$apply(); });
    }
    getMaterias();

    $scope.materiasDetails = function (materia){
        var modalInstance = $uibModal.open({
            animation: false,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/materias/set.html',
            controller: 'materiasDetailsCtrl',
            size: 'lg',
            resolve: {
                materia: function () {
                    return materia;
              }
            }
          });
      
          modalInstance.result.then(function () {
            getMaterias();
          });
    }

});

app.controller('materiasDetailsCtrl', function($scope, $uibModalInstance, materia) {
    $scope.materiaDetail = {};
    if(materia){
        $scope.materiaDetail = {'nombre':materia.nombre,'_id':materia._id};
    }
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.save = function () {
        if($scope.materiaDetail._id){
            updateMateria();
        }
        else{
            saveNew();
        }
    }

    var saveNew = function(){
        data = $scope.materiaDetail;
        fetch('http://localhost:8080/materias/setMateria', {
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

    var updateMateria = function(){
        data = $scope.materiaDetail ;
        fetch('http://localhost:8080/materias/updateMateria', {
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
        let data = {'_id':$scope.materiaDetail._id};
        fetch('http://localhost:8080/materias/deleteMateria', {
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