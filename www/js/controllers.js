angular.module('minhalista.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('ListasCtrl', function($scope,  $cordovaSQLite, Listas) {

    $scope.listas = [];

    $scope.listas =   Listas.all();

/*
    $cordovaSQLite.execute(db, "INSERT INTO lista (id, descricao,dataInclusao) VALUES (1,'LISTA 1', '23/10/2015')");
    $cordovaSQLite.execute(db, "INSERT INTO lista (id, descricao,dataInclusao) VALUES (2,'LISTA 2', '23/10/2015')");
    $cordovaSQLite.execute(db, "INSERT INTO lista (id, descricao,dataInclusao) VALUES (3,'LISTA 3', '23/10/2015')");
    $cordovaSQLite.execute(db, "INSERT INTO lista (id, descricao,dataInclusao) VALUES (4,'LISTA 4', '23/10/2015')");

    var query = "SELECT * FROM Lista;";
    $cordovaSQLite.execute(db, query).then(function(result) {
      for(var i=0; i<result.rows.length; i++){
       $scope.listas.push(result.rows[i]);
      }
    }, function (err) {

        console.log(err);;
    }); */

    /*if(res.rows.length > 0) {
       console.log("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname);
    } else {
       console.log("No results found");
    }*/


})

.controller('ItensListaCtrl', function($scope, $stateParams) {
  alert($stateParams.ListaId);
});
