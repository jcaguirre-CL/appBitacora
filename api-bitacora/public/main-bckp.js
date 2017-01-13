//llamadas a la api desde la pagina

angular.module('angularBitacora', []);
//debe coincidri con el modelo
//se relaciona con index.html
function mainController($scope, $http) {
    $scope.formData = {};
    $scope.responsables = ["giglesias","malvear","hmeza","gerardo.pizarro","csalinas","mmendezp","jcaguirre"];

    $scope.filter = {};

    // reset the filter
    $scope.resetFilter = function() {
      // set filter object as blank
      $scope.filter = {};
    };
    // Cuando se cargue la página, pide del API todos los TODOs
    //aqui estan las llmadas a la api desde la pagina
    $http.get('/api')
        .success(function(data) {
                $scope.bitacora = data;
                console.log(data)
        }).error(function(data) {
                console.log('Error: ' + data);
    });

    // Cuando se añade un nuevo registro, manda el texto a la API
    $scope.crearRegistro = function(){
      $scope.formData.titulo = $scope.formData.textTitulo;
      $scope.formData.descripcion = $scope.formData.textDescripcion;
      $scope.formData.responsable = $scope.formData.textResponsable;
        $http.post('/api', $scope.formData)
        .success(function(data) {
                $scope.formData = {};
                $http.get('/api')
                .success(function(data) {
                        $scope.bitacora = data;
                        console.log(data)
                }).error(function(data) {
                        console.log('Error: ' + data);
                });
        }).error(function(data) {
                console.log('Error:' + data);
        });
    };

    // Borra un despues de checkearlo como acabado
    $scope.deleteBitacora = function(id) {
        console.log('_id:' + id)
        $http.delete('/api/' + id)
        //es al path de la llamada a la API
        .success(function(data) {
                $scope.formData = {};
                $http.get('/api')
                .success(function(data) {
                        $scope.bitacora = data;
                        console.log(data)
                }).error(function(data) {
                        console.log('Error: ' + data);
                });
        }).error(function(data) {
                console.log('Error:' + data);
        });
    };

    // Actualiza un  despues de checkearlo como acabado
    $scope.actualizaBitacora = function(id) {
          $scope.formData.titulo = $scope.formData.textTitulo;
          $http.put('/api/' + id, $scope.formData)
          .success(function(data) {
                  $scope.formData = {};
                  $http.get('/api')
                  .success(function(data) {
                          $scope.bitacora = data;
                          console.log(data)
                  }).error(function(data) {
                          console.log('Error: ' + data);
                  });
          }).error(function(data) {
                  console.log('Error:' + data);
          });
      };

    $scope.mostrar = function(id){
          $scope.formData.textTitulo = "titulo";
          $scope.formData.textDescripcion = "titulo";
          $scope.formData.textResponsable = $scope.responsable;
          $('.oculto').hide();
          $('#' + id).show();
    };

};
