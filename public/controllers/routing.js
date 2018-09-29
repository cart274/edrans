app.config(function($routeProvider) {
    $routeProvider.otherwise('/notFound');
    $routeProvider
    .when("/", {
        templateUrl : "views/alumnos/getAll.html"
    })
    .when("/alumnos", {
        templateUrl : "views/alumnos/getAll.html"
    })
    .when("/materias", {
        templateUrl : "views/materias/getAll.html"
    })
    .when("/carreras", {
        templateUrl : "views/carreras/getAll.html"
    });
});