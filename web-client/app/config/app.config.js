(function(){
  'use strict';
  angular
    .module('jabejaApp')
    .config(appConfig);
  appConfig.$inject = ['$routeProvider'];
  function appConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'auth/auth.template.html',
        controller: 'AuthController',
        controllerAs: 'vm'
      });
  }
})();



/*
  Three Apps:
    - Login App
    - Search Trip App
      - Add trip
    - User Profile App
*/
