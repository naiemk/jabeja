(function(){
  'use strict';
   angular
    .module('tripApp')
    .factory('tripService', tripService);

    tripService.$inject = ['$http'];

    function tripService($http) {
      var service = {
      };
      return service;
    }
})();
