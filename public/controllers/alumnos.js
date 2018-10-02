app.controller('alumnosCtrl', function($scope,$uibModal) {
    $scope.alumnos = [];
    
    var getAlumnos = function(){
        fetch('http://localhost:8080/alumnos/getAlumnos', {
            method: 'GET'
            }).then(res => res.json())
            .then(res => {$scope.alumnos = res;
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

    $scope.alumnosMateriasDetails = function (alumno){
        var modalInstance = $uibModal.open({
            animation: false,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/alumnos/setMaterias.html',
            controller: 'alumnosMateriasDetailsCtrl',
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
        'fNacimiento':newDate,'carrera':alumno.carreraId,'_id':alumno._id};
    }
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    var getCarreras = function(){
        fetch('http://localhost:8080/carreras/getCarreras', {
            method: 'GET'
            }).then(res => res.json())
            .then(res => {$scope.carreras = res;
                $scope.$apply(); });
    }
    getCarreras();
    
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
        fetch('http://localhost:8080/alumnos/setAlumno', {
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

app.controller('alumnosMateriasDetailsCtrl', function($scope, $uibModalInstance, alumno) {
    $scope.alumnoDetail = {};
    if(alumno){
        var newDate = new Date(alumno.fNacimiento);
        $scope.alumnoDetail = {'nombre':alumno.nombre,'materias':alumno.materias,
        '_id':alumno._id,'carreraId':alumno.carreraId};
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    let getMaterias = function(){
        fetch('http://localhost:8080/materias/getMaterias', {
            method: 'GET'
            }).then(res => res.json())
            .then(res => {
                getMateriasInCarrera(res);
            });
    }
    getMaterias();

    let getMateriasInCarrera = function(materiasDisponibles){
        var data = {'_id':$scope.alumnoDetail.carreraId};
        fetch('http://localhost:8080/carreras/getMateriasInCarrera', {
            method: 'POST',
            body: JSON.stringify(data), 
            headers:{
            'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(res=>{
            if(res){
                setMateriasInscritas(res.materias,materiasDisponibles);
            }         
        });

    }
    

    let setMateriasInscritas = function(materiasId,materiasDisponibles){
        $scope.materias = [];
        if(materiasId && materiasDisponibles){
            materiasDisponibles.forEach((item)=>{
                materiasId.forEach((subItem)=>{
                    if(item._id == subItem._id){
                        $scope.materias.push(item);
                    }
                })
            })
        }
        if($scope.alumnoDetail.materias && $scope.materias){
            $scope.materias.forEach((item)=>{
                $scope.alumnoDetail.materias.forEach((subItem)=>{
                    if(subItem._id == item._id){
                        item.enabled = subItem.enabled;
                        item.status = subItem.status;
                        item.calificacion = subItem.calificacion;
                    }
                })
            })
        }
        $scope.$apply();   
    }

    $scope.save = function(){
        let materiasIncluidas = [];
        $scope.materias.forEach((item)=>{
            if(item.enabled){
                materiasIncluidas.push({'_id':item._id,'enabled':item.enabled,
            'status':item.status,'calificacion':item.calificacion});
            }
        })
        data = {'materias':materiasIncluidas,'_id':$scope.alumnoDetail._id};
        fetch('http://localhost:8080/alumnos/updateAlumnoMateria', {
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

});