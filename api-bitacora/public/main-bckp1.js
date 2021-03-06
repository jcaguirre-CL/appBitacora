//llamadas a la api desde la pagina

angular.module('angularBitacora', []);
//debe coincidri con el modelo
//se relaciona con index.html
function mainController($scope, $http) {
    $scope.formData = {};
    $scope.responsables = ["giglesias","malvear","hmeza","gerardo.pizarro","csalinas","mmendezp","jcaguirre"];
    $scope.textResponsable = "Seleccione un responsable...";
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
                //en bitacora estan todos
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
        $scope.textResponsable = "Seleccione un responsable...";
    };

    // Borra un despues de checkearlo como acabado
    $scope.deleteBitacora = function(id) {
      console.log('id para borrar: ' + id);
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
        $scope.textResponsable = "Seleccione un responsable...";
    };

    // Actualiza un  despues de checkearlo como acabado
    $scope.actualizaBitacora = function(id) {
          $scope.formData.titulo = $scope.formData.textTitulo;
          $scope.formData.descripcion = $scope.formData.textDescripcion;
          $scope.formData.responsable = $scope.formData.textResponsable;
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
      $scope.textResponsable = "Seleccione un responsable...";
      };

    $scope.mostrar = function(id){
          $scope.formData.textTitulo = "titulo";
          $scope.formData.textDescripcion = "titulo";
          $scope.formData.textResponsable = $scope.responsable;
          $('.oculto').hide();
          $('#' + id).show();
    };
    $scope.marcarRegistro = function(id){
          $scope.registroID = id;
          $http.get('/api/' + id)
          .success(function(data) {
                  //$scope.formData = data;
                  //$scope.textResponsable = "www";
                  $scope.formData.textTitulo = data.titulo;
                  $scope.formData.textDescripcion = data.descripcion;
                  $scope.textResponsable = data.responsable;
                  console.log('from marcarregistro: ' + $scope.textResponsable);
                  console.log(data)
          }).error(function(data) {
                  console.log('Error: ' + data);
          });
          //console.log(id)
    };

    $scope.showinForm = function(id){
      $http.get('/api/' + id)
      .success(function(data) {
              //$scope.formData = data;
              $scope.textResponsable = "www";
              $scope.formData.textTitulo = data.titulo;
              $scope.formData.textDescripcion = data.descripcion;
              $scope.formData.textResponsable = data.responsable;
              console.log($scope.formData.textResponsable);
              console.log(data)
      }).error(function(data) {
              console.log('Error: ' + data);
      });
          //$scope.formData.textTitulo = "titulo";
          // $scope.formData.textDescripcion = "titulo";
          // $scope.formData.textResponsable = $scope.responsable;
          // $('.oculto').hide();
          // $('#' + id).show();
    };

};
