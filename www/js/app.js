// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

angular.module('minhalista', ['ionic','minhalista.constants','minhalista.controllers','minhalista.factories','ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite,DB) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    DB.init();

    /*
    //$cordovaSQLite.openDB({ name: "minhalista.db", bgType: 1 })

    if (window.cordova){
      db = $cordovaSQLite.openDB("minhalista.db");
    }
    else {
      db = window.openDatabase("minhalista.db", '1', 'minhaLista', 1024 * 1024 * 100);
    }

    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS lista (id integer primary key, descricao text, dataInclusao text)");
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS lista (id integer primary key, listaId integer, descricao text, quantidade number, preco number, dataInclusao text, foreign key(listaId) REFERENCES Lista(id))");


    alert('criou');*/
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  /*.state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })*/

  /*.state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })*/

    .state('app.listas', {
      url: '/listas',
      views: {
        'menuContent': {
          templateUrl: 'templates/listas.html',
          controller: 'ListasCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/itenslista/:ListaId',
    views: {
      'menuContent': {
        templateUrl: 'templates/itensLista.html',
        controller: 'ItensListaCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/listas');
});
