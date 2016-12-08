(function(){
  'use strict';
  angular
    .module('jabejaApp')
    .config(appConfig);
  appConfig.$inject = ['$routeProvider', 'localStorageServiceProvider'];
  function appConfig($routeProvider, localStorageServiceProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'trip/trip.template.html',
        controller: 'TripController',
        controllerAs: 'vm'
      })
      .when('/auth', {
        templateUrl: 'auth/auth.template.html',
        controller: 'AuthController',
        controllerAs: 'vm'
      })
      .when('/trip', {
        templateUrl: 'trip/trip.template.html',
        controller: 'TripController',
        controllerAs: 'vm'
      });

      localStorageServiceProvider
        .setPrefix('JabeJa')
        .setStorageType('localStorage')
        .setDefaultToCookie(false)
        .setNotify(true, false);
  }
})();



/*
  Three Apps:
    - Login App
    - Search Trip App
      - Add trip
    - User Profile App
*/
