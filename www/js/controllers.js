$url = "http://127.0.0.1:8000";

angular.module('starter.controllers', [])

.controller('InicioCtrl', function($scope) {

})

.controller('ExtraviadosCtrl', function($scope, $http, $ionicPopup) {
  $scope.mascotas={};

  $scope.$on("$ionicView.loaded", function(event, data){
    $scope.consultarExtraviados();
  });

  $scope.consultarExtraviados = function() {
      $http.get($url+'/mascota/api_mascota/?format=json', {cache:true})
      .then(function(res){
        console.log("consultarExtraviados success");
        console.log(res.data);
        $scope.mascotas = res.data;
      }, function(err) {
        console.log("consultarExtraviados failed");
        $ionicPopup.alert({title: "ATENCIÓN",
          template: "Conexión no establecida, por favor verifique su conexión a internet o intente más tarde",
          buttons: [{ text: 'OK', type: 'button-positive button-clear' }]
        });
      });
  }

})
/*
.controller('ExtraviadosDetalleCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})
*/

.controller('ExtraviadosDetalleCtrl', function($scope, $stateParams, $http, $ionicPopup) {
  $scope.mascotas={};
  $scope.$on("$ionicView.loaded", function(event, data){    
    $scope.extraviadosDetalle($stateParams.mascotaId);
  });

  $scope.extraviadosDetalle = function(mascotaId) {
    
    $http.get($url+'/mascota/api_mascota/'+mascotaId+'?format=json', {cache:true})
      .then(function(res){
        console.log("extraviadosDetalle success");
        console.log(res.data);
        $scope.mascotas = res.data.results[0];
      }, function(err) {
        console.log("extraviadosDetalle failed");
        $ionicPopup.alert({title: "ATENCIÓN",
          template: "Conexión no establecida, por favor verifique su conexión a internet o intente más tarde",
          buttons: [{ text: 'OK', type: 'button-positive button-clear' }]
        });
      });
  }
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
